import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TRjsLoader from './artifacts/processor/loader/tr-js-loader';
import React, { Suspense, lazy } from 'react';

const fileName = 'app/bismillah';
const Bismillah = TRjsLoader.load(fileName);
// const Bismillah = lazy(() => import(fileName));;



ReactDOM.render(<Suspense fallback={<div>Loading...</div>}><Bismillah /></Suspense>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
