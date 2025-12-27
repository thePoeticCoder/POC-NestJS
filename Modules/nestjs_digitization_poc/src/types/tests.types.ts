import {Tests,UserMarkers,RequiredMarkers,MetaData} from "@prisma/client"
import {PendingTestValidityEnum,DigitisationStatusEnum} from "../constants/appConstants"

export type pendingTests={
    pendingTestsList:Tests[],
    totalPendingTests:number

}

export interface searchCriteriaType{
    digitisationStatus:any
    validity?:any,
    
}

export interface searchCriteriaDaoType extends searchCriteriaType {
    digitisationOwner?:string
    OR?:any
    userHubspotId?:string
    testType?:string
}

export interface PendingTestType {
    id?:string
    userHubspotId?:string
    ticketId?:string
    validity?:any
}

export type digitisedTestType={
    digitisationStatus:DigitisationStatusEnum.APPROVED,
    userHubspotId:string
    testType:string
    id:string
}

export type Owners={
    digitisationOwner:string
    qaOwner:string
}

export type TestStatus={
    digitisationStatus:DigitisationStatusEnum
}

export type TicketIdType={
    ticketId:string
}

export type ValidityType={
    validity:PendingTestValidityEnum
}
