import React from 'react';
import TRComponent from './../../component/tr-component';
import TRReactComponent from '../../framework/tr-react-component';

export default class TRPublicLayout extends TRReactComponent<any, any> {

    render() {
        const Component = this.props.component;
        const route = this.props.route;
        return (
            <React.Fragment>
                <h1>Public layout</h1>
                <Component route={route} />
            </React.Fragment>
        );
    }

}