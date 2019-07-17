import {TRState} from '../model/tr-model';
import {TRMessageData} from '../data/tr-message-data';
import TRHTTRequest from '../processor/http/tr-http-request';
import {TrFormDefinitionData} from "../data/tr-form-definition-data";
import {SortDirection} from "react-mui-ui/ui/tr-table-header";

export default class TRComponentState implements TRState {
    public init: boolean = false;
    public showProgress: boolean = false;
    public showLoginUI: boolean = false;
    public messageData?: TRMessageData;
    public parentComponent?: any;
    public failedRequestData?: TRHTTRequest;
    public formData: Map<string, any> = new Map<string, any>();
    public formDefinition: Map<string, TrFormDefinitionData> = new Map<string, TrFormDefinitionData>();
    public removeNotInFormDefinition: boolean = false;
    public sortDirection: SortDirection = SortDirection.ascending;
    public orderBy: string = "id";
    public itemList: Array<object> = [];
    public itemDetails: object = {};

    public setSortDirection(sortDirection: SortDirection): TRComponentState{
        this.sortDirection = sortDirection;
        return this;
    }

    public setOrderBy(orderBy: string): TRComponentState{
        this.orderBy = orderBy;
        return this;
    }

    public setFormDefinition(definition: Map<string, TrFormDefinitionData>) {
        this.formDefinition = definition;
    }
}