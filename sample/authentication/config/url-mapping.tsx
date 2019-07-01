import TRURLMapping from "../../artifacts/config/tr-url-mapping";
import React from 'react';
import TRLayoutInfoData from "../../artifacts/data/view/tr-layout-info-data";


const PublicLayout = React.lazy(() => import('./../view/layouts/public-layout'));
const PrivateLayout = React.lazy(() => import('./../view/layouts/private-layout'));
const Login = React.lazy(() => import('../view/login'));
const Dashboard = React.lazy(() => import('../view/dashboard'));

export default class URLMapping extends TRURLMapping {

    public getLayoutsAndPages(): Array<TRLayoutInfoData> {
        let pageWithLayout: Array<TRLayoutInfoData> = [];

        let publicLayoutInfo: TRLayoutInfoData = new TRLayoutInfoData();
        publicLayoutInfo.layout = PublicLayout
        publicLayoutInfo.addPageInstance("/", Login);
        pageWithLayout.push(publicLayoutInfo);


        let privateLayoutInfo: TRLayoutInfoData = new TRLayoutInfoData();
        privateLayoutInfo.layout = PrivateLayout
        privateLayoutInfo.addPageInstance("/dashboard", Dashboard);
        pageWithLayout.push(privateLayoutInfo);

        return pageWithLayout
    }

}