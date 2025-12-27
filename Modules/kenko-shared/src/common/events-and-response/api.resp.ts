import { Context } from "@tsed/common";
import { CollectionOf, Generics, Property } from "@tsed/schema";


@Generics("T")
export class ApiResponse<T>{

    @Property()
    respId: string;

    @Property()
    code: number;

    @Property()
    errMsg: any;


    @Property()
    dispMsg: string;

    @Property("T")
    data: T;


    constructor(data: T, ctx: Context, errMsg?: any, code?: number, dispMsg?: string) {
        this.code = (code && !isNaN(code)) ? code : 200;
        this.errMsg = null;
        this.dispMsg = (dispMsg) ? dispMsg : '';
        this.respId = (ctx && ctx.id) ? ctx.id : Math.random().toString(36).replace('0.', '');



        if (data && data !== null && data !== undefined) {
            this.data = data;
        } else if (errMsg) {
            this.errMsg = errMsg;
            //this.data = null;
        }


        const { response } = ctx;
        response.status(this.code); //setting header status
        response.body(this);

    }

}










@Generics("T")
export class ApiResponseArray<T>{

    @Property()
    respId: string;

    @Property()
    code: number;

    @Property()
    errMsg: any;


    @Property()
    dispMsg: string;

    @Property()
    totalCount: number;

    @CollectionOf("T")
    data: T[];


    constructor(data: T[], totalCount: number, ctx: Context, errMsg?: any, code?: number, dispMsg?: string) {
        this.code = (code && !isNaN(code)) ? code : 200;
        this.errMsg = null;
        this.dispMsg = (dispMsg) ? dispMsg : '';
        this.respId = (ctx && ctx.id) ? ctx.id : Math.random().toString(36).replace('0.', '');
        this.totalCount = totalCount;

        if (data && data !== null && data !== undefined) {
            this.data = data;
        } else if (errMsg) {
            this.errMsg = errMsg;
            //this.data = null;
        }



        const { response } = ctx;
        response.status(this.code); //setting header status
        response.body(this);

    }

}