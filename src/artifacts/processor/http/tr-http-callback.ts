import TRHTTResponse from "./tr-http-response";

export default interface TRHTTCallback {
    before(response: TRHTTResponse): void;
    success(response: TRHTTResponse): void;
    failed(response: TRHTTResponse): void;
    finally(): void;
}