import TRURLMapping from "../../artifacts/config/tr-url-mapping";
import React from 'react';
import TRLayoutInfoData from "../../artifacts/data/view/tr-layout-info-data";
import OtherOne from "../other-one";


const PublicLayout = React.lazy(() => import('./../../artifacts/view/layout/tr-public-layout'));;
const Bismillah = React.lazy(() => import('./../bismillah'));;

export default class URLMapping extends TRURLMapping {



    public getLayoutsAndPages(): Array<TRLayoutInfoData> {
        let pageWithLayout: Array<TRLayoutInfoData> = [];

        let layoutInfo: TRLayoutInfoData = new TRLayoutInfoData();
        layoutInfo.layout = PublicLayout


        layoutInfo.addPageInstance("/miavai", Bismillah);
        layoutInfo.addPageInstance("/miavai/other", OtherOne);
        pageWithLayout.push(layoutInfo);


        return pageWithLayout
    }

}