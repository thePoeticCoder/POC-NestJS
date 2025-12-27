import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as RZP from 'razorpay';
import { KenkoWebBackendService } from '../../micro-services/kenko-web-backend/kenkoWebBackend.service';
import { Prisma, Razorpay, Transaction } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PaymentLinkReqBody } from '../../interfaces/createPaymentLink.req';

const rzpInstance = new RZP({
  key_id: 'rzp_test_IAJZjVQsxCLpLE',
  key_secret: 'J5qmBi3Ad3gyGDsSmG98NulS',
});

@Injectable()
export class RazorpayService {
  constructor(
    private prisma: PrismaService,
    private readonly kenkoWebBackendService: KenkoWebBackendService,
  ) {}

  async getPlanPriceDetails(
    planName: string,
    planDuration: string,
    ctxId: string,
  ) {
    try {
      const [getPlanInfo, getDurationInfo] = await Promise.all([
        this.kenkoWebBackendService.getPlanDetailsByPlanName(planName, ctxId),
        this.kenkoWebBackendService.getDurationDetailsByduration(
          planDuration,
          ctxId,
        ),
      ]);
    } catch (e) {}
  }

  async bodyForCreatePaymentLink(
    paymentReq: PaymentLinkReqBody,
    ctxId: string,
  ) {
    const { hsId, planName, planDuration } = paymentReq;

    try {
      const planDetails = await this.getPlanPriceDetails(
        planName,
        planDuration,
        ctxId,
      );

      const userDetails =
        await this.kenkoWebBackendService.getUserDetailsFromHubspotId(
          hsId,
          ctxId,
        );

      if (!userDetails) {
        // TODO : return err
        // return "err user details not found"
      }

      const {
        name = 'demo customer',
        emailId: email = 'customer@kenko.com',
        phoneNo = 123456789,
      } = userDetails;

      const body = {
        amount: 100,
        currency: 'INR',
        reference_id: v4(),
        description: `Payment link for plan ${planName}`,
        customer: {
          name,
          contact: phoneNo.toString(),
          email,
        },
        callback_url: ``,
        callback_method: 'get',
      };

      return body;
    } catch (e) {
      console.log('errorrrrrr', e);

      return 'err';
    }
  }

  async createPaymentLink(paymentReq: PaymentLinkReqBody, ctxId: string) {
    try {
      const body = await this.bodyForCreatePaymentLink(paymentReq, ctxId);

      const razorPayResponse = await rzpInstance.paymentLink.create(body);

      // const rzpInDb = await

      return razorPayResponse;
    } catch (e) {
      console.log('errorrrrrr', e);

      return 'err';
    }
  }

  async createMonthlyPaymentLink(ctxId: string) {
    const recurringPaymentLink =
      await rzpInstance.subscriptions.createRegistrationLink({
        customer: {
          name: 'Gaurav Kumar',
          email: 'gaurav.kumar@example.com',
          contact: 9123456780,
        },
        type: 'link',
        amount: 100,
        currency: 'INR',
        description: 'Registration Link for Gaurav Kumar',
        subscription_registration: {
          method: 'upi',
          max_amount: 500,
          expire_at: 1634215992,
        },
        receipt: 'Receipt No. 5',
        email_notify: 1,
        sms_notify: 1,
        expire_by: 1660206710,
        notes: {
          'note_key 1': 'Beam me up Scotty',
          'note_key 2': 'Tea. Earl Gray. Hot.',
        },
      });

    return recurringPaymentLink;
  }

  async createRazorpay(
    createdTransaction: Transaction,
    rzpResp: any,
    ctxId: any,
  ) {
    const { id: transactionId } = createdTransaction;

    const {
      id,
      amount,
      reference_id,
      reminder_enable,
      notes,
      short_url,
      description,
    } = rzpResp;

    const toCreateRzp: Prisma.RazorpayCreateInput = {
      transaction: {
        connect: {
          id: transactionId,
        },
      },
      amountInPaise: amount,
      amountInRupees: amount / 100,
      currency: 'INR',
      referenceId: reference_id,
      description,
      reminderEnable: reminder_enable,
      notes: notes ? notes : '',
      callbackUrl: '',
      callbackMethod: '',
      razorpayOption: '',
      paymentGatewayOrderID: '',
      shortUrl: short_url,
      paymentLinkId: id,
    };

    const result = await this.createRzpInDb(toCreateRzp, ctxId);

    return result;
  }

  async createRzpInDb(
    toCreateRazorpay: Prisma.RazorpayCreateInput,
    ctxId: any,
  ) {
    const razorpay = await this.prisma.razorpay.create({
      data: toCreateRazorpay,
    });

    return razorpay;
  }
}
