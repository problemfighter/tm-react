import React from 'react';
import {Status, TRMessageData} from '../data/tr-message-data';
import TRReactComponent from '../framework/tr-react-component';
import {TRProps, TRState, HTTPCallback, TRLastCallData, TRHTTPCall, TREvent} from '../model/tr-model';
import TRComponentState from './tr-component-state';
import AppConfig from '../../app/config/app-config';
import TRHTTPManager from '../processor/http/tr-http-manager';
import TRHTTRequest from '../processor/http/tr-http-request';
import TRHTTCallback from '../processor/http/tr-http-callback';
import TRHTTResponse from '../processor/http/tr-http-response';
import {TrFormDefinitionData} from "../data/tr-form-definition-data";
import {SortDirection} from "react-mui-ui/ui/tr-table-header";
import {TrUtil} from "../util/tr-util";
import TRStaticHolder from "../util/tr-static-holder";


export default class TRComponent<P extends TRProps, S extends TRComponentState> extends TRReactComponent<P, S> {

    private POST: string = "post";
    private DELETE: string = "delete";
    private PUT: string = "put";
    private GET: string = "get";
    private REDIRECT_DATA: string = "REDIRECT_DATA";

    // @ts-ignore
    state: TRComponentState = new TRComponentState();

    private appConfig(): AppConfig {
        // @ts-ignore
        if (this.props.appConfig) {
            // @ts-ignore
            return this.props.appConfig
        }
        // @ts-ignore
        return window.appConfig;
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

    public closeFlashMessageTimer(terminateAfterMS: number = 10000): any {
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


    public redirect(url: any) {
        TrUtil.gotoUrl(this, url);
    }

    public redirectWithData(url: any, data: any) {
        TRStaticHolder.addTempData(this.REDIRECT_DATA, data);
        this.redirect(url);
    }

    public getRedirectData() {
        let data = TRStaticHolder.tempData[this.REDIRECT_DATA];
        delete TRStaticHolder.tempData[this.REDIRECT_DATA];
        return data;
    }

    public successRedirect(url: any, message: string) {
        TRStaticHolder.addMessageData(message, false);
        this.redirect(url);
    }

    public failedRedirect(url: any, message: string) {
        TRStaticHolder.addMessageData(message, false);
        this.redirect(url);
    }

    public showRedirectMessage() {
        if (TRStaticHolder.message.message) {
            if (TRStaticHolder.message.isSuccess) {
                this.showSuccessFlash(TRStaticHolder.message.message)
            } else {
                this.showErrorFlash(TRStaticHolder.message.message)
            }
        }
        TRStaticHolder.message = {};
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


    private setUnsetInputDataError(name: string, isError: boolean = false, errorMessage: string = "") {
        let definition: TrFormDefinitionData | undefined = this.state.formDefinition.get(name);
        if (!definition) {
            return
        }
        if (errorMessage === "") {
            errorMessage = definition.errorMessage;
        }

        isError = definition.required && !this.state.formData[name];
        if (definition.customValidation && definition.customValidation.validate) {
            let response: TRMessageData = definition.customValidation.validate(name, this.state.formData[name], this.state.formData);
            if (response.status === Status.FAILED) {
                isError = true;
                errorMessage = response.message;
            }
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
                if (definition.required && !this.state.formData[name]) {
                    isValid = false;
                    this.setUnsetInputDataError(name);
                }
            });
        }
        return isValid;
    }


    private onChangeSetInputValue(name: string, value: any) {
        if (this.state.formData) {
            this.state.formData[name] = value;
        }
    }

    public getFormData(name: string, defaultValue: any = "") {
        if (this.state.formData && this.state.formData[name]) {
            return this.state.formData[name];
        }
        return defaultValue;
    }

    private getInputValue(name: string) {
        return this.getFormData(name);
    }

    public mapToObject(map: Map<string, any>): object {
       return TrUtil.mapToObject(map);
    }

    public mapToJson(map: Map<string, any>): string {
        return TrUtil.mapToJson(map);
    }

    private getFieldDefinition(name: string): TrFormDefinitionData | any {
        return this.state.formDefinition.get(name);
    }

    private getFilesFromInput(name: string, target: any): Array<File> {
        let files = new Array<File>();
        if (this.state.formData && this.state.formData[name] && this.state.formData[name] instanceof FormData) {
            files = this.state.formData[name];
        }
        if (target && target.files) {
            Array.from(target.files).forEach((file: any) => {
                files.push(file)
            });
        }
        return files;
    }

    private inputDataHandler(name: string, changeEvent?: TREvent) {
        let attributes: { [key: string]: any } = {};
        let definition: TrFormDefinitionData = this.getFieldDefinition(name);
        attributes.name = name;
        attributes.onChange = (event: any) => {
            event.preventDefault();
            const target = event.target;
            const name = target.name;
            let value;
            if (target.type === 'file') {
                value = this.getFilesFromInput(name, target);
            } else if (target.type === 'checkbox') {
                value = target.checked;
            } else {
                value = target.value;
            }
            this.onChangeSetInputValue(name, value);
            this.setUnsetInputDataError(name);
            if (changeEvent && changeEvent.fire) {
                changeEvent.fire(event);
            }
        };

        if (definition && definition.isHelpTextAttribute && definition.helpText) {
            attributes.helperText = definition.helpText;
        }

        if (definition && definition.isErrorAttribute) {
            attributes.error = definition.isError;
            if (definition && definition.isHelpTextAttribute && definition.isError) {
                attributes.helperText = definition.errorMessage;
            }
        }

        if (definition && definition.required) {
            attributes.required = true;
        }

        if (definition && definition.defaultValue) {
            attributes.defaultValue = definition.defaultValue;
        }

        if (definition && definition.fillValue) {
            attributes.value = this.getInputValue(name);
        }
        return attributes;
    }


    public handleInputDataChange(name: string, changeEvent?: TREvent){
        return this.inputDataHandler(name, changeEvent);
    }

    public addFormDefinition(name: string, fullDefinition?: TrFormDefinitionData) {
        let definition: TrFormDefinitionData = fullDefinition ? fullDefinition : new TrFormDefinitionData();
        definition.name = name;
        this.state.formDefinition.set(name, definition);
    }

    public setFormDefinition(fullDefinition: Map<string, TrFormDefinitionData>) {
        this.state.setFormDefinition(fullDefinition);
    }


    public resumeHttpRequest(request: TRHTTRequest, callback: TRHTTCallback) {
        switch (request.method) {
            case this.POST :
                this.httpCaller().post(request, callback);
                break;
            case this.DELETE :
                this.httpCaller().delete(request, callback);
                break;
            case this.PUT :
                this.httpCaller().put(request, callback);
                break;
            case this.GET :
                this.httpCaller().get(request, callback);
                break;
        }
    }

    private resumeableCallback(success?: HTTPCallback, failed?: HTTPCallback): TRHTTCallback {
        return {
            before: (response: TRHTTResponse) => {
                this.showProgress();
            },
            success: (response: TRHTTResponse) => {
                if (success !== undefined) {
                    success.callback(response);
                }
            },
            failed: (response: TRHTTResponse) => {
                if (failed !== undefined) {
                    failed.callback(response);
                }
            },
            finally: () => {
                this.hideProgress();
            }
        };
    }

    public showLoginUI(){
        this.setState({ showLoginUI: true });
    }

    public showProgress(){
        this.setState({ showProgress: true });
    }

    public hideProgress(){
        this.setState({ showProgress: false });
    }

    private renewAuthorization(): void {
        if (this.state.trLastCallData) {
            let trLastCallData: TRLastCallData = this.state.trLastCallData;
            if (trLastCallData.request && trLastCallData.resumeableCallback) {
                this.resumeHttpRequest(trLastCallData.request, trLastCallData.resumeableCallback)
            }
        }
    }


    private renewAuthorizationCallBack(): void {
        const _this = this;
        let trHttpCall: TRHTTPCall = {
            resume(): void {
                _this.renewAuthorization();
            },
            getComponent(): any {
                return _this;
            }
        };
        this.appConfig().renewAuthorization(trHttpCall);
    }


    private createHttpCallBack(request: TRHTTRequest, success?: HTTPCallback, failed?: HTTPCallback): TRHTTCallback {
        let resumeableCallback = this.resumeableCallback(success, failed);
        let lastCall: TRLastCallData = {
            resumeableCallback: resumeableCallback,
            request: request
        };
        const _this = this;
        this.setState({trLastCallData: lastCall});
        let callback: TRHTTCallback = {
            before: (response: TRHTTResponse) => {
                this.showProgress();
            },
            success: (response: TRHTTResponse) => {
                if (this.appConfig().isAuthorized(response)) {
                    resumeableCallback.success(response);
                } else {
                    _this.renewAuthorizationCallBack();
                }
            },
            failed: (response: TRHTTResponse) => {
                if (this.appConfig().isAuthorized(response)) {
                    resumeableCallback.failed(response);
                } else {
                    _this.renewAuthorizationCallBack();
                }
            },
            finally: () => {
                this.hideProgress();
            }
        };
        return callback;
    }

    private httpCaller(): TRHTTPManager {
        return this.appConfig().getHTTPManager();
    }


    public postToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        request.requestData = data;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    public putToApi(url: string, data: object, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.PUT;
        request.requestData = data;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().put(request, callback);
    }

    public postFormDataToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        let formData = new FormData();
        if (data) {
            for (let key in data) {
                if (data[key] instanceof Array) {
                    let items: Array<any> = data[key];
                    items.forEach((value: any) => {
                        formData.append(key, value);
                    })
                } else {
                    formData.append(key, data[key]);
                }
            }
        }
        request.requestData = formData;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().post(request, callback);
    }

    public postJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.POST;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().postJSON(request, callback);
    }

    public putJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.PUT;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().putJSON(request, callback);
    }


    public deleteJsonToApi(url: string, data: any, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.DELETE;
        if (data instanceof Map) {
            request.requestData = this.mapToObject(data);
        } else {
            request.requestData = data
        }
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().deleteJSON(request, callback);
    }

    public deleteToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.DELETE;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().delete(request, callback);
     }


    public getToApi(url: string, success?: HTTPCallback, failed?: HTTPCallback): void {
        let request: TRHTTRequest = this.httpRequestData(url);
        request.method = this.GET;
        let callback: TRHTTCallback = this.createHttpCallBack(request, success, failed);
        this.httpCaller().get(request, callback);
     }


    public showProgressbar = () => {
        this.setState({ showProgress: true })
    };


    public hideProgressbar = () => {
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