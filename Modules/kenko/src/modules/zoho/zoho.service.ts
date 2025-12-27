import {
  MiscMessages,
  PaymentEntityEnum,
  PaymentMediumEnum,
  PaymentResponseStatusEnum,
  PlanDurationEnum,
  PlanPhaseEnum,
  PostPaymentEvent,
  QueueEventNew,
  SchedulerServiceGenericEvent,
  TransactionDocStatus,
  TransactionEntity,
  TransactionMediumEnum,
  UpdatedByEnum,
  ZohoBookWebhookEvent,
} from '@kenko-health/shared';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommonApiCallerService } from '../../common/services/commonApiCaller.service';
import { PaymentLinkConverterService } from '../converters/paymentLink.converter.service';
import { PendingConverterService } from '../converters/pendingPlan.converter.service';
import { TransactionConverterService } from '../converters/transaction.converter.service';
import { ZohoConverterService } from '../converters/zoho.converter.service';
import { HubspotService } from '../../common/services/hubspot.service';
import { KenkoWebBackendService } from '../../micro-services/kenko-web-backend/kenkoWebBackend.service';
import { ZohoApiCallerService } from './zohoApiCaller.service';
import { AppConfig } from '../../config';
import { KenkoWebBackendProducerService } from '../../micro-services/kenko-web-backend/kenkoWebBackendProducer.service';
import { CRMProducerService } from '../../micro-services/crm-service/crmProducer.service';
import { ZohoDao } from '../../dao/zoho.dao';
import { TransactionDao } from '../../dao/transaction.dao';
import { PaymentLinkDao } from '../../dao/payment-link.dao';
import { PendingPlanDao } from '../../dao/pending-plan.dao';
import { LogService } from '../../common/services/log.service';
import { ClientApplication, Transaction } from '@prisma/client';
import { CommonProducerService } from '../../common/queue/commonProducer.service';
import { NotificationProducerService } from '../../micro-services/notification-service/notificationProducer.service';
import { CommonDateService } from '../../common/services/common-date.service';
import { UpiMandate } from '../../constants/enums';

@Injectable()
export class ZohoService {
  @Inject()
  private zohoApiCallerService: ZohoApiCallerService;

  @Inject()
  private kenkoWebBackendService: KenkoWebBackendService;

  @Inject()
  private zohoConverterService: ZohoConverterService;

  @Inject()
  private commonApiCallerService: CommonApiCallerService;

  @Inject()
  private hubspotService: HubspotService;

  @Inject()
  private transactionConverterService: TransactionConverterService;

  @Inject()
  private pendingConverterService: PendingConverterService;

  @Inject()
  private paymentLinkConverterService: PaymentLinkConverterService;

  @Inject()
  private dateService: CommonDateService;

  @Inject()
  private logService: LogService;

  @Inject(TransactionDao)
  private transactionDao: TransactionDao;

  @Inject(PendingPlanDao)
  private pendingPlanDao: PendingPlanDao;

  @Inject(ZohoDao)
  private zohoDao: ZohoDao;

  @Inject(PaymentLinkDao)
  private paymentLinkDao: PaymentLinkDao;

  @Inject()
  private kenkoWebBackendProducerService: KenkoWebBackendProducerService;

  @Inject()
  private commonProducerService: CommonProducerService;

  @Inject()
  private crmProducerService: CRMProducerService;

  @Inject()
  private notificationProducerService: NotificationProducerService;

  getPlanDuration(ctxId: string, duration: number) {
    this.logService.info(ctxId, `inside getPlanDuration method`);
    this.logService.info(ctxId, `duration=[${duration}]`);
    let planDuration;
    switch (duration) {
      case 1:
        planDuration = PlanDurationEnum.MONTHLY;
        break;
      case 3:
        planDuration = PlanDurationEnum.QUARTERLY;
        break;
      case 6:
        planDuration = PlanDurationEnum.SEMIANNUAL;
        break;
      case 12:
        planDuration = PlanDurationEnum.ANNUAL;
        break;
    }
    this.logService.info(ctxId, `planDuration=[${planDuration}]`);
    this.logService.info(
      ctxId,
      `successfully executed method=[getPlanDuration]`,
    );
    return planDuration;
  }

  async getZohoItem(ctxId: string, basePlanName: string, zohoHeader: any) {
    this.logService.info(ctxId, `inside getZohoItem method`);
    const zohoItems = await this.zohoApiCallerService.getZohoItems(
      ctxId,
      zohoHeader,
    );
    for (const zohoItem of zohoItems) {
      const { item_name } = zohoItem;
      if (item_name.toLowerCase() === basePlanName.toLowerCase()) {
        this.logService.info(
          ctxId,
          `successfully executed method=[getZohoItem]`,
        );
        return zohoItem;
      }
    }
    return {};
  }
  async zohoContactOperation(ctxId: string, zohoHeader: any, userDetails: any) {
    this.logService.info(ctxId, `inside zohoContactOperation method`);
    const {
      zohoCustomerId,
      pincode,
      hubspotContactId,
      emailId,
      userCollectionId,
    } = userDetails;
    this.logService.info(
      ctxId,
      `hubspotContactId=[${hubspotContactId}], emailId=[${emailId}], userCollectionId=[${userCollectionId}]`,
    );
    let zohoContact;
    let isZohoContactNewlyCreated = false;
    let isZohoContactIdFetchedFromHubspot = false;
    let contactId;
    if (!zohoCustomerId) {
      this.logService.info(
        ctxId,
        `calling hubspot get contact api for zoho customer id`,
      );
      const hubspotContact = await this.hubspotService.getHubspotContact(
        ctxId,
        hubspotContactId,
      );
      const { properties } = hubspotContact;
      const { zoho_customer_id } = properties;
      if (zoho_customer_id) {
        isZohoContactIdFetchedFromHubspot = true;
        contactId = zoho_customer_id;
      }
    }
    if (!zohoCustomerId && !isZohoContactIdFetchedFromHubspot) {
      this.logService.info(
        ctxId,
        `creating zoho contact for this hubspotContactId=[${hubspotContactId}]`,
      );
      isZohoContactNewlyCreated = true;
      const placeOfContact =
        await this.commonApiCallerService.getPlaceOfContact(ctxId, pincode);
      const contactSchema = this.zohoConverterService.convertUserToContact(
        ctxId,
        userDetails,
        placeOfContact,
      );
      zohoContact = await this.zohoApiCallerService.createContact(
        ctxId,
        zohoHeader,
        contactSchema,
      );
    }
    if (isZohoContactIdFetchedFromHubspot || zohoCustomerId) {
      const id = isZohoContactIdFetchedFromHubspot ? contactId : zohoCustomerId;
      this.logService.info(
        ctxId,
        `getting zoho contact for this hubspotId=[${hubspotContactId}], zohoCustomerId=[${id}] `,
      );
      zohoContact = await this.zohoApiCallerService.getZohoContact(
        ctxId,
        id,
        zohoHeader,
      );
    }
    if (isZohoContactIdFetchedFromHubspot) {
      this.logService.info(
        ctxId,
        `send event to kwb to update user credentials`,
      );
      const { contact_id: zohoCustomerId } = zohoContact;
      await this.kenkoWebBackendProducerService.sendZohoCustomerIdEvent(ctxId, {
        hubspotContactId,
        emailId,
        userCollectionId,
        zohoCustomerId,
      });
    }
    if (isZohoContactNewlyCreated) {
      this.logService.info(
        ctxId,
        `send event to kwb to update user credentials and hubspot`,
      );
      const { contact_id: zohoCustomerId } = zohoContact;
      await this.kenkoWebBackendProducerService.sendZohoCustomerIdEvent(ctxId, {
        hubspotContactId,
        emailId,
        userCollectionId,
        zohoCustomerId,
      });
      await this.crmProducerService.sendZohoCustomerIdEvent(ctxId, {
        hubspotContactId,
        emailId,
        userCollectionId,
        zohoCustomerId,
      });
    }
    this.logService.info(
      ctxId,
      `successfully executed method=[zohoContactOperation]`,
    );
    return zohoContact;
  }
  async createInvoiceByEvent(
    ctxId: string,
    body: SchedulerServiceGenericEvent,
  ) {
    const {
      userId,
      currentPlanId,
      planCurrentPhase,
      currentPlanName,
      currentPlanDurationMonths,
      paymentMedium,
    } = body;
    this.logService.info(ctxId, `inside createInvoiceByEvent method`);
    if (paymentMedium === PaymentMediumEnum.UPI_MANDATE) {
      this.logService.info(ctxId, `paymentMedium=[${paymentMedium}]`);
      this.logService.info(ctxId, `invoice creation process ignore`);
      return MiscMessages.NO_OPERATION;
    }
    if (planCurrentPhase !== PlanPhaseEnum.RENEWAL) {
      this.logService.info(ctxId, `planCurrentPhase=[${planCurrentPhase}]`);
      return MiscMessages.NO_OPERATION;
    }
    this.logService.info(ctxId, `planCurrentPhase=[${planCurrentPhase}]`);
    let basePlanName = currentPlanName;
    basePlanName = basePlanName.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase(),
    );
    this.logService.info(ctxId, `basePlanName=[${basePlanName}]`);
    const transactions = await this.transactionDao.find({
      userCollectionId: userId,
      transactionMedium: TransactionMediumEnum.ZOHO_BOOK,
    });
    const zohoHeader = await this.zohoApiCallerService.getZohoHeader(ctxId);
    if (transactions.length > 0) {
      this.logService.info(
        ctxId,
        `total transaction found ${transactions.length}`,
      );
      const sortedTransaction = await this.sortTransactions(
        ctxId,
        transactions,
      );
      const transaction = transactions[sortedTransaction.length - 1];
      const { id, transactionDocStatus } = transaction;
      const zohoDoc = await this.zohoDao.findByTransactionId(id);
      const { invoiceId } = zohoDoc;
      const zohoInvoice = await this.zohoApiCallerService.getZohoInvoiceById(
        ctxId,
        invoiceId,
        zohoHeader,
      );
      const { status } = zohoInvoice;
      this.logService.info(ctxId, `zoho invoice status=[${status}]`);
      if (
        (status === ZohoBookWebhookEvent.SENT ||
          status === ZohoBookWebhookEvent.OVERDUE) &&
        transactionDocStatus === TransactionDocStatus.NEW
      ) {
        this.logService.info(ctxId, `invoice creation process ignore`);
        return MiscMessages.NO_OPERATION;
      }
      if (
        transactionDocStatus === TransactionDocStatus.NEW &&
        status !== ZohoBookWebhookEvent.PAID
      ) {
        this.logService.info(ctxId, `mark invoice status void`);
        // await
        await Promise.all([
          this.zohoApiCallerService.markStatusVoid(
            ctxId,
            invoiceId,
            zohoHeader,
          ),
          await this.transactionDao.update(id, {
            transactionDocStatus:
              TransactionDocStatus.DEPRECATED_AFTER_ORDER_MODIFICATION,
          }),
        ]);
      }
    }
    this.logService.info(ctxId, `invoice creation process continue`);
    const planDuration = this.getPlanDuration(ctxId, currentPlanDurationMonths);
    if (!planDuration) {
      throw new HttpException('Invalid duration', HttpStatus.BAD_REQUEST);
    }

    const userDetails = await this.kenkoWebBackendService.getUserDetails(
      {
        userId,
        currentPlanId,
        planName: basePlanName,
      },
      ctxId,
    );
    if (!userDetails) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const {
      userCollectionId,
      basePlanId,
      basePlanActiveQuestionaire: questionaireId,
      basePlanPrice,
      basePlanDescription,
      basePlanDuration,
      isPlanAlreadyExist,
      hubspotContactId,
      zohoCustomerId,
      emailId,
    } = userDetails;
    this.logService.info(
      ctxId,
      `user data userCollectionId=[${userCollectionId}]
      emailId=[${emailId}]
    basePlanId=[${basePlanId}],
    questionaireId=[${questionaireId}],
    basePlanPrice=[${basePlanPrice}],
    basePlanDescription=[${basePlanDescription}],
    basePlanDuration=[${basePlanDuration}],
    isPlanAlreadyExist=[${isPlanAlreadyExist}],
    zohoCustomerId=[${zohoCustomerId}],
    currentPlanId=[${currentPlanId}],
    hubspotContactId=[${hubspotContactId}]
    `,
    );
    this.logService.info(ctxId, `user found with this userId=[${userId}]`);
    const invoiceCreationDate = this.dateService.getInvoiceDate(ctxId);
    if (!isPlanAlreadyExist) {
      this.logService.info(ctxId, `user plan not found`);
      return MiscMessages.NO_OPERATION;
    }

    const zohoContact = await this.zohoContactOperation(
      ctxId,
      zohoHeader,
      userDetails,
    );
    if (!zohoContact) {
      throw new HttpException('Contact not found', HttpStatus.BAD_REQUEST);
    }
    //step-5 : get zoho zohoItems
    const zohoItem = await this.getZohoItem(
      ctxId,
      userDetails.basePlanName,
      zohoHeader,
    );
    if (!zohoItem) {
      throw new HttpException('Zoho item not found', HttpStatus.BAD_REQUEST);
    }
    // duration, discount, isPercentage, isNumeric,
    const { invoicePayload, orderAmount, kenkoDiscount } =
      await this.zohoConverterService.createInvoicePayload(ctxId, {
        userDetails,
        zohoItem,
        zohoContact,
        duration: currentPlanDurationMonths,
        undefined,
        planDuration,
        invoiceCreationDate,
      });
    const invoice = await this.zohoApiCallerService.createInvoice(
      ctxId,
      invoicePayload,
      zohoHeader,
    );
    const {
      invoice_number: invoiceNumber,
      total: totalAmount,
      tax_total: taxAmount,
      invoice_id: invoiceId,
      invoice_url: invoiceUrl,
      // date: invoiceDate,
      currency_code: currencyCode,
      recurring_invoice_id: recurringInvoiceId = '',
    } = invoice;
    this.logService.info(ctxId, `invoice created invoiceId=[${invoiceId}]`);
    const transactionPayload =
      await this.transactionConverterService.createTransactionBody(ctxId, {
        userCollectionId,
        transactionMedium: TransactionMediumEnum.ZOHO_BOOK,
        transactionEntity: TransactionEntity.SUBSCRIPTION_RENEWAL,
        orderCollectionId: '',
        userPlanCollectionId: currentPlanId,
        basePlanCollectionId: basePlanId,
        doubleCoverageFlag: false,
        annualFlag: false,
        couponCodeId: '',
        planDuration: planDuration,
        status: PaymentResponseStatusEnum.CREATED,
        clientOrigin: ClientApplication.SCHEDULER_SERVICE,
        transactionDocStatus: TransactionDocStatus.NEW,
        paymentEntity: PaymentEntityEnum.RENEWAL_DONE_WITH_PLAN_SAME,
        paymentMedium: PaymentMediumEnum.STAND_ALONE_INVOICE,
      });
    const transaction = await this.transactionDao.create(transactionPayload);
    if (!transaction) {
      throw new HttpException(
        'Transaction not created',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { id: transactionId } = transaction;
    this.logService.info(
      ctxId,
      `transaction doc created transactionId=[${transactionId}]`,
    );
    const zohoTransactionPayload =
      await this.zohoConverterService.createZohoTransactionDoc(ctxId, {
        transactionId,
        invoiceUrl,
        invoiceNumber,
        recurringInvoiceProfileId: '',
        invoiceId,
        deliveryCharge: '0.00',
        finalAmount: parseFloat(totalAmount).toFixed(2),
        amount: parseFloat(orderAmount.toString()).toFixed(2),
        taxAmount: parseFloat(taxAmount).toFixed(2),
        currency: currencyCode,
        invoiceDate: invoiceCreationDate,
        kenkoDiscount: parseFloat(kenkoDiscount.toString()).toFixed(2),
        medpayDiscount: '0.00',
        couponDiscount: '0.00',
      });
    const zohoTransaction = await this.zohoDao.create(zohoTransactionPayload);
    if (!zohoTransaction) {
      throw new HttpException(
        'Zoho transaction not created',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { id: zohoTransactionId } = zohoTransaction;
    this.logService.info(
      ctxId,
      `zoho transaction doc created zohoTransaction=[${zohoTransactionId}]`,
    );
    const paymentLink =
      await this.paymentLinkConverterService.createPaymentLinkBody(ctxId, {
        userCollectionId,
        transactionId,
        zohoInvoiceId: invoiceId,
        invoiceUrl,
        zohoRecurringProfileId: recurringInvoiceId,
      });
    const createdPaymentLink = await this.paymentLinkDao.create(paymentLink);
    if (!createdPaymentLink) {
      throw new HttpException(
        'Payment link not created',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { paymentLinkId } = createdPaymentLink;
    const paymentLinkUrl = `${AppConfig.backendBaseUrl}/api/v2/payment-link/${paymentLinkId}`;
    this.logService.info(
      ctxId,
      `payment link created with paymentLinkId=[${paymentLinkId}]`,
    );
    this.logService.info(ctxId, `paymentLinkUrl=[${paymentLinkUrl}]`);
    this.logService.info(
      ctxId,
      `sending post invoice creation event with hubspotContactId=[${hubspotContactId}], emailId=[${emailId}] currentPlanId=[${currentPlanId}]`,
    );
    this.logService.info(
      ctxId,
      `sending renewal link ready event with hubspotContactId=[${hubspotContactId}], emailId=[${emailId}]`,
    );
    await Promise.all([
      this.crmProducerService.sendUniquePaymentLinkEvent(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          paymentLinkUrl,
        },
      ),
      this.kenkoWebBackendProducerService.postInvoiceCreationEvent(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          currentPlanId,
          invoiceId,
          invoiceUrl: paymentLinkUrl,
        },
      ),
      this.notificationProducerService.renewalLinkReady(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          userId: userCollectionId,
          planId: currentPlanId,
          planName: basePlanName,
          planDurationMonths: currentPlanDurationMonths,
          paymentLink: paymentLinkUrl,
        },
      ),
    ]);
    this.logService.info(
      ctxId,
      `successfully executed method=[createInvoiceByEvent]`,
    );
    return MiscMessages.SUCCESS;
  }

  async handleZohoWebhookEvent(ctxId: string, parsedData: QueueEventNew<any>) {
    this.logService.info(ctxId, `inside handleZohoWebhookEvent method`);
    const { eventData } = parsedData;
    const {
      invoice_id: invoiceId,
      email,
      line_items: invoiceLineItems,
      total: totalAmount,
      tax_total: taxTotal,
      contact_persons: contactPersons,
      currency_code: currencyCode,
      invoice_number: invoiceNumber,
      invoice_url: invoiceUrl,
      created_date_formatted: invoiceDate,
      recurring_invoice_id: recurringInvoiceId,
      status: zohoInvoiceStatus,
      last_payment_date_formatted: zohoPaymentDate,
      discount_amount: invoiceLevelDiscount,
      custom_field_hash: customFieldHash,
    } = eventData;
    const { cf_upi_mandate: upiMandate } = customFieldHash;
    const paymentDate = this.dateService.convertPaymentDate(
      ctxId,
      zohoPaymentDate,
    );
    this.logService.info(
      ctxId,
      `zoho invoice data invoiceId=[${invoiceId}], email=[${email}], totalAmount=[${totalAmount}], contactPersons=[${contactPersons.toString()}]`,
    );
    this.logService.info(
      ctxId,
      `currencyCode=[${currencyCode}], invoiceNumber=[${invoiceNumber}], invoiceUrl=[${invoiceUrl}]`,
    );
    this.logService.info(
      ctxId,
      `invoiceDate=[${invoiceDate}], recurringInvoiceId=${recurringInvoiceId}, zohoInvoiceStatus=[${zohoInvoiceStatus}], paymentDate=[${paymentDate}] `,
    );
    const zohoDoc = await this.zohoDao.findByInvoiceId(invoiceId);
    const zohoHeader = await this.zohoApiCallerService.getZohoHeader(ctxId);
    if (invoiceLineItems.length > 1) {
      this.logService.info(ctxId, `total zoho item ${invoiceLineItems.length}`);
      return MiscMessages.NO_OPERATION;
    }
    const {
      name: basePlanName,
      quantity,
      discount: discountAmount,
    } = invoiceLineItems[0];
    const userDetails = await this.kenkoWebBackendService.getUserDetails(
      {
        emailId: email,
        planName: basePlanName,
      },
      ctxId,
    );
    if (!userDetails) {
      this.logService.info(ctxId, `User not found`);
      return MiscMessages.FAILURE;
    }
    this.logService.info(ctxId, `user found with this emailId=[{email}]`);
    const {
      userCollectionId,
      basePlanId,
      basePlanActiveQuestionaire: questionaireId,
      basePlanPrice,
      basePlanDescription,
      basePlanDuration,
      isPlanAlreadyExist,
      zohoCustomerId,
      oldPlanId: currentPlanId,
      hubspotContactId,
      emailId,
    } = userDetails;
    this.logService.info(
      ctxId,
      `user data userCollectionId=[${userCollectionId}]
    basePlanId=[${basePlanId}],
    questionaireId=[${questionaireId}],
    basePlanPrice=[${basePlanPrice}],
    basePlanDescription=[${basePlanDescription}],
    basePlanDuration=[${basePlanDuration}],
    isPlanAlreadyExist=[${isPlanAlreadyExist}],
    zohoCustomerId=[${zohoCustomerId}],
    currentPlanId=[${currentPlanId}],
    hubspotContactId=[${hubspotContactId}]
    `,
    );
    if (zohoDoc) {
      const { transactionId } = zohoDoc;
      const transactionDoc = await this.transactionDao.findById(transactionId);
      const paymentLink = await this.paymentLinkDao.findByTransactionId(
        transactionId,
      );
      const { paymentLinkId } = paymentLink;
      const paymentLinkUrl = `${AppConfig.backendBaseUrl}/api/v2/payment-link/${paymentLinkId}`;
      this.logService.info(ctxId, `paymentLinkUrl=[${paymentLinkUrl}]`);
      if (transactionDoc) {
        const result = await this.transactionOperations(
          ctxId,
          {
            hubspotContactId,
            emailId,
            userCollectionId,
          },
          {
            userId: userCollectionId,
            planName: basePlanName,
            planDurationMonths: quantity,
            planId: isPlanAlreadyExist ? basePlanId : null,
            invoiceDate,
            paymentLink: paymentLinkId ? paymentLinkUrl : invoiceUrl,
            paymentDate,
            upiMandate,
          },
          transactionId,
          zohoInvoiceStatus,
        );
        return result;
      }
    }
    const transactions = await this.transactionDao.getTransactionsDocsByUserId(
      userCollectionId,
    );
    if (transactions.length > 0) {
      const sortedTransactions = await this.sortTransactions(
        ctxId,
        transactions,
      );
      const transaction = transactions[sortedTransactions.length - 1];
      const { id, transactionDocStatus } = transaction;
      const zohoDoc = await this.zohoDao.findByTransactionId(id);
      const { invoiceId } = zohoDoc;
      const zohoInvoice = await this.zohoApiCallerService.getZohoInvoiceById(
        ctxId,
        invoiceId,
        zohoHeader,
      );
      const { status } = zohoInvoice;
      this.logService.info(ctxId, `zohoInvoiceStatus=[${status}]`);
      if (
        (status === ZohoBookWebhookEvent.SENT ||
          status === ZohoBookWebhookEvent.OVERDUE ||
          status === ZohoBookWebhookEvent.PENDING ||
          status === ZohoBookWebhookEvent.REJECTED) &&
        transactionDocStatus === TransactionDocStatus.NEW
      ) {
        this.logService.info(ctxId, `mark invoice status void`);
        await Promise.all([
          this.zohoApiCallerService.markStatusVoid(
            ctxId,
            invoiceId,
            zohoHeader,
          ),
          await this.transactionDao.update(id, {
            transactionDocStatus:
              TransactionDocStatus.DEPRECATED_AFTER_ORDER_MODIFICATION,
          }),
        ]);
      }
    }
    const planDuration = this.getPlanDuration(ctxId, quantity);
    if (!planDuration) {
      this.logService.info(ctxId, `plan duration not found`);
      return MiscMessages.FAILURE;
    }
    let zohoContactId = zohoCustomerId;
    if (!zohoContactId) {
      zohoContactId = contactPersons[0];
    }

    const transactionPayload =
      await this.transactionConverterService.createTransactionBody(ctxId, {
        userCollectionId,
        transactionMedium: TransactionMediumEnum.ZOHO_BOOK,
        transactionEntity: TransactionEntity.SUBSCRIPTION_RENEWAL,
        orderCollectionId: '',
        userPlanCollectionId: currentPlanId,
        basePlanCollectionId: basePlanId,
        doubleCoverageFlag: false,
        annualFlag: false,
        couponCodeId: '',
        planDuration: planDuration,
        status: PaymentResponseStatusEnum.CREATED,
        clientOrigin: ClientApplication.HUBSPOT,
        transactionDocStatus: TransactionDocStatus.NEW,
        paymentEntity: isPlanAlreadyExist
          ? PaymentEntityEnum.RENEWAL_DONE_WITH_PLAN_SAME
          : PaymentEntityEnum.RENEWAL_DONE_WITH_PLAN_CHANGE,
        paymentMedium:
          upiMandate === UpiMandate.NO
            ? PaymentMediumEnum.STAND_ALONE_INVOICE
            : PaymentMediumEnum.UPI_MANDATE,
      });
    const transaction = await this.transactionDao.create(transactionPayload);
    if (!transaction) {
      this.logService.info(ctxId, `Transaction not created`);
      return MiscMessages.FAILURE;
    }
    const { id: transactionId } = transaction;
    this.logService.info(
      ctxId,
      `transaction doc created with id=[${transactionId}]`,
    );
    if (!isPlanAlreadyExist) {
      const pendingPlanPayload =
        await this.pendingConverterService.createPendingPlanBody(ctxId, {
          userCollectionId,
          transactionId,
          basePlanId,
          questionaireId,
          userBasePlanName: userDetails.basePlanName,
          userPlanId: '',
          userPlanTotalPrice: Math.ceil(basePlanPrice),
          userPlanDescription: basePlanDescription,
          userPlanTotalDuration: basePlanDuration,
          planDuration: planDuration,
          userFamilyDependents: [],
          addOn: false,
          doubleCoverageFlag: false,
          annualFlag: false,
          updatedBy: UpdatedByEnum.HUBSPOT,
          validity: 'NEW',
        });
      const pendingPlan = await this.pendingPlanDao.create(pendingPlanPayload);
      if (!pendingPlan) {
        this.logService.info(ctxId, 'Pending plan not created');
        return MiscMessages.FAILURE;
      }
      this.logService.info(
        ctxId,
        `pending plan created with id=[${pendingPlan.id}]`,
      );
    }
    const zohoTransactionPayload =
      await this.zohoConverterService.createZohoTransactionDoc(ctxId, {
        transactionId,
        invoiceUrl,
        invoiceNumber,
        recurringInvoiceProfileId: '',
        invoiceId,
        deliveryCharge: '0.00',
        finalAmount: parseFloat(totalAmount).toFixed(2),
        amount: parseFloat(totalAmount.toString()).toFixed(2),
        taxAmount: parseFloat(taxTotal).toFixed(2),
        currency: currencyCode,
        invoiceDate,
        kenkoDiscount: invoiceLevelDiscount
          ? parseFloat(invoiceLevelDiscount).toFixed(2)
          : parseFloat(discountAmount).toFixed(2),
        medpayDiscount: '0.00',
        couponDiscount: '0.00',
      });
    const zohoTransaction = await this.zohoDao.create(zohoTransactionPayload);
    if (!zohoTransaction) {
      this.logService.info(ctxId, 'zoho transaction not created');
      return MiscMessages.FAILURE;
    }
    const { id: zohoTransactionId } = zohoTransaction;
    this.logService.info(
      ctxId,
      `zoho transaction doc created zohoTransactionId=[${zohoTransactionId}]`,
    );
    const paymentLink =
      await this.paymentLinkConverterService.createPaymentLinkBody(ctxId, {
        userCollectionId,
        transactionId,
        zohoInvoiceId: invoiceId,
        invoiceUrl,
        zohoRecurringProfileId: recurringInvoiceId,
      });
    const createdPaymentLink = await this.paymentLinkDao.create(paymentLink);
    if (!createdPaymentLink) {
      this.logService.info(ctxId, 'Payment link not created');
      return MiscMessages.FAILURE;
    }
    const { paymentLinkId } = createdPaymentLink;
    this.logService.info(
      ctxId,
      `payment link created paymentLinkId=[${paymentLinkId}]`,
    );
    const paymentLinkUrl = `${AppConfig.backendBaseUrl}/api/v2/payment-link/${paymentLinkId}`;
    this.logService.info(ctxId, `paymentLinkUrl=[${paymentLinkUrl}]`);
    if (isPlanAlreadyExist && currentPlanId) {
      this.logService.info(
        ctxId,
        `sending post invoice creation event with hubspotContactId=[${hubspotContactId}], emailId=[${emailId}] currentPlanId=[${currentPlanId}]`,
      );
      await this.kenkoWebBackendProducerService.postInvoiceCreationEvent(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          currentPlanId,
          invoiceId,
          invoiceUrl: paymentLinkUrl,
        },
      );
    }
    this.logService.info(
      ctxId,
      `sending renewal link ready event with hubspotContactId=[${hubspotContactId}], emailId=[${emailId}]`,
    );

    await Promise.all([
      this.crmProducerService.sendUniquePaymentLinkEvent(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          paymentLinkUrl,
        },
      ),
      this.notificationProducerService.renewalLinkReady(
        ctxId,
        {
          hubspotContactId,
          emailId,
          userCollectionId,
        },
        {
          userId: userCollectionId,
          planId: isPlanAlreadyExist ? currentPlanId : null,
          planName: basePlanName,
          planDurationMonths: quantity,
          paymentLink: paymentLinkUrl,
        },
      ),
    ]);
    this.logService.info(
      ctxId,
      `successfully executed method=[handleZohoWebhookEvent]`,
    );
    return MiscMessages.SUCCESS;
  }
  async sortTransactions(ctxId: string, transactions: Transaction[]) {
    this.logService.info(ctxId, `inside sortedTransaction method`);
    return await transactions.sort((a, b) => {
      return a.id - b.id;
    });
  }
  async transactionOperations(
    ctxId: string,
    userDetails: any,
    postPaymentData: any,
    transactionId: number,
    event: ZohoBookWebhookEvent,
  ) {
    const { paymentDate } = postPaymentData;
    this.logService.info(ctxId, `inside transactionOperations method`);
    let result = MiscMessages.NO_OPERATION;
    switch (event) {
      case ZohoBookWebhookEvent.PAID:
        await this.transactionDao.update(transactionId, {
          status: PaymentResponseStatusEnum.PAID,
          paymentDate,
        });
        result = await this.onSuccessPayment(
          ctxId,
          userDetails,
          postPaymentData,
        );
        this.logService.info(ctxId, `transactionId: ${transactionId} is paid`);
        break;

      case ZohoBookWebhookEvent.OVERDUE:
        await this.transactionDao.update(transactionId, {
          status: PaymentResponseStatusEnum.OVERDUE,
        });
        this.logService.info(
          ctxId,
          `transactionId: ${transactionId} is overdue`,
        );
        break;

      case ZohoBookWebhookEvent.PENDING:
        await this.transactionDao.update(transactionId, {
          status: PaymentResponseStatusEnum.PENDING,
        });
        this.logService.info(
          ctxId,
          `transactionId: ${transactionId} is pending`,
        );
        break;

      case ZohoBookWebhookEvent.REJECTED:
        await this.transactionDao.update(transactionId, {
          status: PaymentResponseStatusEnum.REJECTED,
        });
        this.logService.info(
          ctxId,
          `transactionId: ${transactionId} is rejected`,
        );
        break;
    }

    this.logService.info(ctxId, `final result : [${result}]`);
    this.logService.info(
      ctxId,
      `successfully executed method=[transactionOperations]`,
    );
    return result;
  }
  async onSuccessPayment(
    ctxId: string,
    userDetails: any,
    postPaymentBody: any,
  ) {
    this.logService.info(ctxId, `inside onSuccessPayment method`);
    const postPaymentEvent: PostPaymentEvent = {
      userId: postPaymentBody.userId,
      paymentEntity: postPaymentBody.planId
        ? PaymentEntityEnum.RENEWAL_DONE_WITH_PLAN_SAME
        : PaymentEntityEnum.RENEWAL_DONE_WITH_PLAN_CHANGE,
      planId: postPaymentBody.planId,
      planName: postPaymentBody.planName,
      planDurationMonths: postPaymentBody.planDurationMonths,
      paymentLink: postPaymentBody.paymentLink,
      invoiceDate: postPaymentBody.invoiceDate,
      paymentDate: postPaymentBody.paymentDate,
      paymentMedium:
        postPaymentBody.upiMandate === UpiMandate.YES
          ? PaymentMediumEnum.UPI_MANDATE
          : PaymentMediumEnum.STAND_ALONE_INVOICE,
    };
    await this.commonProducerService.sendPostPaymentEvent(
      ctxId,
      userDetails,
      postPaymentEvent,
    );
    this.logService.info(
      ctxId,
      `successfully executed method=[onSuccessPayment]`,
    );
    return MiscMessages.SUCCESS;
  }
}
