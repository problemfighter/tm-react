import React from 'react';
import TRAppConfig from "../../artifacts/config/tr-app-config";


export default class AppConfig extends TRAppConfig {


    public getNotFoundView() {
        return (<h1>Page not found</h1>)
    }

}