import React, { Suspense } from 'react';
import ReactComponent from "../framework/tr-react-component";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import URLMapping from "../../app/config/url-mapping";




export default class TRPageManager extends ReactComponent<any, any> {

    render() {
        let urlMapping = new URLMapping();
        return ( 
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route component={urlMapping.getNotFoundView} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        );
    }



}