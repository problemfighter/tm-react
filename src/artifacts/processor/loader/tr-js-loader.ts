
import React, { lazy } from 'react';


export default class TRjsLoader {

    public static load(path: string): any {
        return lazy(() => import('./../../../' + path));
    }
}