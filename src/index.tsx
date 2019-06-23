import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import TRPageManager from './artifacts/manager/tr-page-manager';




// ReactDOM.render(<Suspense fallback={<div>Loading...</div>}><Bismillah /></Suspense>, document.getElementById('root'));
// ReactDOM.render(<Suspense fallback={<div>Loading...</div>}><TRPageManager /></Suspense>, document.getElementById('root'));
ReactDOM.render(<TRPageManager/>, document.getElementById('root'));



// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
