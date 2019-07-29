
export default class TRStaticHolder {
    static message:{[key: string]: any} = {};
    static tempData:{[key: string]: any} = {};

    static addMessageData(message:string, isSuccess:boolean = true){
        this.message = {isSuccess: isSuccess, message: message}
    }

    static addTempData(key: string, tempData: any) {
        this.tempData.key = tempData;
    }
}