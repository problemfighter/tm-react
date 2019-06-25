import React, { Suspense } from 'react';
import ReactComponent from "../framework/tr-react-component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import URLMapping from "../../app/config/url-mapping";
import TRLayoutInfoData from '../data/view/tr-layout-info-data';
import TRPageInfoData from '../data/view/tr-page-info-data';
import { TRProps, TRState } from '../model/tr-model';
import AppConfig from '../../app/config/app-config';




export default class TRPageManager extends ReactComponent<TRProps, TRState> {

    private getRouter(pageInfoData: TRPageInfoData, trLayout: any, index: any) {
        return (
            <Route
                exact
                path={pageInfoData.relativeURL}
                key={index}
                render={(route) => {
                    const Layout = trLayout;
                    return (<React.Fragment><Layout component={pageInfoData.component} route={route} /></React.Fragment>)
                }}
            />
        )
    }


    private generateURL(pageInfoDataList: Array<TRPageInfoData>, layoutData: any, index: any){
            return pageInfoDataList.map((pageInfoData: TRPageInfoData, nestedIndex) => {
                if (pageInfoData.isActive) {
                    return this.getRouter(pageInfoData, layoutData.layout, index);
                }
            });
    }


    render() {
        let urlMapping = new URLMapping();
        let appConfig = new AppConfig();
        return (
            <BrowserRouter>
                <Suspense fallback={appConfig.getSuspenseLoader}>
                    <Switch>
                        {
                            urlMapping.getLayoutsAndPages().map((layoutData: TRLayoutInfoData, index) => {
                                if (layoutData.pageInfoDataList.length !== 0) {
                                    return this.generateURL(layoutData.pageInfoDataList, layoutData, index);
                                }
                            })
                        }
                        <Route component={appConfig.getNotFoundView} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }



}