
export enum Status {
    SUCCESS = "success",
    FAILED = "error"
}

export class TRMessageData {

    public status: Status;
    public message: String;

    constructor() {
        this.status = Status.FAILED
        this.message = "";
    }

    public setMessage(message:String): TRMessageData {
        this.message = message;
        return this;
    }

    public setStatus(status:Status): TRMessageData {
        this.status = status;
        return this;
    }

    public static success(message: String) {
        return new TRMessageData().setMessage(message).setStatus(Status.SUCCESS);
    }


    public static failed(message: String) {
        return new TRMessageData().setMessage(message).setStatus(Status.FAILED);
    }

}