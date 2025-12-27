import { Inject, Injectable } from '@nestjs/common';
import {
  CreateZohoInvoiceByApiForPlanReq,
  CreateZohoInvoiceReq,
  IndianStatesCodeForZoho,
  PlanDurationEnum,
  ZohoCreateContact,
} from '@kenko-health/shared';
import { CommonDateService } from '../../common/services/common-date.service';
import { DiscountType, Prisma } from '@prisma/client';
import { DurationDiscountDao } from '../../dao/durationDiscount.dao';
import { LogService } from '../../common/services/log.service';

@Injectable()
export class ZohoConverterService {
  @Inject(CommonDateService)
  private commonDateService: CommonDateService;

  @Inject(DurationDiscountDao)
  private durationDiscountDao: DurationDiscountDao;

  @Inject()
  private logService: LogService;

  convertUserToContact(ctxId: string, user: any, placeOfContact: string) {
    this.logService.info(ctxId, `inside convertUserToContact method`);
    const { name, emailId, phoneNo, companyName = '' } = user;
    const nameStrings = name.split(' ');
    const firstName = nameStrings[0];
    const lastName = nameStrings.splice(1).join(' ');
    const createContactSchema: ZohoCreateContact = {
      contact_name: name,
      company_name: companyName,
      phone: phoneNo,
      place_of_contact: placeOfContact
        ? placeOfContact
        : IndianStatesCodeForZoho[`MAHARASHTRA`],
      contact_type: 'customer',
      customer_sub_type: 'individual',
      is_taxable: true,
      contact_category: 'consumer',
      gst_treatment: 'consumer',
      sales_channel: 'direct_sales',
      contact_persons: [
        {
          first_name: firstName,
          last_name: lastName,
          email: emailId,
          mobile: phoneNo,
          is_primary_contact: true,
          is_sms_enabled_for_cp: true,
        },
      ],
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[convertUserToContact]`,
    );
    return createContactSchema;
  }

  async createInvoicePayload(ctxId: string, payload: any) {
    this.logService.info(ctxId, `inside createInvoicePayload method`);
    const {
      userDetails,
      zohoItem,
      zohoContact,
      duration,
      couponId,
      planDuration,
      invoiceCreationDate,
    } = payload;
    const {
      contact_id: contactId,
      contact_persons: contactPersons,
      tax_name: taxName,
    } = zohoContact;
    const itemTaxId = this.findZohoTaxIdByZohoTaxName(ctxId, taxName, zohoItem);
    const { items, orderAmount, kenkoDiscount } = await this.getItems(
      ctxId,
      userDetails,
      zohoItem,
      itemTaxId,
      duration,
      couponId,
      planDuration,
      'plan',
    );
    const contactPersonId = contactPersons[0].contact_person_id;
    const invoicePayload: CreateZohoInvoiceReq = {
      reference_invoice_type: 'b2c_others',
      customer_id: contactId,
      contact_persons: [contactPersonId],
      date: await this.commonDateService.getDateForZohoInvoice(
        ctxId,
        0,
        invoiceCreationDate,
      ),
      line_items: items,
      payment_terms: 10,
      payment_terms_label: 'Net 10',
      payment_options: {
        payment_gateways: [
          {
            gateway_name: 'razorpay',
          },
        ],
      },
      due_date: await this.commonDateService.getDateForZohoInvoice(
        ctxId,
        10,
        invoiceCreationDate,
      ),
      tax_id: itemTaxId,
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[createInvoicePayload]`,
    );
    return { invoicePayload, orderAmount, kenkoDiscount };
  }
  findZohoTaxIdByZohoTaxName(
    ctxId: string,
    contactTaxName: string,
    zohoItem: any,
  ) {
    this.logService.info(ctxId, `inside findZohoTaxIdByZohoTaxName method`);
    const { item_tax_preferences: itemTaxPreferences } = zohoItem;
    for (const itemTaxPreference of itemTaxPreferences) {
      const { tax_id: taxId } = itemTaxPreference;
      if (!contactTaxName) {
        contactTaxName = 'GST18';
        //tax_name is missing when we fail to get place of
      }

      if (!itemTaxPreference.tax_name) {
        itemTaxPreference.tax_name = 'GST18';
      }

      contactTaxName = contactTaxName.replace(/[^a-zA-Z.]/g, '');
      const taxName = itemTaxPreference.tax_name.replace(/[^a-zA-Z.]/g, '');
      if (taxName === contactTaxName) {
        this.logService.info(
          ctxId,
          `successfully executed method=[findZohoTaxIdByZohoTaxName]`,
        );
        return taxId;
      }
    }
  }
  async getItems(
    ctxId: string,
    userDetails: any,
    zohoItem: any,
    itemTaxId: string,
    duration: number,
    couponId: string | undefined,
    planDuration: PlanDurationEnum | undefined,
    requestedBy: string,
  ) {
    this.logService.info(ctxId, `inside getItems method`);
    const items: any[] = [];
    let orderAmount = 0;
    let kenkoDiscount = 0;
    if (requestedBy === 'plan') {
      const {
        item_id: itemId,
        product_type: productType,
        hsn_or_sac: hsnOrSac,
        item_name: zohoItemName,
        rate,
      } = zohoItem;
      const discountAmount = await this.getDiscountAmount(
        ctxId,
        rate,
        duration,
        couponId,
        planDuration,
      );
      const item = await this.getMappedLineItem(
        ctxId,
        itemId,
        productType,
        hsnOrSac,
        zohoItemName,
        zohoItemName,
        rate,
        duration,
        discountAmount,
        itemTaxId,
      );
      orderAmount += rate * duration;
      kenkoDiscount += discountAmount;
      items.push(item);
    }
    this.logService.info(ctxId, `successfully executed method=[getItems]`);
    return {
      items,
      orderAmount,
      kenkoDiscount,
    };
  }
  async getDiscountAmount(
    ctxId: string,
    rate: number,
    duration: number,
    couponId: string | undefined,
    planDuration: PlanDurationEnum | undefined,
  ) {
    this.logService.info(ctxId, `inside getDiscountAmount method`);
    const totalAmount = rate * duration;
    let discountedAmount = 0;
    const planDurationData = await this.durationDiscountDao.findByPlanDuration(
      planDuration,
    );
    if (!planDurationData) {
      return discountedAmount;
    }
    const { discountType, discount } = planDurationData;
    if (discountType === DiscountType.PERCENTAGE) {
      const amount = (totalAmount * discount) / 100;
      discountedAmount += amount;
    } else {
      if (totalAmount >= discount) {
        const amountAfterDiscount = totalAmount - discount;
        const discountAmount = totalAmount - amountAfterDiscount;
        discountedAmount += discountAmount;
      }
    }
    if (discountedAmount > totalAmount) {
      discountedAmount = totalAmount;
    }
    this.logService.info(
      ctxId,
      `successfully executed method=[getDiscountAmount]`,
    );
    return discountedAmount;
  }

  getMappedLineItem(
    ctxId: string,
    itemId: any,
    productType: any,
    hsnOrSac: any,
    name: string,
    description: string,
    mrp: string,
    quantity: number,
    kenkoDiscount: number,
    taxId: any,
  ) {
    this.logService.info(ctxId, `inside getMappedLineItem method`);
    const mappedLineItem = {
      item_id: itemId,
      product_type: productType,
      hsn_or_sac: hsnOrSac,
      name: name,
      description: description,
      rate: mrp,
      quantity: quantity,
      discount_amount: 0,
      discount: kenkoDiscount,
      tax_id: taxId,
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[getMappedLineItem]`,
    );
    return mappedLineItem;
  }

  createZohoTransactionDoc(ctxId: string, body: any) {
    this.logService.info(ctxId, `inside createZohoTransactionDoc method`);
    const toCreateTransaction: Prisma.ZohoCreateInput = {
      transaction: {
        connect: {
          id: body.transactionId,
        },
      },
      recurringInvoiceProfileId: body.recurringInvoiceProfileId,
      invoiceId: body.invoiceId,
      deliveryCharge: body.deliveryCharge,
      finalAmount: body.finalAmount,
      amount: body.amount,
      taxAmount: body.taxAmount,
      currency: body.currency,
      invoiceUrl: body.invoiceUrl,
      invoiceDate: body.invoiceDate,
      kenkoDiscount: body.kenkoDiscount,
      medpayDiscount: body.medpayDiscount,
      couponDiscount: body.couponDiscount,
      invoiceNumber: body.invoiceNumber,
    };
    this.logService.info(
      ctxId,
      `successfully executed method=[createZohoTransactionDoc]`,
    );
    return toCreateTransaction;
  }
}
