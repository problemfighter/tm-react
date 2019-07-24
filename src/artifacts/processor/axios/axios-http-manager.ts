import TRHTTPManager from "../http/tr-http-manager";
import TRHTTRequest from "../http/tr-http-request";
import TRHTTCallback from "../http/tr-http-callback";
import axios, { AxiosError, AxiosResponse } from 'axios';
import { TRHTTPConst } from "../http/tr-http-const";
import TRHTTResponse from "../http/tr-http-response";

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

    private addHeader(headers: any, key: any, value: any): any {
        if (headers === undefined) {
            headers = {};
        }
        headers[key] = value;
        return headers;
    }

    private addJSONHeader(headers: any): any {
        return this.addHeader(headers, 'Content-Type', 'application/json');
    }

    private createResponse(isSuccess: boolean, response: any) {
        return {
            isSuccess: isSuccess,
            httpCode: response.status,
            responseData: response.data,
            headers: response.headers,
            others: response.request,
            optional1: response.statusText,
        }
    }

    private processErrorResponse(error: AxiosError){
        if(error.response === undefined){
            let sentResponse: TRHTTResponse = {
                isSuccess: false,
                message: error.message,
            }
            return sentResponse;
        }
      return this.createResponse(false, error.response)
    }


    private httpCall(request: TRHTTRequest, callback: TRHTTCallback) {
        callback.before(request);
        axios(this.processParams(request)).then((response: AxiosResponse) => {
            callback.success(this.createResponse(true, response));
        }).catch((error: AxiosError) => {
            callback.failed(this.processErrorResponse(error));
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

    public put(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.PUT;
        this.httpCall(request, callback);
    }


    public putJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
        request.method = TRHTTPConst.PUT;
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