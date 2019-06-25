
import React, { Component } from 'react';
import { TRMessageData } from '../data/tr-message-data';
import TRReactComponent from '../framework/tr-react-component';
import { TRProps, TRState } from '../model/tr-model';
import TRComponentState from './tr-component-state';
import AppConfig from '../../app/config/app-config';

export default class TRComponent<P = TRProps, S = TRState> extends TRReactComponent<any, TRComponentState> {

    constructor(props: any) {
        super(props);
    }


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


    private httpCaller() {

    }


    public renderUI() {
        return (
            <h1>React Application View Component</h1>
        );
    }

    render() {
        const appConfig = new AppConfig();
        const state = this.state;
        return (
            <React.Fragment>
                {appConfig.getBeforeRenderUIView(state)}
                {this.renderUI()}
            </React.Fragment>
        )
    }

}