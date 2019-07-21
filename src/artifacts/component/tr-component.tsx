import React from 'react';
import { TRMessageData } from '../data/tr-message-data';
import TRReactComponent from '../framework/tr-react-component';
import { TRProps, TRState, HTTPCallback } from '../model/tr-model';
import TRComponentState from './tr-component-state';
import AppConfig from '../../app/config/app-config';
import TRHTTPManager from '../processor/http/tr-http-manager';
import TRHTTRequest from '../processor/http/tr-http-request';
import TRHTTCallback from '../processor/http/tr-http-callback';
import TRHTTResponse from '../processor/http/tr-http-response';
import {TrFormDefinitionData} from "../data/tr-form-definition-data";
import {SortDirection} from "react-mui-ui/ui/tr-table-header";
import {TrUtil} from "../util/tr-util";
import TrStaticData from "../config/tr-static-data";


export default class TRComponent<P extends TRProps, S extends TRComponentState> extends TRReactComponent<P, S> {


    private appConfig(): AppConfig {
        // @ts-ignore
        if (this.props.appConfig) {
            // @ts-ignore
            return this.props.appConfig
        }
        return TrStaticData.appConfig;
    }

    public sortItemAction(event: any, onClickData: any, callBack?: any): void {
        let orderBy = this.state.orderBy;
        let sortDirection = this.state.sortDirection;
        if (sortDirection === SortDirection.ascending) {
            sortDirection = SortDirection.descending;
        } else {
            sortDirection = SortDirection.ascending;
        }
        if (onClickData && onClickData.fieldName !== orderBy) {
            orderBy = onClickData.fieldName;
        }
        this.setState(status => {
            return {
                orderBy: orderBy,
                sortDirection: sortDirection
            }
        }, () => {
            if (callBack) {
                callBack();
            }
        });
    }

    componentDidMount() {}

    public setActionTimer(task: any, terminateAfterMS: number = 5000) {
        return setTimeout(() => {
            if (task) {
                task();
            }
        }, terminateAfterMS);
    }

    public closeFlashMessage(){
        this.setState({
            showFlashMessage: false
        });
        if (this.state.showFlashMessageTimer) {
            clearTimeout(this.state.showFlashMessageTimer);
        }
    }

    public closeFlashMessageTimer(terminateAfterMS: number = 5000): any {
        this.setState(state => {
            let showFlashMessageTimer = this.setActionTimer(() => {
                this.closeFlashMessage();
            }, terminateAfterMS);
            return {showFlashMessageTimer: showFlashMessageTimer}
        });
    }


    public showErrorFlash(message: string) {
        this.setState({
            messageData: TRMessageData.failed(message),
            showFlashMessage: true
        });
        this.closeFlashMessageTimer();
    }


    public showSuccessFlash(message: string) {
        this.setState({
            messageData: TRMessageData.success(message),
            showFlashMessage: true
        });
        this.closeFlashMessageTimer();
    }

    private httpRequestData(url: string): TRHTTRequest {
        let request: TRHTTRequest = new TRHTTRequest();
        request.baseURL = this.appConfig().getBaseURL();
        request.url = url;
        let authCallback = this.appConfig().authCallback();
        if (authCallback) {
            request.authCallback = this.appConfig().authCallback();
        }
        return request;
    }


    private setUnsetInputDataError(name: string, isCustom: boolean = false, isError: boolean = false, errorMessage: string = "") {
        let definition: TrFormDefinitionData | undefined = this.state.formDefinition.get(name);
        if (!definition) {
            return
        }
        if (errorMessage === "") {
            errorMessage = definition.errorMessage;
        }
        if (!isCustom) {
            isError = definition.required && !this.state.formData.get(name);
        }
        this.setState((state: any) => {
            let formDefinition = state.formDefinition;
            if (formDefinition.get(name)) {
                formDefinition.get(name).isError = isError;
                formDefinition.get(name).errorMessage = errorMessage;
            }
            return {formDefinition: formDefinition};
        });
    }

    public validateFormInput(): boolean {
        let isValid: boolean = true;
        if (this.state.formDefinition) {
            this.state.formDefinition.forEach((definition: TrFormDefinitionData, name: string) => {
                if (definition.required && !this.state.formData.get(name)) {
                    isValid = false;
                    this.setUnsetInputDataError(name);
                }
            });
        }
        return isValid;
    }


    private onChangeSetInputValue(name: string, value: any) {
        if (this.state.formData !== undefined) {
            this.state.formData.set(name, value);
        }
    }

    private getInputValue(name: string) {
        if (this.state.formData && this.state.formData.get(name)) {
            return this.state.formData.get(name);
        } else {
            let definition: TrFormDefinitionData | undefined = this.state.formDefinition.get(name);
            let value = "";
            if (definition && definition.defaultValue !== "") {
                value = definition.defaultValue;
            }
            return value;
        }
    }

    public mapToObject(map: Map<string, any>): object {
       return TrUtil.mapToObject(map);
    }

    public mapToJson(map: Map<string, any>): string {
        return TrUtil.mapToJson(map);
    }

    private inputDataHandler(name: string) {
        let attributes: {[key: string]: any} = {};
        let definition: TrFormDefinitionData | undefined = this.state.formDefinition.get(name);
        attributes.name = name;
        attributes.onChange = (event: any) => {
            event.preventDefault();
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
            this.onChangeSetInputValue(name, value);
            this.setUnsetInputDataError(name);
        };
        if (definition && definition.isErrorAttribute){
            attributes.error = definition.isError;
        }
        if (definition && definition.isHelpTextAttribute){
            attributes.helperText = definition.errorMessage;
        }

        if (definition && definition.required){
            attributes.required = true;
        }

        attributes.value = this.getInputValue(name);
        return attributes;
    }


    public handleInputDataChange(name: string){
        return this.inputDataHandler(name);
    }

    public addFormDefinition(name: string, fullDefinition?: TrFormDefinitionData) {
        let definition: TrFormDefinitionData = fullDefinition ? fullDefinition : new TrFormDefinitionData();
        definition.name = name;
        this.state.formDefinition.set(name, definition);
    }

    public setFormDefinition(fullDefinition: Map<string, TrFormDefinitionData>) {
        this.state.setFormDefinition(fullDefinition);
    }


    private createHttpCallBack(request: TRHTTRequest, success?: HTTPCallback, failed?: HTTPCallback): TRHTTCallback {
        let callback: TRHTTCallback = {
            before: (response: TRHTTResponse) => {
                this.setState({ showProgress: true })
            },
            success: (response: TRHTTResponse) => {
                if (success !== undefined) {
                    success.callback(response);
                }
                if (this.appConfig().isUnauthorized(response)) {
                    this.setState({ showLoginUI: true })
                    this.setState({ failedRequestData: request })
                }
            },
            failed: (response: TRHTTResponse) => {
                if (failed !== undefined) {
                    failed.callback(response);
                }
                if (this.appConfig().isUnauthorized(response)) {
                    this.setState({ showLoginUI: true })
                    this.setState({ failedRequestData: request })
                }
            },
            finally: () => {
                this.setState({ showProgress: false })
            }
        }
        return callback;
    }

    private httpCaller(): TRHTTPManager {
        return this.appConfig().getHTTPManager();
    }


    postToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.requestData = data;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    postJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().postJSON(request, callback);
    }


    deleteJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().deleteJSON(request, callback);
    }

    deleteToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().delete(request, callback);
     }


    getToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().get(request, callback);
     }


    showProgressbar = () => {
        this.setState({ showProgress: true })
    };


    hideProgressbar = () => {
        this.setState({ showProgress: false })
    };


    public renderUI() {
        return (
            <h1>TR React Application View Component</h1>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.appConfig().getBeforeRenderUIView(this.state, this)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}