import TRHTTCallback from "./tr-http-callback";
import TRHTTRequest from "./tr-http-request";

export default interface TRHTTPManager {
    postJSON(request: TRHTTRequest, callback: TRHTTCallback) : void;
    post(request: TRHTTRequest, callback: TRHTTCallback) : void;
    get(request: TRHTTRequest, callback: TRHTTCallback) : void;
    deleteJSON(request: TRHTTRequest, callback: TRHTTCallback) : void;
    delete(request: TRHTTRequest, callback: TRHTTCallback) : void;
    putJSON(request: TRHTTRequest, callback: TRHTTCallback) : void;
    put(request: TRHTTRequest, callback: TRHTTCallback) : void;
}