import React, {Suspense} from 'react';
import TRReactComponent from '../framework/tr-react-component';
import {TRProps, TRState} from '../model/tr-model';


export interface LayoutRendererProps extends TRProps {
    route: any
    appConfig: any
    component: any
    suspenseLoader?: any
}

export default class TRLayoutRenderer extends TRReactComponent<LayoutRendererProps, TRState> {
    render() {
        const Component = this.props.component;
        const {route, appConfig, suspenseLoader} = this.props;
        const suspense = suspenseLoader ? suspenseLoader : appConfig.getSuspenseLoader();
        return (
            <React.Fragment>
                <Suspense fallback={suspense}>
                    <Component route={route} appConfig={appConfig}/>
                </Suspense>
            </React.Fragment>
        )
    }
}