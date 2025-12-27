
export enum RequestSourceEnum {
  BODY = 'BODY',
  EVENT = 'EVENT',
}
export class QueueConstants {
  static DIGITIZATION_EXCHANGE_NAME="digitization-service-events";
  static DIGITIZATION_EXCHANGE_TYPE="direct";
  static QUEUE_HUBSPOT_DIGITIZATION="QUEUE_HUBSPOT_DIGITIZATION";
  static QUEUE_HUBSPOT_DIGITIZATION2="QUEUE_HUBSPOT_DIGITIZATION2"
  static QUEUE_DIGITIZATION="QUEUE_DIGITIZATION2"
}

export enum QueueEventEnum {
  PPMC_REPORT_DIGITIZED_STATUS = "PPMC_REPORT_DIGITIZED_STATUS",
  INGEST_PARTIAL_FROM_HEALTH_APP = "INGEST_PARTIAL_FROM_HEALTH_APP",
  UPDATE_PARTIAL_FROM_HEALTH_APP ="UPDATE_PARTIAL_FROM_HEALTH_APP",
  UPDATE_CUSTOM_OBJECTID_FROM_CONSUMERAPP="UPDATE_CUSTOM_OBJECTID_FROM_CONSUMERAPP",
  GENERATE_CUSTOM_OBJECTID="GENERATE_CUSTOM_OBJECTID",
  UPDATE_CUSTOM_OBJECTID_STATUS="UPDATE_CUSTOM_OBJECTID_STATUS"

};

// digitization service constants
// from old service

export enum UserTypeEnum {
  B2B = "B2B",
  B2C = "B2C"
};

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
}

export const DAY_SECONDS = 86400;
export const HOUR_SECONDS = 3600;
export const MINUTE_SECONDS = 60;
export const DEFAULT_PASSWORD = "5f4dcc3b5aa765d61d8327deb882cf99"; //md5 hash of "password"
export const USER_CREATE_LIMIT = 3;



export class ErrorCode {

  static GENERIC_CLIENT_ERROR = 400;
  static ACCESS_TOKEN_EXPIRED = 410;
  static REFRESH_TOKEN_EXPIRED = 411;
  static OTP_EXPIRED = 412;
  static OTP_INCORRECT = 413;
  static USER_NOT_SUBSCRIBER = 414;
  static GENERIC_SERVER_ERROR = 500;
  static USER_NOT_FOUND = 404;
  // static 
}

export class MiscCode {
  static SUCCESS = 200;
  static USER_QUIZ_REGISTERED_AND_DORMANT = 214;
  static USER_QUIZ_PROHIBITION = 215;
  static EXPERIAN_OTP_FALLBACK = 219;

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
  static MARKERS_MISSING = `ALERT : User's test has some markers missing`;
  static INVALID_REPORT_URL = `ALERT : Invalid Report URL found in webhook request from Hubspot`;

}


export enum PPMCPartner {
  ONE_MG = "ONE_MG",
  NON_PARTNER = "NON_PARTNER",
  CHECKING_OTHER_PARTNER = "CHECKING_OTHER_PARTNER",
  PHARM_EASY = "PHARM_EASY",
  THYROCARE = "THYROCARE",
  OTHER_LOCAL_LABS = "OTHER_LOCAL_LABS",
  MEDPAY = "MEDPAY",
  UNKNOWN = "UNKNOWN", // to pass all reports to manual pipeline
}


export enum RmqQueueNames {
  QUEUE_MAIN_APP = "QUEUE_MAIN_APP",
  QUEUE_HUBSPOT = "QUEUE_HUBSPOT",
  QUEUE_PUSH_NOTIFICATION = "QUEUE_PUSH_NOTIFICATION",
  QUEUE_HEALTH_DATA = "QUEUE_HEALTH_DATA",
}

export enum RmqEventNames {
  HEALTH_APP_EVENT = "HEALTH_APP_EVENT",
  PPMC_REPORT_DIGITIZED_STATUS = "PPMC_REPORT_DIGITIZED_STATUS",
  UPDATE_PPMC_SECOND_APPROVAL_TO_HUBSPOT = "UPDATE_PPMC_SECOND_APPROVAL_TO_HUBSPOT",
  INVALID_PPMC_REPORT = "INVALID_PPMC_REPORT",
  UPDATE_MEDICAL_REPORT_SUMMARY_TO_HUBSPOT = "UPDATE_MEDICAL_REPORT_SUMMARY_TO_HUBSPOT"
}


export enum ReportProcessingSourceEnum {
  CRM_WEBHOOK = "CRM_WEBHOOK",
  EVENT = "EVENT",
  UPDATE_EVENT = "UPDATE_EVENT",
  INGEST_EVENT = "INGEST_EVENT"
}


export enum PendingTestValidityEnum {
  NEW = "NEW" ,
  PARTIAL = "PARTIAL",
  DEPRECATED = "DEPRECATED"
}

export enum DigitisationStatusEnum {
  NEW = "NEW" ,
  PARTIAL = "PARTIAL",
  INVALID = "INVALID",
  DIGITIZED = "DIGITIZED" , 
  APPROVED = "APPROVED" ,
  REJECTED_BY_QA = "REJECTED_BY_QA"
}

export enum CompareLogicEnum {
  GREATER_THAN = "GREATER_THAN" ,
  LESSER_THAN = "LESSER_THAN"
}

export enum MarkerRangeEnum {
  NORMAL_RANGE = "NORMAL_RANGE" ,
  ABNORMAL_RANGE = "ABNORMAL_RANGE" ,
  EMERGENCY_RANGE = "EMERGENCY_RANGE",
  INVALID="IVALID"
}

export enum ToDoUserTestUpdateEnum {
  APPROVE = "APPROVE" ,
  REJECT = "REJECT"
}

export enum HubspotStatusEventsIdsEnum {

  DIGITISATION_PROCESS_ID = 9358605 ,
  HEALTH_DATA_CUSTOM_OBJECT_ID = "2-7466406",
  ASSOCIATION_WITH_CONTACT_PROCESS_ID = "37" ,
  ASSOCIATION_WITH_TICKET_PROCESS_ID = "39" ,


  // ? list-required-markers
  DIGITISATION_STARTED = 27222892 ,

  // ? manual-test
  DIGITISATION_COMPLETE = 27251744 ,

  // ? fetch-user-test
  QA_STARTED = 27222893 ,

  // ? approve-reject-usertest ( qa person )
  QA_SUCCESS = 27219830 ,
  QA_REJECT = 27222894 ,

}

export enum requiredSampleTypeEnums{
  BLOOD="BLOOD",
  URINE="URINE",
  SEMEN="SEMEN"
}

export enum EnvironmentType {
  LOCAL = "local",
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}


export const jwtConstants = {  //todo:move to env 
  secret: 'secretKey',
};

export const ExternalUrls ={
  USERDATA:"https://api.kenkohealth.in/api/v1/internalApi/getUserIdAndBmi/",
  PARTNERNAME:'https://healthdata.kenkohealth.in/api/v1/test/partnerNameByHsId'

};

