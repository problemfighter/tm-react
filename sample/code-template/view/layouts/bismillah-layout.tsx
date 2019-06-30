import React from 'react';
import TRReactComponent from '../../../artifacts/framework/tr-react-component';

export default class BismillahLayout extends TRReactComponent<any, any> {

    render() {
        const Component = this.props.component;
        const route = this.props.route;
        return (
            <React.Fragment>
            <h1>Bismilla layout</h1>
            <Component route={route} />
        </React.Fragment>
        );
    }

}