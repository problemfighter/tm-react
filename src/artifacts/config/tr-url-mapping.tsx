import React from 'react';
import TRClassLoader from '../tr-class-loader';

const TRNotFoundView = TRClassLoader.loadArtifactsView("tr-not-found-view");
const TRSuspensLOader = TRClassLoader.loadArtifactsView("tr-suspens-loader");

export default class TRURLMapping {


    public getNotFoundView() {
        return (<TRNotFoundView/>)
    }

    public getSuspenseLoader() {
        return (<TRSuspensLOader/>)
    }

}