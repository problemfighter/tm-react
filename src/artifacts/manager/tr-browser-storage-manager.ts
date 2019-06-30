export default class TRBrowserStorageManager {


    public static add(key: string, value: any) {
        return localStorage.setItem(key, value);
    }

    public static addAsJSONString(key: string, value: any) {
        return this.add(key, JSON.stringify(value));
    }

    public static addAsBase64(key: string, value: any) {
        return this.add(key, window.btoa(value));
    }


    public static remove(key: string) {
        return localStorage.removeItem(key);
    }


    public static clear() {
        return localStorage.clear();
    }

    public static getByKey(key: string): any {
        return localStorage.getItem(key);
    }

    public static getAsJSON(key: string) {
        return JSON.parse(this.getByKey(key));
    }

    public static getFromBase64(key: string) {
        return JSON.parse(window.atob(this.getByKey(key)));
    }


    public static addAsSession(key: string, value: any) {
        return sessionStorage.setItem(key, value);
    }

    public static getByKeyFromSession(key: string): any {
        return sessionStorage.getItem(key);
    }

    public static removeFromSession(key: string) {
        return sessionStorage.removeItem(key);
    }

    public static clearSession() {
        return sessionStorage.clear();
    }

    public static addAsJSONStringInSession(key: string, value: any) {
        return this.addAsSession(key, JSON.stringify(value));
    }

    public static getAsJSONFromSession(key: string) {
        return JSON.parse(this.getByKeyFromSession(key));
    }

}