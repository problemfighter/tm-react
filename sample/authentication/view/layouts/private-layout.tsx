import React from 'react';
import TRReactComponent from '../../../artifacts/framework/tr-react-component';
import { Redirect } from 'react-router';
import TRBrowserStorageManager from '../../../artifacts/manager/tr-browser-storage-manager';

export default class PrivateLayout extends TRReactComponent<any, any> {

    render() {
        const Component = this.props.component;
        const route = this.props.route;

        let view = <Component route={route} />
        if (!Boolean(TRBrowserStorageManager.getAsJSON("isAuthorized"))) {
            view = (<Redirect to="/" />);
        }


        return (
            <React.Fragment>
                <p>Private layout</p>
                {view}
            </React.Fragment>
        );
    }

}