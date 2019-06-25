
import { TRState } from '../model/tr-model';
import { TRMessageData } from '../data/tr-message-data';
import TRHTTRequest from '../processor/http/tr-http-request';

export default class TRComponentState implements TRState {
    public showProgress: boolean = false;
    public showLoginUI: boolean = false;
    public messageData?: TRMessageData;
    public parentComponent?: any;
    public failedRequestData?: TRHTTRequest;
}