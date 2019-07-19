export const TrUtil = {

    redirectTo: (url: any) => {
        window.location = url;
    },

    hardReload: () => {
        window.location.reload();
    },

    isMatchPathname: (url: any) => {
        return window.location.pathname === url;
    },

    mapToJson(map: Map<string, any>): string {
        return JSON.stringify(this.mapToObject(map));
    },

    mapToObject: (map: Map<string, any>) => {
        let jsonObject: { [key: string]: any } = {};
        if (map) {
            map.forEach((value: any, key: any) => {
                jsonObject[key] = value;
            });
            return jsonObject;
        }
        return {}
    }


};