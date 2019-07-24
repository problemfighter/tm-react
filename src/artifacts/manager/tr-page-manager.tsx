import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TRLayoutInfoData from '../data/view/tr-layout-info-data';
import TRPageInfoData from '../data/view/tr-page-info-data';
import {TRPageManagerProps, TRPageManagerState} from '../model/tr-model';
import TRReactComponent from "../framework/tr-react-component";
import AppConfig from "../../app/config/app-config";

declare global {
    interface Window { appConfig: AppConfig; }
}

export default class TRPageManager extends TRReactComponent<TRPageManagerProps, TRPageManagerState> {

    constructor(props: TRPageManagerProps){
        super(props);
        window.appConfig = this.props.appConfig;
    }

    private getRouter(pageInfoData: TRPageInfoData, Layout: any, index: any) {
        const {appConfig} = this.props;
        return (
            <Route
                exact
                path={pageInfoData.relativeURL}
                key={index}
                render={(route) => {
                    return (<Layout component={pageInfoData.component} route={route} appConfig={appConfig} />)
                }}
            />
        )
    }


    private generateURL(pageInfoDataList: Array<TRPageInfoData>, layoutData: any, index: any) {
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
                <Switch>
                    {
                        urlMapping.getLayoutsAndPages().map((layoutData: TRLayoutInfoData, index: any) => {
                            if (layoutData.pageInfoDataList.length !== 0) {
                                return this.generateURL(layoutData.pageInfoDataList, layoutData, index);
                            }
                        })
                    }
                    <Route component={appConfig.getNotFoundView}/>
                </Switch>
            </BrowserRouter>
        );
    }


}