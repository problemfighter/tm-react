import TRHTTResponse from "../processor/http/tr-http-response";

export interface TRProps { }
export interface TRState { }
export interface HTTPCallback { callback(response: TRHTTResponse): void; }
