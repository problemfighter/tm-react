import TRHTTPManager from "../processor/http/tr-http-manager";
import AxiosHTTPManager from "../processor/axios/axios-http-manager";
import React, { lazy } from "react";
import TRComponentState from "../component/tr-component-state";
import TRHTTResponse from "../processor/http/tr-http-response";
import TRHTTAuthCallback from "../processor/http/tr-http-auth-callback";

const TRNotFoundView = lazy(() => import('../view/tr-not-found-view'));
const TRBeforeRenderUIView = lazy(() => import('../view/tr-before-render-ui-view'));


export default class TRAppConfig {

    public getBeforeRenderUIView(componentState: TRComponentState, component: any) {
        return (<TRBeforeRenderUIView componentState={componentState} component={component} />)
    }

    public getNotFoundView() {
        return (<TRNotFoundView />)
    }

    public getSuspenseLoader() {
        return (<React.Fragment>Please Wait....</React.Fragment>)
    }

    public getHTTPManager(): TRHTTPManager {
        return new AxiosHTTPManager();
    }

    public authCallback(): TRHTTAuthCallback | undefined{
        return undefined;
    }

    public getBaseURL(): string {
        return "";
    }

    public isUnauthorized (response?: TRHTTResponse): boolean {
        return false;
    }

}