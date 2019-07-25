import TRHTTResponse from "../processor/http/tr-http-response";
import URLMapping from "../../app/config/url-mapping";
import AppConfig from "../../app/config/app-config";
import {TRMessageData} from "../data/tr-message-data";
import TRHTTCallback from "../processor/http/tr-http-callback";
import TRHTTRequest from "../processor/http/tr-http-request";

export interface TRProps {}
export interface TRState { }
export interface HTTPCallback { callback(response: TRHTTResponse): void; }

export interface TRPageManagerProps extends TRProps {
    urlMapping: URLMapping;
    appConfig: AppConfig;
}

export interface TRPageManagerState extends TRState {}

export interface CustomValidation {
    validate(fieldName:string, value:any, formData:{[key: string]: any}): TRMessageData;
}

export interface TRHTTPCall {
    resume(): void;
    getComponent(): any;
}

export class TRLastCallData {
    public resumeableCallback?: TRHTTCallback;
    public request?: TRHTTRequest;
}

export interface TREvent {
    fire(event: any): void;
}
