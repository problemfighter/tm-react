
import { lazy } from 'react';


export default class TRClassLoader {

    public static loadClass(path: string): any {
        return lazy(() => import(path));
    }

    public static loadApp(path: string){
        return TRClassLoader.loadClass('./../' + path);
    }

    public static loadArtifacts(path: string){
       return TRClassLoader.loadClass('./' + path);
    }

    public static loadArtifactsView(path: string){
        return TRClassLoader.loadArtifacts('view/' + path); 
    }

    
    public static loadArtifactsLayout(path: string){
        return TRClassLoader.loadArtifactsView('layouts/' + path); 
    }
}