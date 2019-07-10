import ReactDOM from 'react-dom';
import React from 'react';
import TRPageManager from './artifacts/manager/tr-page-manager';
import AppConfig from "./app/config/app-config";
import URLMapping from "./app/config/url-mapping";

const appConfig = new AppConfig();
const urlMapping = new URLMapping();
ReactDOM.render(<TRPageManager appConfig={appConfig} urlMapping={urlMapping}/>, document.getElementById('root'));