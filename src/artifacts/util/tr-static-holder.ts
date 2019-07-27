
export default class TRStaticHolder {
    static message:{[key: string]: any} = {};

    static addMessageData(message:string, isSuccess:boolean = true){
        this.message = {isSuccess: isSuccess, message: message}
    }
}