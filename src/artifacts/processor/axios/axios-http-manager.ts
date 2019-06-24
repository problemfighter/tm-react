import TRHTTPManager from "../http/tr-http-manager";
import TRHTTRequest from "../http/tr-http-request";
import TRHTTCallback from "../http/tr-http-callback";
import axios, {AxiosError, AxiosResponse} from 'axios';

export default class AxiosHTTPManager implements TRHTTPManager{


    private httpCall() {
        axios.get('/user?ID=12345').then((response: AxiosResponse) => {

        }).catch((error: AxiosError) => {

        }).finally(() => {

        });
    }

   public delete(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public deleteJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public get(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public post(request: TRHTTRequest, callback: TRHTTCallback): void {
    }


    public postJSON(request: TRHTTRequest, callback: TRHTTCallback): void {
    }
    
    

    
}