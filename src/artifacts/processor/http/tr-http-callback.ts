import TRHTTResponse from "./tr-http-response";

export default interface TRHTTCallback {
    success(response: TRHTTResponse): void;
    failed(response: TRHTTResponse): void;
    finally(): void;
}