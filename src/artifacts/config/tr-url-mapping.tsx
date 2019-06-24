import TRClassLoader from '../tr-class-loader';
import TRLayoutInfoData from '../data/view/tr-layout-info-data';
import React, { lazy } from 'react';

const TRNotFoundView = lazy(() => import('./../view/tr-not-found-view'));
const TRSuspensLoader = lazy(() => import('./../view/tr-suspens-loader'));

export default class TRURLMapping {


    public getNotFoundView() {
        return (<TRNotFoundView/>)
    }

    public getSuspenseLoader() {
        return (<TRSuspensLoader/>)
    }


    public getLayoutsAndPages() : Array<TRLayoutInfoData>{
        return []
    }

}