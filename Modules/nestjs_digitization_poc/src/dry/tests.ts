import { Inject, Injectable } from "@nestjs/common";
import { LogService } from "src/common/services/log.service";
// import { SortingFieldsSchema } from "src/api-models/tests.req";
@Injectable()
export class DryTests{

    @Inject(LogService)
    private logService:LogService

    // getSortCriteria ( sortingFields : SortingFieldsSchema[] | undefined , ctxId : string ) {
    //     this.logService.info(ctxId,`inside getSortCriteria with sortingFields =>`,sortingFields);

    //     let sortCriteria : any = {};

    //     if ( !sortingFields ) {
    //         this.logService.info(ctxId,`no sortingFields found , using default { createdAt : -1 }`);

    //         sortCriteria.createdAt = -1

    //     } else {

    //         sortingFields.forEach( ( sortFieldCriteria :SortingFieldsSchema ) => {

    //             const { sortField = "createdAt" , sortType = -1 } = sortFieldCriteria;

    //             sortCriteria[sortField] = ( sortType === "ASC" )? 1 : ( sortType === "DES" ) ? -1 : -1;
    
    //         });

    //     }

    //     this.logService.info(ctxId,`sortCriteria =>`,sortCriteria);

    //     return sortCriteria;

    // }

    async validateBody ( requiredTestMarkers : any , testResults : any , ctx :any ) {

        const missingMarkers : string[] = [];

        const allAvailableMarkerIds : string[] = [];

        const allRequiredMarkersAvailable = requiredTestMarkers.every( ( testMarkerData : any ) => {

            const { markerRelatedOrgan , markerName } = testMarkerData ;

            this.logService.info(ctx,`looking for test [${markerName}] in testResults from body`,testMarkerData);

            const foundTest = testResults.find((testResult:any)=>{return testResult.testName.toLowerCase() == markerName.toLowerCase()});

            if (!foundTest) {
                this.logService.info(ctx,`test [${markerName}] not found `);
                missingMarkers.push(markerName)
                return false;
            }

            this.logService.info(ctx,`test [${markerName}] found `);
            allAvailableMarkerIds.push(markerRelatedOrgan);
            return true;

        } );

        return {
            allRequiredMarkersAvailable , 
            missingMarkers,
            allAvailableMarkerIds
        }
    }

    

}