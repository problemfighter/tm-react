import React, {Suspense} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TRLayoutInfoData from '../data/view/tr-layout-info-data';
import TRPageInfoData from '../data/view/tr-page-info-data';
import {TRPageManagerProps, TRPageManagerState} from '../model/tr-model';
import TRReactComponent from "../framework/tr-react-component";
import TrStaticData from "../config/tr-static-data";


export default class TRPageManager extends TRReactComponent<TRPageManagerProps, TRPageManagerState> {

    constructor(props: TRPageManagerProps){
        super(props);
        TrStaticData.appConfig = props.appConfig;
    }

    private getRouter(pageInfoData: TRPageInfoData, trLayout: any, index: any) {
        const {appConfig} = this.props;
        return (
            <Route
                exact
                path={pageInfoData.relativeURL}
                key={index}
                render={(route) => {
                    const Layout = trLayout;
                    return (<React.Fragment>
                        <Layout
                            component={pageInfoData.component}
                            route={route}
                            appConfig={appConfig}
                        />
                    </React.Fragment>)
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
                <Suspense fallback={appConfig.getSuspenseLoader}>
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
                </Suspense>
            </BrowserRouter>
        );
    }


}