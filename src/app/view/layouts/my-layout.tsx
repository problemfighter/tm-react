import React from 'react';
import TRReactComponent from '../../../artifacts/framework/tr-react-component';
import TRLayoutRenderer from "../../../artifacts/component/tr-layout-rander";

export default class MyLayout extends TRReactComponent<any, any> {

    render() {
        const {component, route, appConfig} = this.props;
        return (
            <React.Fragment>
            <p>My layout</p>
                <TRLayoutRenderer route={route} appConfig={appConfig} component={component}/>
        </React.Fragment>
        );
    }

}