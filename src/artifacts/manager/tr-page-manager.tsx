import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TRLayoutInfoData from '../data/view/tr-layout-info-data';
import TRPageInfoData from '../data/view/tr-page-info-data';
import {TRPageManagerProps, TRPageManagerState} from '../model/tr-model';
import TRReactComponent from "../framework/tr-react-component";




export default class TRPageManager extends TRReactComponent<TRPageManagerProps, TRPageManagerState> {

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
        let urlMapping = this.props.urlMapping;
        let appConfig = this.props.appConfig;
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