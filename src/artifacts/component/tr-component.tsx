
import React, { Component } from 'react';
import { TRMessageData } from '../data/tr-message-data';
import TRReactComponent from '../framework/tr-react-component';

export default class TRComponent extends TRReactComponent<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isShowProgress: false,
            message: null
        };
    }


    showProgressbar = () => {
        this.setState({ isShowProgress: true })
    };


    hideProgressbar = () => {
        this.setState({ isShowProgress: false })
    };


    showSuccessInfo = (message: String) => {
        this.setState({ message: TRMessageData.success(message) });
    };


    showErrorInfo = (message: String) => {
        this.setState({
            message: TRMessageData.failed(message)
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
        return (
            <React.Fragment>
                {this.renderUI()}
            </React.Fragment>
        )
    }

}