import TRHTTAuthCallback from "./tr-http-auth-callback";

export default class TRHTTRequest {

    public url?: string;
    public method?: any;
    public baseURL?: string;
    public requestData?: any;
    public headers?: any;
    public timeoutMS: number = 60000;
    public authCallback?: TRHTTAuthCallback;

}