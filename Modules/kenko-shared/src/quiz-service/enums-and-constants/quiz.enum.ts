
export enum QuizServiceEventEnum {
    QUIZ_SUBMIT = "QUIZ_SUBMIT",
    QUIZ_FLUSH = "QUIZ_FLUSH",
}


export enum QuizStateEnum {
    SUBMITTED = "SUBMITTED",
    FLUSHED = "FLUSHED",
    SAVED = "SAVED",
    NOT_GIVEN = "NOT_GIVEN"
}



export enum AnswerTypeEnum {

    NUMERIC = "NUMERIC", //when user enters number

    NUMERIC_RANGE = "NUMERIC_RANGE", //user enters number but we need to map it to range , will be handled at client , backend will get this answer in selected options

    //TEXT = "TEXT", //when user enters his email/phone etc (no scoring required in this case)

    OPTIONS_SINGLE = "OPTIONS_SINGLE",
    //answer is purely from options , single correct , selected-answer will be explicitely from this type

    OPTIONS_MULTI = "OPTIONS_MULTI",
    //answer is purely from options , multi correct , selected-answer(s) will be explicitely from this type

    OPTIONS_SINGLE_MAPPED_TO_DEFAULT = "OPTIONS_SINGLE_MAPPED_TO_DEFAULT",
    //same as OPTIONS_SINGLE , one extra option of OTHER , in which user can give his input , which will be mapped to last scoring option


    //no scoring answer types
    NO_SCORE_TEXT = "NO_SCORE_TEXT",
    NO_SCORE_NUMBER = "NO_SCORE_NUMBER",
    NO_SCORE_OPTION = "NO_SCORE_OPTION",
    NUMERIC_LIST = "NUMERIC_LIST",



    DATE = "DATE",
    NO_SCORE_CHECKBOX = "NO_SCORE_CHECKBOX",


    DROPDOWN_LIST = "DROPDOWN_LIST",
    DROPDOWN_OPTIONS = "DROPDOWN_OPTIONS"
}
