import TRHTTPManager from "../http/tr-http-manager";
import TRHTTRequest from "../http/tr-http-request";
import TRHTTCallback from "../http/tr-http-callback";
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import AxiosRequestConfigData from "./axios-request-config-data";

export default class AxiosHTTPManager implements TRHTTPManager{


    private httpCall(request: TRHTTRequest, callback: TRHTTCallback) {
        axios.request(AxiosRequestConfigData.create(request)).then((response: AxiosResponse) => {

        }).catch((error: AxiosError) => {

        }).finally(() => {

        });
    }


   public delete(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public deleteJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public get(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public post(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public postJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
    }
    
    

    
}