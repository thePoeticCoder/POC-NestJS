import Axios from "axios"
import {LogService} from "./log.service"
import { Inject,  } from '@nestjs/common';
import {ExternalUrls} from '../../constants/appConstants'

export class AxiosService {


    @Inject(LogService)
    private logService: LogService ;


    async userDataFromHubspotId ( hubspotId : string , ctx  :string ) {

        this.logService.info(ctx,`Inside userDataFromHubspotId with hubspotId => ${hubspotId}`)

        try{

            const response = await Axios.post(`${ExternalUrls.USERDATA}${hubspotId}`);

            const { data : apiRespData } = response

            this.logService.info(ctx,`userDataFromHubspotId`,apiRespData);

            const { data} = apiRespData;

            this.logService.info(ctx,`going out with success from userDataFromHubspotId with hubspotId => ${hubspotId}`)

            return data;

        }
        catch (e) {
            this.logService.error(ctx,`Error in userDataFromHubspotId`,e);
            this.logService.info(ctx,`going out with error from userDataFromHubspotId with hubspotId => ${hubspotId}`)
            return { userId : null , emailId : null , userKenkoScore : null , userBMI : null }
            
        }

    }

    async fetchPartnerNameFromHealthApp ( ctx : string , hsIdArr : string[] ) {
        this.logService.info(ctx,`Inside fetchPartnerNameFromHealthApp`)
        
        try{


            const response = await Axios.post(ExternalUrls.PARTNERNAME,{hsIdArr});

            const { data : apiRespData } = response

            this.logService.info(ctx,`userDataFromHubspotId`,apiRespData);

            const {apiData } = apiRespData;

            return apiData;

        }
        catch (e) {
            this.logService.error(ctx,`Error in fetchPartnerNameFromHealthApp`,e);
            this.logService.info(ctx,`going out with error from fetchPartnerNameFromHealthApp`)
            return null

        }
    }

}









