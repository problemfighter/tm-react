
import React, { Suspense, lazy } from 'react';


export default class TRClassLoader {

    public loadClassImport(path: any) {        
        return import(path + '');
    }

    public  loadClass(path: string) {        
        return lazy(() => {
            let xyz = new TRClassLoader();
            return xyz.loadClassImport(path);
        });
    }

    public static loadApp(path: string){
        // return TRClassLoader.loadClass('./../view/tr-not-found-view');
    }

    public static loadArtifacts(path: string){
    //    return TRClassLoader.loadClass('../app/bismillah');
    }

    public static loadArtifactsView(path: string){
        return TRClassLoader.loadArtifacts('view/' + path); 
    }

    
    public static loadArtifactsLayout(path: string){
        return TRClassLoader.loadArtifactsView('layouts/' + path); 
    }
}