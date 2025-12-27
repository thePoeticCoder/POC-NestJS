import { Description, Nullable, Property, Required } from "@tsed/schema";


export class Validation {

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for numeric feild ,  what is the min number user can enter")
    minNum: number | null;

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for numeric feild ,  what is the max number user can enter")
    maxNum: number | null;

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for string feild ,  what is the min length of string user can enter")
    minLen: number | null;

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for string feild ,  what is the max length of string user can enter")
    maxLen: number | null;

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for string feild ,  what is the min number of words user can enter")
    minWordCount: number | null;

    @Property()
    @Required(true, null)
    @Nullable(Number)
    @Description("for string feild ,  what is the max number of words user can enter")
    maxWordCount: number | null;


    @Property()
    @Required(true, null)
    @Nullable(Boolean)
    @Description("is string an email feild or not")
    isEmail: boolean | null;


    @Property()
    @Required(true, null)
    @Nullable(Boolean)
    @Description("is string an email feild or not")
    isDate: boolean | null;


    @Property()
    @Description("is string an email feild or not")
    isOptional?: boolean;
};
