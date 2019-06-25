import React from 'react';
import { TRProps, TRState } from '../model/tr-model';
import TRComponentState from '../component/tr-component-state';
import TRReactComponent from '../framework/tr-react-component';

class Props implements TRProps {
    public componentState?: TRComponentState;
}

export default class TRBeforeRenderUIView extends TRReactComponent<Props, TRState> {

    render() {
        return <React.Fragment/>;
    }

}