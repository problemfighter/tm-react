import TRHTTAuthCallback from "./tr-http-auth-callback";

export default class TRHTTRequest {

    public url!: string;
    public method!: string;
    public baseURL!: string;
    public requestData!: object;
    public headers!: object;
    public timeoutMS: number = 60000;
    public authCallback!: TRHTTAuthCallback;

}