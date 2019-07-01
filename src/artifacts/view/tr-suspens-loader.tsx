import React from 'react';
import TRComponent from '../component/tr-component';
import TRComponentState from '../component/tr-component-state';
import { TRProps } from '../model/tr-model';

export default class TRSuspensLoader extends TRComponent<TRProps, TRComponentState> {

    renderUI() {
        return <h1>404 Not Found!!</h1>;;
    }

}