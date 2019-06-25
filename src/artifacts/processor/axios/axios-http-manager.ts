import TRHTTPManager from "../http/tr-http-manager";
import TRHTTRequest from "../http/tr-http-request";
import TRHTTCallback from "../http/tr-http-callback";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TRHTTPConst } from "../http/tr-http-const";

export default class AxiosHTTPManager implements TRHTTPManager {


    private processParams(request: TRHTTRequest): any {
        if (request.authCallback !== undefined) {
            request = request.authCallback.process(request);
        }

        let processedRequest: any = {
            url: request.url,
            baseURL: request.baseURL,
            method: request.method,
            data: request.requestData,
            timeout: request.timeoutMS,
        }

        if (request.headers !== undefined) {
            processedRequest.headers = request.headers;
        }

        return processedRequest;
    }


    private addJSONHeader(headers: any): any {
        if (headers === undefined) {
            headers = {};
        }
        headers['Content-Type'] = 'application/json';
        return headers;
    }


    private httpCall(request: TRHTTRequest, callback: TRHTTCallback) {
        callback.before(request);
        axios.request(this.processParams(request)).then((response: AxiosResponse) => {
            callback.success({
                isSuccess: true,
                httpCode: response.status,
                requestData: response.data,
                headers: response.headers,
                others: response.request,
                optional1: response.statusText,
            });
        }).catch((error: AxiosError) => {
            callback.failed({
                isSuccess: false,
                httpCode: error.code,
                requestData: error.response,
                others: error.request,
            });
        }).finally(() => {
            callback.finally();
        });
    }


    public delete(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.DELETE;
        this.httpCall(request, callback);
    }


    public deleteJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.DELETE;
        request.headers = this.addJSONHeader(request.headers);
        request.requestData = JSON.stringify(request.requestData);
        this.httpCall(request, callback);
    }


    public get(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.GET;
        this.httpCall(request, callback);
    }


    public post(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.POST;
        this.httpCall(request, callback);
    }


    public postJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.POST;
        request.requestData = JSON.stringify(request.requestData);
        request.headers = this.addJSONHeader(request.headers);
        this.httpCall(request, callback);
    }

}