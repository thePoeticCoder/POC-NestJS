
export enum AddressTypeEnum {
    HOME = "HOME",
    WORK = "WORK",
    HOSPITAL = "HOSPITAL",
    OTHERS = "OTHERS"
};





export enum LeadType {
    COMPANY = "company",
    CATEGORY = "category"
}


export enum UserTypeEnum {
    B2B = "B2B",
    B2C = "B2C"
};

export enum GenderEnum {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NA = "NA"
}

export enum MaritalStausEnum {
    SINGLE = "SINGLE",
    MARRIED = "MARRIED"
}

export enum UserStateEnum {
    PAID = "PAID",
    REGISTERED = "REGISTERED",
    DORMANT = "DORMANT",
    BLOCKED = "BLOCKED",
    SUBSCRIBER = "SUBSCRIBER" //subscriber in HS via ZAP 
}

export enum UserDocTypeEnum {
    VERIFICATION = "VERIFICATION",
    PAYMENT = "PAYMENT",
    ORDER = "ORDER",
    PPMC_REPORT = "PPMC_REPORT",
    DOCKET_SIGNATURE = "DOCKET_SIGNATURE",
    PPMC_REPORT_INVOICE = "PPMC_REPORT_INVOICE"
}

export enum QuestionInputTypeEnum {
    TEXT = "TEXT",
    RADIO = "RADIO",
    CHECKBOX = "CHECKBOX"
}

export enum UserFamilyDependentTypeEnum {
    SPOUSE = "SPOUSE",
    CHILD = "CHILD",
    PARENT = "PARENT",
    PARENT_IN_LAW = "PARENT_IN_LAW"
}

export enum SubBenefitTypeEnum {
    BOOLEAN = "BOOLEAN",
    NUMERIC = "NUMERIC",
    PERCENTAGE = "PERCENTAGE"
}

//to-do: Make this enum dynamic
export enum BenefitTypeEnum {
    OPD = "OPD",
    IPD = "IPD",
    ATHOMECARE = "ATHOMECARE",
    INSURANCE = "INSURANCE"
}

export enum SubBenefitUnit {
    DAYS = "Days",
    SUM_INSURED = "Rs. Sum Insured",
    PERCENTAGE = "% off",
    INCLUDED = "Included",
}

export enum AddOnOperationTypeEnum {
    BOOLEAN = "BOOLEAN",
    NUMERIC = "NUMERIC",
    PERCENTAGE = "PERCENTAGE"
}

export enum AddOnOperationLevelEnum {
    PLAN = "PLAN",
    BENEFIT = "BENEFIT",
    SUBBENEFIT = "SUBBENEFIT"
}

export enum AddOnOperationEnum {
    ADD = "ADD",
    SUBTRACT = "SUBTRACT",
    MULTIPLY = "MULTIPLY",
    DIVIDE = "DIVIDE"
}

export enum SortDirectionEnum {
    ASC = "asc",
    DESC = "desc",
}

export enum OrderStatusEnum {
    REJECTED = "REJECTED",
    OPEN = "OPEN",
    CLOSED = "CLOSED",
    USER_CANCELLED = "USER_CANCELLED",
    WAITING_FOR_APPROVAL = "WAITING_FOR_APPROVAL",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED"
}

export enum BasePlanTypeEnum {
    SELF = "SELF",
    FAMILY = "FAMILY",
    CORPORATE = "CORPORATE",
    CORPORATE_FAMILY = "CORPORATE_FAMILY"
}



export enum HospitalStatusEnum {
    ACTIVE_LINKED = "ACTIVE_LINKED",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}



export enum OrderTypeMappingEnum {
    BENEFIT = "BENEFIT",
    SUBBENEFIT = "SUBBENEFIT"
}


export enum OrderTypeStatusEnum {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}



export enum DoctorConsultationTypeEnum {
    TELEPHONIC = "TELEPHONIC",
    VIDEO = "VIDEO",
    PHYSICAL_VISIT = "PHYSICAL_VISIT"
}


export enum UserRolesEnum {
    DEV = "DEV",
    SADMIN = "SADMIN",
    ADMIN = "ADMIN",
    COMPANY_ADMIN = "CADMIN", //HR 
    USER = "USER",
    WEBHOOK = "WEBHOOK",
    PARTNER = "PARTNER"
}



export enum UserProviderEnum {
    INTERNAL = "INTERNAL",
    GOOGLE = "GOOGLE",
    JUSTDIAL = "JUSTDIAL",
}



export enum LeadStatusEnum {
    NEW = "NEW",
    OPPORTUNITY = "OPPORTUNITY",
    SUBSCRIBER = "SUBSCRIBER",
    CUSTOMER = "CUSTOMER",
    FUTUREPROSPECT = "FUTUREPROSPECT"
}


export enum LeadTypeEnum {
    B2B = "B2B",
    B2C = "B2C",
    ORANGE = "ORANGE"
}



export enum JDLeadTypeEnum {
    COMPANY = "company",
    CATEGORY = "category"
}


export enum LeadPreferredTimeEnum {
    FIRST = "9AM-12AM",
    SECOND = "12AM-3PM",
    THIRD = "3PM-6PM",
    FOURTH = "6PM-9PM"
}

export enum CompanySize {
    MICRO = "Less than 20",
    MACRO = "Between 20 and 50",
    MEDIUM = "Between 50 and 100",
    MEDIUM_LARGE = "Between 100 and 250",
    LARGE = "More than 250",
    DEFAULT = "Not provided by user"
}



export enum TransactionMediumEnum {
    RAZORPAY = "RAZORPAY",
    STRIPE = "STRIPE",
    ZOHO_BOOK = "ZOHO_BOOK"
}



export enum TransactionEntity {
    PLAN = "PLAN",
    ORDER = "ORDER",
    SUBSCRIPTION_RENEWAL = "SUBSCRIPTION_RENEWAL"
}


export enum PaymentStatusEnum {
    CAPTURED = "captured",
    CREATED = "created",
    FAILED = "failed",
    PAID = "paid",
}



export enum RazorpayWebhookEvent {
    PAID = "payment_link.paid",
    EXPIRED = "payment_link.expired",
    CANCELLED = "payment_link.cancelled"
}



export enum ClientApplication {
    ANDROID = "ANDROID",
    WEBAPP = "WEBAPP"
}


export enum PaymentResponseStatusEnum {
    CREATED = "CREATED",
    BAD_REQUEST = "BAD_REQUEST",
    PAID = "PAID",
    NOTPAID = "NOTPAID",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    PENDING = "PENDING",
    EXPIRED = "EXPIRED",
    OVERDUE = "OVERDUE",
    REJECTED = "REJECTED"
}



export enum feedbackSatisfactionEnum {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}



export enum feedbackContextEnum {
    ORDERPLACEMENT = "ORDERPLACEMENT",
    ORDERHISTORY = "ORDERHISTORY",
    PLANVIEW = "PLANVIEW",
    PLANDETAILS = "PLANDETAILS",
    OTHERS = "OTHERS"
}



export enum RazorpayOption {
    PAYMENTLINK = "payment_link"
}



export enum StripeStatusEnum {
    CHARGE_SUCCEEDED = "charge.succeeded",
    CHARGE_FAILED = "charge.failed",
    CHARGE_PENDING = "charge.pending"
}












//*****************ENUMS FOR HUBSPOT : START**********************/


export enum HSMedicinePickupDeliveryEnum {
    DELIVERY = "Home Delivery",
    PICKUP = "Self Pickup"
}

export enum HSTicketPriorityEnum {
    LOW = "LOW",
    MID = "MEDIUM",
    HIGH = "HIGH"

}

export enum HSOrderTypeEnum {
    MEDICINE = "Medicine Order",
    DIAGNOSTIC = "Lab Test Order",
    DOC_CONSULT_PHYSICAL = "Doctor Consultation (Physical)",
    DOC_CONSULT_TELE = "Doctor Consultation (Tele)",
    DOC_CONSULT_VIDEO = "Doctor Consultation (Video)",
    HOSPITAL = "Hospital Treatment",
    DAY_CARE = "Day Care Treatment",
    AT_HOME_CARE = "At Home Care"
}


export enum SecondApprovalStatus {
    MAYBE = "Maybe",
    YES = "Yes",
    NO = "No"
}




//main reason why contact reached us
export enum HSTicketCategoryEnum {
    PRODUCT_ISSUE = "PRODUCT_ISSUE",
    BILLING_ISSUE = "BILLING_ISSUE",
    FEATURE_REQUEST = "FEATURE_REQUEST",
    GENERAL_INQUIRY = "GENERAL_INQUIRY"
}




//id of ticket-pipelines ,  
export enum HSPipelineIdEnum {
    CUSTOMER_ORDER = "0",//medicine , doc-consult(3) , diagnostics order-types
    OPD_REIMBURSEMENT = "8189405",
    HOSPITAL_TREATMENT_ORDER = "11766230", //hospital order-type
    AT_HOME_CARE_REIMBURSEMENT = "14562068",//at home order-type
    EMERGENCY_CASE = "2324919",
    PPMC_SELF_TEST_REFUND = "900635",
    WRITTEN_PRESCRIPTION_ORDER = "3636120"
}



//each ticket-pipeline above has multiple stages , we need to send id of new stage only while creating order
export enum HSPipelineStageIdEnum {
    CUSTOMER_ORDER = "1",//medicine , doc-consult(3) , diagnostics order-types
    OPD_REIMBURSEMENT = "8189406",
    HOSPITAL_TREATMENT_ORDER = "11766231", //hospital order-type
    AT_HOME_CARE_REIMBURSEMENT = "14562069",//at home order-type
    EMERGENCY_CASE = "8011396",
    PPMC_SELF_TEST_REFUND = "3173728",
    WRITTEN_PRESCRIPTION_NEW = "12294834",
    WRITTEN_PRESCRIPTION_CLOSE = "12294837"
}




//*****************ENUMS FOR HUBSPOT : END**********************/




export enum EnvironmentEnum {
    LOCAL = "local",
    DEV = "dev",
    STAGE = "stage",
    TEST = "test",
    BETA = "beta",
    PROD = "prod",
}





export enum UpdatedByEnum {
    HUBSPOT = "hubspot",
    CLIENT_APP = "ui",
    DEV_TEST = "dev-test-end-point", //dont use for PROD
    WEBHOOK = "webhook",
    CSV_API = "csv"
};






export enum OrderType {
    MEDICINES = "MEDICINES",
    DOCTOR_CONSULTATION = "DOCTOR_CONSULTATION",
    HOSPITAL_ADMISSION = "HOSPITAL_ADMISSION",
    AT_HOME_CARE = "AT_HOME_CARE",
    DIAGNOSTICS = "DIAGNOSTICS",
    REIMBURSEMENT = "REIMBURSEMENT",
}






//*****************ENUMS FOR MEDPAY : START**********************/

//Payment collection type reference
export enum PaymentCollectionEnum {
    SELF = "self",
    MEDPAY = "medpay"
}

//Sample collection type reference
export enum SampleCollectionEnum {
    HOME_VISIT = "home_visit",
    SELF_VISIT = "self_visit"
}

//Delivery partner reference
export enum DeliveryPartnerEnum {
    SELF_PICKUP = "self_pickup",
    MEDPAY = "medpay"
}

//Payment Type to be used for payment
export enum PaymentTypeEnum {
    CASH = "cash",
    CARD = "card",
    USSD = "ussd",
    AEPS = "aeps",
    UPI = "upi",
    QR = "qr",
    WALLETS = "wallets",
    POS = "pos",
    INTERNET_BANKING = "internet_banking",
    MOBILE_BANKING = "mobile_banking",
    MICRO_ATM = "micro_atm",
    VOUCHER = "voucher",
    OTHER = "other"
}



//consultationType enum
export enum ConsultationTypeEnum {
    ONLINE = "ONLINE",
    OFFLINE = "OFFLINE"
}

//medpay Order Status Enum
export enum MedpayOrderStatusEnum {
    CREATED = "pending",
    PAYMENTCOLLECTED = "payment_collected",
    ACCEPTED = "accepted",
    MODIFIED = "partner_pending",
    INVOICEGENERATED = "invoice_generated",
    CONFIRMPAYMENT = "",
    OUTFORDELIVERY = "package_picked",
    DELIVERED = "package_delivered",
    CANCELLED = "cancelled"
}



export enum MedpayOrderStatusForDBEnum {
    CREATED = "CREATED",
    PAYMENTCOLLECTED = "PAYMENT_COLLECTED",
    ACCEPTED = "ACCEPTED",
    MODIFIED = "MODIFIED",
    INVOICEGENERATED = "INVOICE_GENERATED",
    CONFIRMPAYMENT = "CONFIRM_PAYMENT",
    OUTFORDELIVERY = "OUT_FOR_DELIVERY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}


export enum MedpayChangeTypeEnum {
    PRICE = "price",
    ALTERNATIVE = "alternative",
    NOCHANGE = "no_change",
    QUANTITY = "quantity",
    QUANTITYANDPRICE = "quantity_price",
    NOTAVAILABLE = "not_available",
}

export enum MedicineUnavailableEnum {
    ELS_UNAVAILABLE_VALID = "ELS unavailable valid",
    ELS_UNAVAILABLE_INVALID = "ELS unavailable invalid",
    MEDICINE_VALIDATION_FAILED = "Medicine validation failed",
    //INVALID_MEDPAY = "Invalid medpay",
    MEDPAY_MODIFY_UNAVAILABLE = "Medpay modify unavailable",
    MEDPAY_MODIFY_USER_DESELECTED = "Medpay modify user deselected",
    PRESCRIPTION_VALIDATION_FAILED = "Prescription validation failed",
    WRITTEN_PRESCRIPTION = "Written prescription",
    PRESCRIPION_INVALID_MEDICINE = "Medicine not available in prescription uploaded",
}


//*****************ENUMS FOR MEDPAY : END**********************/




export enum ZohoBookWebhookEvent {
    PAID = "paid",
    PENDING = "pending",
    REJECTED = "rejected",
    OVERDUE = "overdue",
    SENT= "sent"
}



export enum EventEnum {
    QUIZ = "QUIZ",
    PURCHASE = "PURCHASE",
    DOB_UPDATE = "DOB_UPDATE",
    LIFECYCLE_UPDATE = "LIFECYCLE_UPDATE",

    FIRST_LOGIN = "FIRST_LOGIN",
    APP_USAGE = "APP_USAGE",


    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",

    CONTACT_PATCH = "CONTACT_PATCH",
    EXPERIAN_REPORT = "EXPERIAN_REPORT",


    ORDER_CREATE_NON_MEDICINE = "ORDER_CREATE_NON_MEDICINE",
    ORDER_CREATE_MEDICINE = "ORDER_CREATE_MEDICINE",
    ORDER_UPDATE_MEDICINE = "ORDER_UPDATE_MEDICINE",

    ORDER_PROCESSED = "ORDER_PROCESSED",
    PPMC_TEST = "PPMC_TEST",

    UPDATE_USER_PRIMARY_ADDRESS = "UPDATE_USER_PRIMARY_ADDRESS",
    UPDATE_PAYMENT_DETAILS = "UPDATE_PAYMENT_DETAILS",

    PARTNER_ORDER_STATUS_UPDATE = "PARTNER_ORDER_STATUS_UPDATE",
    CUSTOMER_ORDER_FEEDBACK = "CUSTOMER_ORDER_FEEDBACK",
    SEND_LOGIN_URL_TO_HUBSPOT = "SEND_LOGIN_URL_TO_HUBSPOT",
    USER_PREFERRED_LANGUAGE = "USER_PREFERRED_LANGUAGE",
    SEND_USER_GOOGLE_CLIENT_ID = "SEND_USER_GOOGLE_CLIENT_ID",
    EMERGENCY_CASE_TICKET = "EMERGENCY_CASE_TICKET",
    EMERGENCY_CASE_TICKET_PROCESSED = "EMERGENCY_CASE_TICKET_PROCESSED",
    UPDATE_SRC_MEDIUM_POST_SIGNUP = "UPDATE_SRC_MEDIUM_POST_SIGNUP",
    UPDATE_USER_PLAN_SELECTION = "UPDATE_USER_PLAN_SELECTION",
    UPDATE_USER_ZOHO_CUSTOMER_ID = "UPDATE_USER_ZOHO_CUSTOMER_ID",
    UPDATE_USER_KNOWLARITY_STATUS = "UPDATE_USER_KNOWLARITY_STATUS",

    JD_LEAD_CAPTURE_EVENT = "JD_LEAD_CAPTURE_EVENT",
    JD_LEAD_CAPTURED_REVERSE_EVENT = "JD_LEAD_CAPTURED_REVERSE_EVENT"

};



export enum EventActions {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}


export enum TransactionPortalEnum {
    RAZORPAY = "RAZORPAY",
    STRIPE = "STRIPE",
}

export enum TransactionOrigin {
    PLAN = "PLAN",
    ORDER = "ORDER",
    SUBSCRIPTION = "SUBSCRIPTION"
}


//*****************ENUMS FOR EXPERIAN : START**********************/

//it indicates input fields will be passed as post request by the client.(default-1)
export enum AllowInput {
    TRUE = "1",
    FALSE = "0"
}

//input field can be edited[value=0] or pre-populated[value=1].populate as 1(default-1)
export enum AllowEdit {
    TRUE = "1",
    FALSE = "0"
}

//captcha requirement(default-1)
export enum AllowCaptcha {
    TRUE = "1",//indicates captcha is completed by client
    FALSE = "0"//indicates captcha code is required
}

//consent to share credit report and score with client(default-1)
export enum AllowConsent {
    TRUE = "1",
    FALSE = "0"
}

//consent to share credit report and score with client for next 12 months(default-1)
export enum AllowConsentAddition {
    TRUE = "1",
    FALSE = "0"
}

//indicated email is verified or not(default-1)
export enum AllowEmailVerify {
    TRUE = "1",//email verified
    FALSE = "0"//email not verifies
}

//indicates vouched to be populated by client(default-1)
export enum AllowVoucher {
    TRUE = "1",
    FALSE = "0"
}

//CRQ bypass(default-0)
export enum NoValidationByPass {
    TRUE = "1",//CRQ will be bypassed
    FALSE = "0"//CRQ cannot be bypassed
}

//indicated email and phone validation(default-1)
export enum EmailConditionalByPass {
    TRUE = "1",
    FALSE = "0"
}

//type of mobile for experian
export enum MobileType {
    CUSTOM = "CUSTOM",
    NORMAL = "NORMAL",
    MASKED = "MASKED"
}


//*****************ENUMS FOR EXPERIAN : END**********************/





export enum RuleTypeEnum {
    AND = "AND",
    OR = "OR",
};


export enum PushNotificationTypeEnum {
    DOB_UPDATE = "NOTIFICATION_TYPE_DOB",

    //order status notifications
    ORDER_STATUS_OUT_FOR_DELIVERY = "ORDER_STATUS_OUT_FOR_DELIVERY",
    ORDER_STATUS_DELIVERED = "ORDER_STATUS_DELIVERED",
    ORDER_STATUS_INVOICE_GENERATED = "ORDER_STATUS_INVOICE_GENERATED",

    //order modifications
    ORDER_MODIFIED = "NOTIFICATION_TYPE_ORDER_MODIFICATION",

    //payment status notifications
    PAYMENT_STATUS_COLLECTED = "PAYMENT_STATUS_COLLECTED",


    RENEWAL_REMINDER = "`~|renewal_reminder|~`",
    RENEWAL_INVOICE_GENERATED = "`~|renewal_invoice_generated|~`",
    PPMC_MEDICAL_TEST_BOOKED = "`~|medical_test_booked|~`",
    PPMC_MEDICAL_REPORTS_RECEIVED = "`~|medical_reports_received|~`",
    PPMC_SECOND_APPROVAL = "`~|second_approval|~`",
    PPMC_SECOND_APPROVAL_APPROVED = "PPMC_SECOND_APPROVAL_APPROVED",
    PPMC_SECOND_APPROVAL_REJECTED = "PPMC_SECOND_APPROVAL_REJECTED",
    ONBOARDING_DOCKET_SIGNATURE = "`~|onboarding_docket_signature|~`",
    REIMBURSEMENT_PPMC_REJECTED = "REIMBURSEMENT_PPMC_REJECTED",
    REIMBURSEMENT_PPMC_SELF_BOOK_TEST = "REIMBURSEMENT_PPMC_SELF_BOOK_TEST",
    REMINDER_NON_1_MG_PPMC_TEST_REPORT_UPLOADION = "`~|self_medical_upload_reminder|~`",
    PPMC_TEST_PARTNER_NOT_FOUND = "PPMC_TEST_PARTNER_NOT_FOUND",
    ONBOARDING_REMINDER = "`~|onboarding_reminder|~`",

    VALIDATING_PRESCRIPTION = "VALIDATING_PRESCRIPTION",
    PRESCRIPTION_INVALID_BACKDATED = "PRESCRIPTION_INVALID_BACKDATED",
    PRESCRIPTION_INVALID_REGISTRACTION_NO_MISSING = "PRESCRIPTION_INVALID_REGISTRACTION_NO_MISSING",
    PRESCRIPTION_INVALID_FAMILY_MEMBER_NAME_NOT_PRESENT = "PRESCRIPTION_INVALID_FAMILY_MEMBER_NAME_NOT_PRESENT",
    PRESCRIPTION_INVALID_WITH_SOME_INVALID_MEDICINE = "PRESCRIPTION_INVALID_WITH_SOME_INVALID_MEDICINE",
    PRESCRIPTION_INVALID_WITH_ALL_INVALID_MEDICINE = "PRESCRIPTION_INVALID_WITH_ALL_INVALID_MEDICINE",
    PRESCRIPITON_VALID = "PRESCRIPITON_VALID",
    INVALID_PPMC_REPORT = "INVALID_PPMC_REPORT",
    ID_DOCUMENT_RECEIVED = "`~|id_document_received|~`",

    UPDATE_DIAGNOSTIC_STATUS = "UPDATE_DIAGNOSTIC_STATUS",
};



export enum PPMCPartner {
    ONE_MG = "ONE_MG",
    NON_PARTNER = "NON_PARTNER",
    CHECKING_OTHER_PARTNER = "CHECKING_OTHER_PARTNER",
    PHARM_EASY = "PHARM_EASY",
    THYROCARE = "THYROCARE"
}



export enum TransactionDocStatus {
    NEW = "NEW",
    DEPRECATED_AFTER_ORDER_MODIFICATION = "DEPRECATED_AFTER_ORDER_MODIFICATION"
}

export enum PPMCTestReqStatus {
    NEW = "NEW",
    DEPRECATED = "DEPRECATED",
    INVALID = "INVALID"
}







export enum UserPreferredLanguage {
    HINDI = "Hindi",
    ENGLISH = "English",
    OTHER_REGIONAL_LANGUAGES = "Other Regional Languages"
}


export enum YesNoEnum {
    YES = "Yes",
    NO = "No"
}



export enum PlanDurationEnum {
    MONTHLY = "MONTHLY",
    QUARTERLY = "QUARTERLY",
    SEMIANNUAL = "SEMIANNUAL",
    ANNUAL = "ANNUAL"
}





export enum AllowedRateLimitCount {
    OTP = 5,
    LOGIN_WITH_EMAIL = 5
}



export enum AllowedRateLimitTime {
    OTP = 300,
    LOGIN_WITH_EMAIL = 300
}





//? ////////////////////////////////////// PLAN - SERVICE ///////////////////////////////

export enum FamilyTypeEnum {
    SELF = "SELF",
    SPOUSE = "SPOUSE",
    SIBLING = "SIBLING",
    CHILD = "CHILD",
    PARENT = "PARENT",
    PARENTS_IN_LAW = "PARENTS_IN_LAW"
}



export enum PPMCStatusEnum {
    NOT_REQUIRED = "NOT_REQUIRED",
    DONE = "DONE",
    PENDING = "PENDING",
    INVALID = "INVALID"
}


export enum AtHomeCareFileCategory {
    BILL = "BILL",
    RTPCR = "RTPCR",
    DOCTOR_ADVICE = "DOCTOR_ADVICE"
}

export enum OnBoardingType {
    ID_VERIFICATION = "ID_VERIFICATION",
    SELFIE = "SELFIE",
    PPMC = "PPMC",
    FAMILY_ON_BOARDED = "FAMILY_ON_BOARDED"
}


export enum HubSpotPPMCPartner {
    ONE_MG = "1 MG",
    THYROCARE = "Thyrocare",
    PHARM_EASY = "PharmEasy",
    OTHER_LOCAL_LABS = "Other Local Labs",
}


export enum HealthAppEventEnum {
    NOT_RECEIVED = "NOT_RECEIVED",
    RECEIVED_YES = "RECEIVED_YES",
    RECEIVED_NO = "RECEIVED_NO",
    QUIZ_FLUSH = "QUIZ_FLUSH",
    QUIZ_FLUSH_POST_FHC_YES = "QUIZ_FLUSH_POST_FHC_YES",
}


export class BasePlanTags {
    static FHC_BASE_PLAN_TAG = "FHC";
}

export class BasePlanNames {
    static MINI_PLAN_299 = "299 Mini Plan";
    static OPD_INDIVIDUAL_PLAN = "OPD Individual Plan";
    static OPD_FAMILY_PLAN = "OPD Family Plan"
}

export class NotEligiblePPMCAgeCriterias {
    static TWENTY_FIVE = 25;
    static THIRTY = 30;
    static FORTY = 40;
}


export enum VersionSourceEnum {
    BASIC = "BASIC",
    FHC = "FHC"
}


export enum PpmcSalesJourneyEnum {
    PPMC_POST_PURCHASE = "PPMC post purchase",
    PPMC_PRE_PURCHASE = "PPMC pre purchase",
}

export enum PpmcReportPostFix {
    PPMC_REPORT_AFTER_INVALID = "ppmc_report_after_invalid",
    PPMC_REPORT = "ppmc_report"
}


//enum for prescription alidation
export enum PrescriptionValidationEnum {
    BACKDATED_PRESCRIPTION = "Backdated Prescription",
    REGISTRATION_NO_NOT_PRESENT = "Doctor registration number not found in prescription",
    PATIENT_NAME_NOT_FOUND = "User/Family Member not found in prescription",
    VALID_PRESCRIPTION = "Valid Prescription"
}

export enum PrescriptionTypeEnum {
    WRITTEN = "WRITTEN",
    DIGITAL = "DIGITAL"
}


export enum PpmcInnoicePostFix {
    PPMC_REPORT_INVOICE_AFTER_INVALID_PPMC_REPORT = "ppmc_report_bill_after_invalid_ppmc_report",
    PPMC_REPORT_INVOICE = "ppmc_report_bill"
}




export enum QueueEventEnum {
    QUIZ = "QUIZ",
    PURCHASE = "PURCHASE",
    DOB_UPDATE = "DOB_UPDATE",
    LIFECYCLE_UPDATE = "LIFECYCLE_UPDATE",

    FIRST_LOGIN = "FIRST_LOGIN",
    APP_USAGE = "APP_USAGE",


    PUSH_NOTIFICATION = "PUSH_NOTIFICATION",

    CONTACT_PATCH = "CONTACT_PATCH",
    EXPERIAN_REPORT = "EXPERIAN_REPORT",


    ORDER_CREATE_NON_MEDICINE = "ORDER_CREATE_NON_MEDICINE",
    ORDER_CREATE_MEDICINE = "ORDER_CREATE_MEDICINE",
    ORDER_UPDATE_MEDICINE = "ORDER_UPDATE_MEDICINE",

    ORDER_PROCESSED = "ORDER_PROCESSED",
    PPMC_TEST = "PPMC_TEST",

    UPDATE_USER_PRIMARY_ADDRESS = "UPDATE_USER_PRIMARY_ADDRESS",
    UPDATE_PAYMENT_DETAILS = "UPDATE_PAYMENT_DETAILS",

    PARTNER_ORDER_STATUS_UPDATE = "PARTNER_ORDER_STATUS_UPDATE",
    CUSTOMER_ORDER_FEEDBACK = "CUSTOMER_ORDER_FEEDBACK",
    SEND_LOGIN_URL_TO_HUBSPOT = "SEND_LOGIN_URL_TO_HUBSPOT",
    USER_PREFERRED_LANGUAGE = "USER_PREFERRED_LANGUAGE",
    SEND_USER_GOOGLE_CLIENT_ID = "SEND_USER_GOOGLE_CLIENT_ID",
    EMERGENCY_CASE_TICKET = "EMERGENCY_CASE_TICKET",
    EMERGENCY_CASE_TICKET_PROCESSED = "EMERGENCY_CASE_TICKET_PROCESSED",
    UPDATE_SRC_MEDIUM_POST_SIGNUP = "UPDATE_SRC_MEDIUM_POST_SIGNUP",
    UPDATE_USER_PLAN_SELECTION = "UPDATE_USER_PLAN_SELECTION",
    UPDATE_USER_ZOHO_CUSTOMER_ID = "UPDATE_USER_ZOHO_CUSTOMER_ID",
    UPDATE_USER_KNOWLARITY_STATUS = "UPDATE_USER_KNOWLARITY_STATUS",

    JD_LEAD_CAPTURE_EVENT = "JD_LEAD_CAPTURE_EVENT",
    JD_LEAD_CAPTURED_REVERSE_EVENT = "JD_LEAD_CAPTURED_REVERSE_EVENT",
    UPDATE_CUSTOMER_ID_DOCUMENT = "UPDATE_CUSTOMER_ID_DOCUMENT",
    UPDATE_CUSTOMER_DOCUMENT_VERIFICATION_COMPLETED = "UPDATE_CUSTOMER_DOCUMENT_VERIFICATION_COMPLETED",
    UPDATE_PPMC_REPORT_URL = "UPDATE_PPMC_REPORT_URL",
    UPDATE_USER_PROFILE_URL = "UPDATE_USER_PROFILE_URL",
    PPMC_TEST_VENDOR_NAME_AND_SERVICEABLE_CITY = "PPMC_TEST_VENDOR_NAME_AND_SERVICEABLE_CITY",
    SEND_MEDICAL_REPORT_TO_HEALTH_DATA_APP = "SEND_MEDICAL_REPORT_TO_HEALTH_DATA_APP",
    PPMC_REPORT_DIGITIZED_STATUS = "PPMC_REPORT_DIGITIZED_STATUS",


    HEALTH_APP_EVENT = "HEALTH_APP_EVENT",

    PPMC_SELF_TEST_REFUND_TICKET_EVENT = "PPMC_SELF_TEST_REFUND_TICKET_EVENT",
    PPMC_SELF_TEST_REFUND_TICKET_PROCESSED = "PPMC_SELF_TEST_REFUND_TICKET_PROCESSED",
    UPDATE_PPMC_SELF_TEST_REFUND_TICKET_EVENT = "UPDATE_PPMC_SELF_TEST_REFUND_TICKET_EVENT",
    UPDATE_DOCKET_SIGNATURE_STATUS = "UPDATE_DOCKET_SIGNATURE_STATUS",
    WRITTEN_PRESCRIPTION_ORDER_UPDATE = "WRITTEN_PRESCRIPTION_ORDER_UPDATE",
    CRM_EVENT_AFTER_HEALTH_DATA_EVENT = "CRM_EVENT_AFTER_HEALTH_DATA_EVENT",
    INVALID_PPMC_REPORT = "INVALID_PPMC_REPORT",
    VALID_MEDICAL_REPORTS = "VALID_MEDICAL_REPORTS",
    UPDATE_PPMC_SECOND_APPROVAL_TO_HUBSPOT = "UPDATE_PPMC_SECOND_APPROVAL_TO_HUBSPOT",
    CREATE_B2B_BULK_USERS = "CREATE_B2B_BULK_USERS",
    DELETE_B2B_BULK_USERS = "DELETE_B2B_BULK_USERS",
    UPDATE_B2B_BULK_USERS = "UPDATE_B2B_BULK_USERS",
    CREATE_B2B_BULK_USERS_PROCESSED = "CREATE_B2B_BULK_USERS_PROCESSED",
    DELETE_B2B_BULK_USERS_PROCESSED = "DELETE_B2B_BULK_USERS_PROCESSED",
    UPDATE_B2B_BULK_USERS_PROCESSED = "UPDATE_B2B_BULK_USERS_PROCESSED",
    UPDATE_AVAILABLE_BENEFIT_AMOUNT_TICKET = "UPDATE_AVAILABLE_BENEFIT_AMOUNT_TICKET",
    PPMC_SALES_JOURNEY_EVENT = "PPMC_SALES_JOURNEY_EVENT"
};




export enum PincodeServicableEnum {
    YES = "YES",
    NO = "NO",
    TBD = "TBD"
}