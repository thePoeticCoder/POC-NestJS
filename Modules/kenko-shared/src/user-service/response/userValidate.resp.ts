


import { Description, Enum, Property, Required } from "@tsed/schema";
import { PincodeServicableEnum, PPMCStatusEnum, UserStateEnum, UserTypeEnum, VersionSourceEnum } from "../../common/enums-and-constants/global.enum";


export class QuizV1Info {

    @Property()
    quizTaken: boolean;

    @Property()
    hasDiabetes?: boolean;

    @Property()
    selectedIndividual?: boolean;

    @Property()
    age?: number;

    @Property()
    quizV1Score?: number;

}


export class UserMetaInfo {

    @Property()
    @Description("user's email id")
    emailId: string;


    @Property()
    @Description("user's crm id")
    crmId: string;


    @Property()
    @Description("user's zoho id")
    zohoId: string;


    @Property()
    @Description("user's zoho id")
    userStatus: UserStateEnum;


    @Property()
    @Description("user's zoho id")
    userType: UserTypeEnum;


    @Property()
    userKenkoScore: number;


    @Property()
    age: number;


    @Property()
    ppmcStatus: PPMCStatusEnum;


    @Property()
    @Enum(PincodeServicableEnum)
    isPincodeServicable: PincodeServicableEnum;

    @Property()
    pincode: number;

    @Property()
    versionSource: VersionSourceEnum;


    @Property()
    isSlotBooked?: boolean;

}


export class UserValidateResp {

    @Property()
    @Required()
    @Description("true means user exist , false means no user with this id found")
    userExists: boolean;


    @Property()
    @Required()
    userId: string;


    @Property()
    @Required()
    userMetaInfo: UserMetaInfo;


    @Property()
    @Required()
    quizV1Info: QuizV1Info;

};