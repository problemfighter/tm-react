import {AxiosRequestConfig} from "axios";
import TRHTTRequest from "../http/tr-http-request";


export default class AxiosRequestConfigData implements AxiosRequestConfig {


    public static create(requestData: TRHTTRequest): AxiosRequestConfigData{
        let request:AxiosRequestConfigData = new AxiosRequestConfigData();
        return request;
    }

}