
export class ApiResponse<T> {

    respId: string;

    code: number;

    errMsg: any;

    dispMsg: string;

    data: T;

    constructor ( data : any , ctxId : string , dispMsg?: string  , code?: number , errMsg?: any ) {

        this.code = code && !isNaN(code) ? code : 200;
        this.errMsg = null;
        this.dispMsg = dispMsg ? dispMsg : "";
        this.respId = ctxId ? ctxId : Math.random().toString(36).replace("0.", "");
        this.data = null as any;

        if (data && data !== null && data !== undefined) {
            this.data = data;
        } else if (errMsg) {
            this.errMsg = errMsg;
            this.data = null;
        }

    }

}