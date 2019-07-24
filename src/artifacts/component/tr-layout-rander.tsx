import React, {Suspense} from 'react';
import TRReactComponent from '../framework/tr-react-component';
import {TRProps, TRState} from '../model/tr-model';


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
                <Suspense fallback={appConfig.getSuspenseLoader()}>
                    <Component route={route} appConfig={appConfig}/>
                </Suspense>
            </React.Fragment>
        )
    }
}