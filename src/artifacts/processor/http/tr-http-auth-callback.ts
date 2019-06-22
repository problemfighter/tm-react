import TRHTTRequest from "./tr-http-request";

export default interface TRHTTAuthCallback {
    process(request: TRHTTRequest): TRHTTRequest;
}