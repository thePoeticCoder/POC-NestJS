import { PlanDurationEnum } from "./global.enum";


export class Services {
    static CRM = "crm-service";
    static KWB = "backend-service";
    static QUIZ = "quiz-service";
    static SCHEDULER = "scheduler-service";
    static PAYMENT = "payment-service";
    static NOTIFICATION = "notification-service";
    static DIAGNOSTIC = "diagnostic-service";
    static DIGITIZATION="digitization-service";
    static CASHLESS="cashless-service";
}




export const PHONE_MIN = 5000000000;
export const PHONE_MAX = 9999999999;
export const PINCODE_MIN = 100001;
export const PINCODE_MAX = 999999;
export const ENROLLMENT_LINK_EXPIRATION_DAY = 7;
export const ENROLLMENT_LINK_SECRET_KEY = "jbduiasdhvicasndvciujasnbdvicjnsaxciadocns";


export class SuccessCode {
    static SUCCESS = 200;
    static EXPERIAN_OTP_FALLBACK = 219;

    //quiz related resp codes
    static USER_QUIZ_REGISTERED_AND_DORMANT = 214;
    static USER_QUIZ_PLANS_LIST = 214;
    static USER_QUIZ_PLANS_LIST_LESS_AGE = 221;
    static GOTO_SLOT_BOOKING_PAGE = 216;
    static GOTO_REPORT_UPLOAD_PAGE = 217;
    static USER_QUIZ_PROHIBITION = 220;
    static B2B_QUIZ_GIVEN_SLOT_BOOKED = 222;
    static B2B_QUIZ_GIVEN_SLOT_NOT_BOOKED = 215;

}





export class CRMDefaultValues {
    static HS_LEAD_CONVERTED = "Converted";
    static SUBSCRIPTION_MODE = "Razorpay";
    static LEAD_LIFE_CYCLE_STAGE = "lead";
    static HS_ANALYTICS_SRC = "DIRECT_TRAFFIC";
    static SRC_MEDIUM = "kenko-website";
    static UTM_VALUE = "";
    static UTM_VALUE_SOURCE_WEBSITE = "website (no utm source specified)";
    static MALE = "Male";
    static FEMALE = "Female";
    static FUTUREPROSPECT = "Future Prospect";
    static OPPORTUNITY = "Opportunity";
    static TRUE = "True";
    static ORDER_FULFILLED = "Order Fulfilled";
    static UPI_MANDATE = "UPI Mandate";

}


export class CRMForSrcAndMedium {
    static SRC_MEDIUM_B2C = "kenko-website-B2C";
    static SRC_MEDIUM_B2B = "kenko-website-B2B";
    static SRC_MEDIUM_PRE_SIGNUP = "kenko-website-pre-signup";
    static SRC_MEDIUM_POST_SIGNUP = "kenko-website-post-signup";
    static SRC_MEDIUM_JUSTDIAL = "justdial";
}






//these constant used when we need time in seconds some-where , instead of hard-coding
export class TimeInSeconds {
    static MINUTES_5 = 300;
    static MINUTES_10 = 600;
    static MINUTES_30 = 1800;
}







export class ErrorMessage {

    static ROLL_BACK = "Internal server error while performing a transaction . Please try after some time.";
    static INVALID_ID = "Invalid id in request.";
    static GENERIC_ERROR = "Internal Server Error.";
    static NOT_FOUND = "No entries found.";

    static ORDER_REFERNCE = "User or User-Plan does not exist.";

    static MISSING_ORDER_FORM = "Cannot create order without missing details.";

    static OVERLAPPING_SUB_BENEFITS = "Cannot create Base-plan with overlapping sub-benefits.";

    static EMAIL_OR_PHONE_EXISTS = "The emailId or phone number already exists.";

    static EMAIL_EXISTS = "The emailId already exists.";


    static EMAIL_AND_PHONE_NOT_FOUND = "Please enter Email or Phone to login.";

    static WRONG_CREDENTIALS = "Wrong credentials.";
    static ACCESS_TOKEN_EXPIRED = "Access token expired.";
    static REFRESH_TOKEN_EXPIRED = "Refresh token expired. Please login again.";
    static MISSING_REFRESH_TOKEN = "refresh token is missing.";
    static UN_AUTHORIZED = "Unauthorized access token.";

    static OTP_EXPIRED = "OTP has expired, please generate a new OTP";
    static OTP_INCORRECT = "Incorrect OTP or Mobile Number";
    static OTP_VERIFICATION_FAILED = "OTP verification failed.";
    static USER_NOT_FOUND = "No user found with given details.";
    static USER_BASEPLAN_IPD_NOT_FOUND = "User baseplan ipd details not found"
    static USER_BASEPLAN_IPD_SUBBENEFIT_NOT_FOUND = "User baseplan ipd sub benefit details not found"
    static FAILED = "failed";
    static UNABLE_TO_SEND_OTP = "unable to send otp on number.";

    static PHONE_NOT_FOUND = "phone number not found in records.";
    static EMAIL_NOT_FOUND = "email not found in records.";
    static ADDRESS_INDEX_OUT_OF_BOUNDS = "address index out of bounds"

    static WRONG_CARD_DETAILS = "Wrong card details provided.";
    static INVALID_SQ_IDS = "Some invalid ids of simple question in request.";
    static INVALID_CQ_IDS = "Some invalid ids of complex question in request.";


    static PAYMENT_PAYLOAD_DETAILS = "Please check your payment details payload. Invalid payload";
    static INVALID_PAYLOAD = "Invalid payload for razorpay"

    static EMPTY_WEBHOOK_PAYLOAD = "Razorpay webhook returned empty payload"


    static INVALID_PLAN_DETAILS = "Invalid plan details payload";
    static INVALID_ORDER_DETAILS = "Invalid order details payload";
    static INVALID_SUBSCRIPTION_DETAILS = "Invalid subsciption details payload";
    static ORDER_NOT_FOUND = "No order-record was found for this Hubspot Ticket Id";
    static NO_ORDER_FOUND = "Order not found for given order ID";

    static USER_NOT_SUBSCRIBER = "Sorry! You are not allowed to place any orders till you are on-boarded. Please contact customer support to check your on-boarding status.";
    static USER_BLOCKED_MSG = "Your subscription has been cancelled. Please contact customer support";
    static USER_PAID_MSG = "You cannot give the quiz at the moment";
    static USER_SUBSCRIBER_MSG = "You cannot give the quiz at the moment";


    static NO_SKU_FOUND = "no sku found!";
    static INVOKE_MASKED_MOBILE = "Email Validation Failed or phone Validation Failed. Please try to invoke CRQ externally.";
    static INVALID_PAYLOAD_EXPERIAN = "Invalid Experian Payload";
    static INVALID_PINCODE = "Invalid Pincode passed in experian payload";
    static INVALID_FULLNAME = "Invalid Fullname passed in payload";
    static EXPERIAN_OTP_MISMATCH = "OTP validation failed, OTP is not match";
    static EXPERIAN_OTP_EXPIRED = "OTP validation failed, OTP is already expired";
    static EXPERIAN_REGISTER_AGAIN = "OTP validation already tried,register consumer again for new OTP"
    static EXPERIAN_NUMBER_MISMATCH = "OTP validation failed, mobile number is not matching with which consumer registered for an OTP";
    static EXPERIAN_CONSUMER_RECORD_NOT_FOUND = "consumer record not found";
    static EXPERIAN_CRITICAL_ERROR_CODE = "0";

    static TOO_MANY_REQUESTS = "Too many attempts. Please retry in some time.";
    static INVALID_BASE_URL = "Invalid baseUrl in request. Please Retry after some time.";

    static PPMC_REPORT_NOT_FOUND = "PPMC_REPORT_NOT_FOUND";
}




export const DAY_SECONDS = 86400;
export const HOUR_SECONDS = 3600;
export const MINUTE_SECONDS = 60;
export const DEFAULT_PASSWORD = "5f4dcc3b5aa765d61d8327deb882cf99"; //md5 hash of "password"
export const USER_CREATE_LIMIT = 3;





export const SCOPES_URL = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
    "https://www.googleapis.com/auth/user.gender.read",
    "https://www.googleapis.com/auth/user.birthday.read",
    "https://www.googleapis.com/auth/user.addresses.read",
    "https://www.googleapis.com/auth/userinfo.email",

];


export const SCOPES_STRING = ["profile", "email", "phone", "gender"];



export class ErrorCode {

    static GENERIC_CLIENT_ERROR = 400;
    static ACCESS_TOKEN_EXPIRED = 410;
    static REFRESH_TOKEN_EXPIRED = 411;
    static OTP_EXPIRED = 412;
    static OTP_INCORRECT = 413;
    static USER_NOT_SUBSCRIBER = 414;
    static GENERIC_SERVER_ERROR = 500;
    static TOO_MANY_REQUESTS = 429;
    static USER_NOT_FOUND = 206;
    static PPMC_TEST_NOT_FOUND = 206;
    static PPMC_TEST_NOT_BOOKED = 206;
}



export class MiscCode {
    static SUCCESS = 200;
    static EXPERIAN_OTP_FALLBACK = 219;

    //quiz related resp codes
    static USER_QUIZ_PLANS_LIST = 214;
    static USER_QUIZ_PLANS_LIST_LESS_AGE = 221;

    static GOTO_SLOT_BOOKING_PAGE = 216;
    static GOTO_REPORT_UPLOAD_PAGE = 217;
    // static WAITING_ON_HEALTH_DATA = 218;
    static USER_QUIZ_PROHIBITION = 220;//to-do : ask ui to use this for older-version

}


export class MiscMessages {
    static SUCCESS = "success";
    static FAILURE = "failed";

    static NO_OPERATION = "no-operation";
    static CREATED = "created";
    static UPDATED = "updated";
    static ACTIVATED = "activated";
    static DE_ACTIVATED = "de-activated";

    static SKIP_SLACK_MSG = 'skipping slack-notification';
    static SKIP_IN_NON_PROD = 'skipping operation in non-prod env';
    static SKIP_HS_MSG = 'skipping hubspot operation in non-prod environment';

    static TICKET_SUCCESS_MSG = 'Successfully created ticket in Hubspot';
    static TICKET_FAILURE_MSG = 'Failure while creating ticket in Hubspot';
    static PLAN_PURCHASE_MSG = 'Yayy !! A plan was puchased on the Website';
    static QUIZ_EVALUATION_MSG = 'A user gave the quiz on the website';
    static FLUSH_ZAP_MSG = 'Flushing user quiz history and plan , ZAP was triggered with these stats';
    static ACTIVE_INACTIVE_ZAP_MSG = 'user active/inactive ZAP was triggered with these stats';

    static SOMETING_WENT_WRONG = 'ALERT : Critical Error';
    static MEDPAY_WEBHOOK_TRIGGERED = 'ALERT :Medpay webhook triggered';
    static PLAN_EXPIRED = `ALERT : User's plan has expired`;

    static QUIZ_SUBMISSION_MSG = 'Sit back and relax. Your final Kenko Score is coming to you soon!';


}




//*****************ENUMS FOR HUBSPOT : START**********************/


















//*****************ENUMS FOR HUBSPOT : END**********************/



export class HubspotDefaultValues {
    static HS_LEAD_CONVERTED = "Converted";
    static SUBSCRIPTION_MODE = "Razorpay";
    static LEAD_LIFE_CYCLE_STAGE = "lead";
    static HS_ANALYTICS_SRC = "DIRECT_TRAFFIC";
    static SRC_MEDIUM = "kenko-website";
    static UTM_VALUE = "";
    static UTM_VALUE_SOURCE_WEBSITE = "website (no utm source specified)";
    static MALE = "Male";
    static FEMALE = "Female";
    static FUTUREPROSPECT = "Future Prospect";
    static OPPORTUNITY = "Opportunity";
    static TRUE = "True";
    static ORDER_FULFILLED = "Order Fulfilled";
    static ORDER_CANCELLED = "cancelled";
}

export class HubspotDefaultValuesForSrcAndMedium {
    static SRC_MEDIUM_B2C = "kenko-website-B2C";
    static SRC_MEDIUM_B2B = "kenko-website-B2B";
    static SRC_MEDIUM_PRE_SIGNUP = "kenko-website-pre-signup";
    static SRC_MEDIUM_POST_SIGNUP = "kenko-website-post-signup";
    static SRC_MEDIUM_JUSTDIAL = "justdial";
}














export const CANCELLATIONREASON = "Order is updated";


export const IndianStatesCodeForZoho: any = {
    "ANDAMAN_&_NICOBAR_ISLANDS": "AN",
    "ANDHRA_PRADESH": "AP",
    "ARUNACHAL_PRADESH": "AR",
    "ASSAM": "AS",
    "BIHAR": "BR",
    "CHANDIGARH": "CG",
    "CHHATTISGARH": "CH",
    "DADRA_&_NAGAR_HAVELI": "DN",
    "DAMAN_&_DIU": "DD",
    "DELHI": "DL",
    "GOA": "GA",
    "GUJARAT": "GJ",
    "HARYANA": "HR",
    "HIMACHAL_PRADESH": "HP",
    "JAMMU_&_KASHMIR": "JK",
    "JHARKHAND": "JH",
    "KARNATAKA": "KA",
    "KERALA": "KL",
    "LADAKH": "LA",
    "LAKSHADWEEP": "LD",
    "MADHYA_PRADESH": "MP",
    "MAHARASHTRA": "MH",
    "MANIPUR": "MN",
    "MEGHALAYA": "ML",
    "MIZORAM": "MZ",
    "NAGALAND": "NL",
    "ODISHA": "OR",
    "PUNDUCHERRY": "PY",
    "PUNJAB": "PB",
    "RAJASTHAN": "RJ",
    "SIKKIM": "SK",
    "TAMIL_NADU": "TN",
    "TELANGANA": "TS",
    "TRIPURA": "TR",
    "UTTAR_PRADESH": "UP",
    "UTTARKHAND": "UK",
    "WEST_BENGAL": "WB",
}










export const JD_COMPANY_NAME_SEARCH = "Kenko Name Search"

//*****************ENUMS FOR EXPERIAN : END**********************/









export const deliveryCharges = {
    MEDPAY: "30"
}



export const INVALID_PLAYER_IDS = [null, undefined, '*'];
export const JD_COMPANY_NAME_SAERCH = "Kenko Name Search"






export const planDurationDiscounts = {
    [PlanDurationEnum.MONTHLY]: 0,
    [PlanDurationEnum.QUARTERLY]: 5,
    [PlanDurationEnum.SEMIANNUAL]: 10,
    [PlanDurationEnum.ANNUAL]: 0
}

export const planDurationCriterias = {
    [PlanDurationEnum.MONTHLY]: {
        discount: planDurationDiscounts[PlanDurationEnum.MONTHLY],
        daysInDuration: 30,
        monthCount: 1,
        specialOffer: null
    },
    [PlanDurationEnum.QUARTERLY]: {
        discount: planDurationDiscounts[PlanDurationEnum.QUARTERLY],
        daysInDuration: 91,
        monthCount: 3,
        specialOffer: null
    },
    [PlanDurationEnum.SEMIANNUAL]: {
        discount: planDurationDiscounts[PlanDurationEnum.SEMIANNUAL],
        daysInDuration: 182,
        monthCount: 6,
        specialOffer: null
    },
    [PlanDurationEnum.ANNUAL]: {
        discount: planDurationDiscounts[PlanDurationEnum.ANNUAL],
        daysInDuration: 364,
        monthCount: 12,
        specialOffer: "smart_watch"
    }
}












export const ppmcRejectionContent = {
    heading: "",
    content: "Your reports need a relook."
}







export const GOOD_WORKER_PLAN_NAME = "Customised Wellness & OPD Plan"
export const PPMC_TIME_SLOTS = ["6 AM - 7 AM", "7 AM - 8 AM", "8 AM - 9 AM", "9 AM - 10 AM", "10 AM - 11 AM", "11 AM - 12 PM"]
