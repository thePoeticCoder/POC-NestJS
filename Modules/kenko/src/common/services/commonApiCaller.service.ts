import { Inject, Injectable } from '@nestjs/common';
import Axios from 'axios';
import { IndianStatesCodeForZoho } from '@kenko-health/shared';
import { LogService } from './log.service';

@Injectable()
export class CommonApiCallerService {
  @Inject()
  private logService: LogService;

  async getPlaceOfContact(ctxId: string, pincode: number) {
    this.logService.info(ctxId, `inside getPlaceOfContact method`);
    try {
      const stateDetails = await Axios.get(
        `https://api.worldpostallocations.com/?postalcode=${pincode}&countrycode=IN`,
      );
      const { data } = stateDetails;
      const { result } = data;
      let stateName = result[0]['state'];
      stateName = stateName.toUpperCase().split(' ').join('_');
      let stateCode = IndianStatesCodeForZoho[`${stateName}`];
      if (!stateCode) {
        stateCode = IndianStatesCodeForZoho[`MAHARASHTRA`];
      }
      this.logService.info(
        ctxId,
        `successfully executed method=[getPlaceOfContact]`,
      );
      return stateCode;
    } catch (error) {
      this.logService.info(
        ctxId,
        `state code not found sending default state code MAHARASHTRA`,
      );
      return IndianStatesCodeForZoho[`MAHARASHTRA`];
    }
  }
}
