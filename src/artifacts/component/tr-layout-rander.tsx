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


export interface LayoutRendererProps extends TRProps {
    route: any
    appConfig: any
    component: any
}

export default class TRLayoutRenderer extends TRReactComponent<LayoutRendererProps, TRState> {
    render() {
        const Component = this.props.component;
        const {route, appConfig} = this.props;
        return (
            <React.Fragment>
                <Component route={route} appConfig={appConfig}/>
            </React.Fragment>
        )
    }
}