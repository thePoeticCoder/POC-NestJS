import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { AppConfig } from '../../config/';
import { CreateZohoInvoiceReq, ZohoCreateContact } from '@kenko-health/shared';
import { ErrorHandlerService } from '../../common/services/errorHandler.service';
import { LogService } from '../../common/services/log.service';
const zohoOrgId = AppConfig.zohoOrgId;
const zohoBookBaseUrl = AppConfig.zohoBookBaseUrl;
const zohoClientSecret = AppConfig.zohoClientSecret;
const refreshToken = AppConfig.zohoRefreshToken;
const zohoClientId = AppConfig.zohoClientId;

@Injectable()
export class ZohoApiCallerService {
  @Inject()
  private logService: LogService;

  @Inject()
  private errorHandlerService: ErrorHandlerService;

  async getZohoHeader(ctxId: string) {
    this.logService.info(ctxId, `inside getZohoHeader method`);
    try {
      const url = `https://accounts.zoho.in/oauth/v2/token?refresh_token=${refreshToken}&client_id=${zohoClientId}&client_secret=${zohoClientSecret}&redirect_uri=http://www.zoho.in/books&grant_type=refresh_token`;
      const accessTokenData = await Axios.post(url);
      const { data } = accessTokenData;
      const { access_token } = data;
      const zohoHeader = {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      };
      this.logService.info(
        ctxId,
        `successfully executed method=[getZohoHeader]`,
      );
      return zohoHeader;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'getZohoHeader',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while generate zoho token',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createContact(ctxId: string, zohoHeader: any, body: ZohoCreateContact) {
    this.logService.info(ctxId, `inside createContact method`);
    try {
      const contactData = await Axios.post(
        `${zohoBookBaseUrl}/contacts?organization_id=${zohoOrgId}`,
        body,
        zohoHeader,
      );
      const { data } = contactData;
      const { contact } = data;
      this.logService.info(
        ctxId,
        `successfully executed method=[createContact]`,
      );
      return contact;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'createContact',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while create zoho contact',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async getZohoContact(ctxId: any, zohoCustomerId: string, zohoHeader: any) {
    this.logService.info(ctxId, `inside getZohoContact method`);
    try {
      const contactData = await Axios.get(
        `${zohoBookBaseUrl}/contacts/${zohoCustomerId}?organization_id=${zohoOrgId}`,
        zohoHeader,
      );
      const { data } = contactData;
      const { contact } = data;
      this.logService.info(
        ctxId,
        `successfully executed method=[getZohoContact]`,
      );
      return contact;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'getZohoContact',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while get zoho contact',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getZohoItems(ctxId: string, zohoHeader: any) {
    this.logService.info(ctxId, `inside getZohoItems method`);
    try {
      const url = `${zohoBookBaseUrl}/items?organization_id=${zohoOrgId}`;
      const itemsData = await Axios.get(url, zohoHeader);
      const { data } = itemsData;
      const { items } = data;
      this.logService.info(
        ctxId,
        `successfully executed method=[getZohoItems]`,
      );
      return items;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'getZohoItems',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while get zoho items',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async createInvoice(
    ctxId: string,
    invoicePayload: CreateZohoInvoiceReq,
    zohoHeader: any,
  ) {
    this.logService.info(ctxId, `inside createInvoice method`);
    try {
      const invoiceData = await Axios.post(
        `${zohoBookBaseUrl}/invoices?organization_id=${zohoOrgId}`,
        invoicePayload,
        zohoHeader,
      );
      const { data } = invoiceData;
      const { invoice } = data;
      await this.markStatusSent(ctxId, invoice, zohoHeader);
      this.logService.info(
        ctxId,
        `successfully executed method=[createInvoice]`,
      );
      return invoice;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'createInvoice',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while generating invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async markStatusSent(ctxId: string, invoice: any, zohoHeader: any) {
    this.logService.info(ctxId, `inside markStatusSent method`);
    const { invoice_id: invoiceId } = invoice;
    try {
      const invoiceData = await Axios.post(
        `${zohoBookBaseUrl}/invoices/${invoiceId}/status/sent?organization_id=${zohoOrgId}`,
        {},
        zohoHeader,
      );
      this.logService.info(
        ctxId,
        `successfully executed method=[markStatusSent]`,
      );
      return invoiceData;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'markStatusSent',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while invoice mark as a sent',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getZohoInvoiceById(ctxId: string, invoiceId: string, zohoHeader: any) {
    this.logService.info(ctxId, `inside getZohoInvoiceById method`);
    try {
      const invoiceData = await Axios.get(
        `${zohoBookBaseUrl}/invoices/${invoiceId}?organization_id=${zohoOrgId}`,
        zohoHeader,
      );
      const { data } = invoiceData;
      const { invoice } = data;
      this.logService.info(
        ctxId,
        `successfully executed method=[getZohoInvoiceById]`,
      );
      return invoice;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'getZohoInvoiceById',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while getting invoice',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async markStatusVoid(ctxId: string, invoiceId: string, zohoHeader: any) {
    this.logService.info(ctxId, `inside markStatusVoid method`);
    try {
      const invoiceData = await Axios.post(
        `${zohoBookBaseUrl}/invoices/${invoiceId}/status/void?organization_id=${zohoOrgId}`,
        {},
        zohoHeader,
      );
      this.logService.info(
        ctxId,
        `successfully executed method=[markStatusVoid]`,
      );
      return invoiceData;
    } catch (error) {
      this.errorHandlerService.handleError(error, ctxId, {
        methodName: 'markStatusVoid',
        sendErrorNotification: false,
      });
      throw new HttpException(
        'Error while mark invoice status void',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
