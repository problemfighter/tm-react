import {TRLastCallData, TRState} from '../model/tr-model';
import {TRMessageData} from '../data/tr-message-data';
import TRHTTRequest from '../processor/http/tr-http-request';
import {TrFormDefinitionData} from "../data/tr-form-definition-data";
import {SortDirection} from "react-mui-ui/ui/tr-table-header";

export default class TRComponentState implements TRState {
    public init: boolean = false;
    public showProgress: boolean = false;
    public showLoginUI: boolean = false;
    public showFlashMessage: boolean = false;
    public showFlashMessageTimer?: any;
    public messageData: TRMessageData = TRMessageData.failed("Unexpected Error!");
    public parentComponent?: any;
    public trLastCallData?: TRLastCallData;
    public formData:{[key: string]: any} = {};
    public queryCondition:{[key: string]: any} = {};
    public formDefinition: Map<string, TrFormDefinitionData> = new Map<string, TrFormDefinitionData>();
    public removeNotInFormDefinition: boolean = false;
    public sortDirection: SortDirection = SortDirection.descending;
    public orderBy: string = "id";
    public itemList: Array<object> = [];
    public itemDetails: object = {};
    public maxItem: number = 20;
    public totalItem: number = 0;
    public itemOffset: number = 0;
    public pageOffset: number = 0;

    public setSortDirection(sortDirection: SortDirection): this {
        this.sortDirection = sortDirection;
        return this;
    }

    public setItemOffset(itemOffset: number): this {
        this.itemOffset = itemOffset;
        return this;
    }

    public setMaxItem(maxItem: number): this {
        this.maxItem = maxItem;
        return this;
    }

    public setOrderBy(orderBy: string): this{
        this.orderBy = orderBy;
        return this;
    }

    public setFormDefinition(definition: Map<string, TrFormDefinitionData>) {
        this.formDefinition = definition;
    }
}