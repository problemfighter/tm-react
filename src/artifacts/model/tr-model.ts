import TRHTTResponse from "../processor/http/tr-http-response";
import URLMapping from "../../app/config/url-mapping";
import AppConfig from "../../app/config/app-config";
import TRAppConfig from "../config/tr-app-config";

export interface TRProps {}
export interface TRState { }
export interface HTTPCallback { callback(response: TRHTTResponse): void; }

export interface TRPageManagerProps extends TRProps {
    urlMapping: URLMapping;
    appConfig: AppConfig;
}

export interface TRPageManagerState extends TRState {}

