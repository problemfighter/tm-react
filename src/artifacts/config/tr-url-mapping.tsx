import React from 'react';
import TRClassLoader from '../tr-class-loader';

const TRNotFoundView = TRClassLoader.loadArtifactsView("tr-not-found-view");
const TRSuspensLoader = TRClassLoader.loadArtifactsView("tr-suspens-loader");

export default class TRURLMapping {


    public getNotFoundView() {
        return (<TRNotFoundView/>)
    }

    public getSuspenseLoader() {
        return (<TRSuspensLoader/>)
    }

}