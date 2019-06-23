import React, { Component } from 'react';
import TRjsLoader from '../processor/loader/tr-js-loader';


export default class ReactComponent<P, S> extends Component<P, S> {

    public loadClass(className: string): any {
        return TRjsLoader.load(className);
    }

}