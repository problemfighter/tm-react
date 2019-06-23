
import React, { lazy } from 'react';


export default class TRjsLoader {

    public static loadClass(path: string): any {
        return lazy(() => import(path));
    }

    public static load(path: string): any {
        return TRjsLoader.loadClass('./../../../' + path);
    }
}