import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { AppConfig } from '../../config';

@Injectable()
export class HubspotService {
  getHSParams() {
    const params = {
      hapikey: `${AppConfig.hubspotAPIKey}`,
    };
    return params;
  }

  async getHubspotContact(ctxId: string, hubspotContactId: string) {
    const url = `${AppConfig.hubspotBaseUrl}/crm/v3/objects/contacts/${hubspotContactId}`;
    const params = this.getHSParams();
    try {
      const contactData = await Axios.get(url, { params });
      const { data } = contactData;
      return data;
    } catch (e) {
      const { message: errMsg = `*`, response } = e;
      const { data } = response;
      const { message: hsErrorMsg = '' } = data; //deriving axios error for hubspot
      const finalErrorMsg = `${errMsg} : ${hsErrorMsg}`;
      //   this.logService.error(ctx, `error while getting hubspot contact , error was ==> ${finalErrorMsg}`);
      return finalErrorMsg;
    }
  }
}
