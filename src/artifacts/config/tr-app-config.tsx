import TRHTTPManager from "../processor/http/tr-http-manager";
import AxiosHTTPManager from "../processor/axios/axios-http-manager";
import React, { lazy } from "react";
import TRComponentState from "../component/tr-component-state";

const TRNotFoundView = lazy(() => import('../view/tr-not-found-view'));
const TRSuspensLoader = lazy(() => import('../view/tr-suspens-loader'));
const TRBeforeRenderUIView = lazy(() => import('../view/tr-before-render-ui-view'));


export default class TRAppConfig {

    public getBeforeRenderUIView(componentState: TRComponentState) {
        return (<TRBeforeRenderUIView componentState={componentState} />)
    }

    public getNotFoundView() {
        return (<TRNotFoundView />)
    }

    public getSuspenseLoader() {
        return (<TRSuspensLoader />)
    }

    public getHTTPManager(): TRHTTPManager {
        return new AxiosHTTPManager();
    }


    public getBaseURL(): string {
        return "";
    }

}