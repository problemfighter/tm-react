
import { TRState } from '../model/tr-model';
import { TRMessageData } from '../data/tr-message-data';

export default class TRComponentState implements TRState {
    public showProgress: boolean = false;
    public showLoginUI: boolean = false;
    public messageData?: TRMessageData;
    public parentComponent?: any;
}