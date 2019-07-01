import React from 'react';
import TRComponent from '../component/tr-component';
import { TRProps } from '../model/tr-model';
import TRComponentState from '../component/tr-component-state';

export default class TRNotFoundView extends TRComponent<TRProps, TRComponentState> {

    renderUI() {
        return <h1>404 Not Found!!</h1>;;
    }

}