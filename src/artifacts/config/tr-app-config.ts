import TRHTTPManager from "../processor/http/tr-http-manager";
import AxiosHTTPManager from "../processor/axios/axios-http-manager";


export default class TRAppConfig {

    public getHTTPManager(): TRHTTPManager {    
        return new AxiosHTTPManager();
    }
    
}