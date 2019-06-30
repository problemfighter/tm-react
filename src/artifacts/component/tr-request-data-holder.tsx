
import { HTTPCallback } from '../model/tr-model';
import TRHTTRequest from '../processor/http/tr-http-request';

export default class TRRequestDataHolder {
    public request?: TRHTTRequest;
    public success?: HTTPCallback;
    public failed?: HTTPCallback;
}