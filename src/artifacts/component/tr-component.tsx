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

export default class TRComponent<P = TRProps, S = TRState> extends TRReactComponent<any, TRComponentState> {

    constructor(props: any) {
        super(props);
    }


    private appConfig(): AppConfig {
        return new AppConfig();
    }


    private httpRequestData(url: string): TRHTTRequest {
        let request: TRHTTRequest = new TRHTTRequest();
        request.baseURL = this.appConfig().getBaseURL();
        request.url = url;
        return request;
    }

    private createHttpCallBack(success: HTTPCallback, failed: HTTPCallback): TRHTTCallback {
        let callback: TRHTTCallback = {
            before: (response: TRHTTResponse) => {
                this.setState({ showProgress: true })
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
                this.setState({ showProgress: false })
            }
        }
        return callback;
    }

    

    private httpCaller(): TRHTTPManager {
        return this.appConfig().getHTTPManager()
    }


    postToApi(success?: HTTPCallback, failed?: HTTPCallback): void { }

    postJsonToApi(success?: HTTPCallback, failed?: HTTPCallback): void { }

    deleteJsonToApi(success?: HTTPCallback, failed?: HTTPCallback): void { }

    deleteToApi(success?: HTTPCallback, failed?: HTTPCallback): void { }

    getToApi(success?: HTTPCallback, failed?: HTTPCallback): void { }


    showProgressbar = () => {
        this.setState({ showProgress: true })
    };


    hideProgressbar = () => {
        this.setState({ showProgress: false })
    };


    showSuccessInfo = (message: String) => {
        this.setState({ messageData: TRMessageData.success(message) });
    };


    showErrorInfo = (message: String) => {
        this.setState({
            messageData: TRMessageData.failed(message)
        });
    };


    public renderUI() {
        return (
            <h1>TR React Application View Component</h1>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.appConfig().getBeforeRenderUIView(this.state)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}