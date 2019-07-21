export const TrUtil = {

    redirectTo: (url: any) => {
        window.location = url;
    },

    gotoUrl: (component: any, url: any) => {
        if (component.props.route.history){
            component.props.route.history.push(url);
        }
    },
    addDataToObject: (object: any, key: any, value: any) =>{
        if (object === undefined) {
            object = {};
        }
        object[key] = value;
        return object;
    },
    hardReload: () => {
        window.location.reload();
    },

    isMatchPathname: (url: any) => {
        return window.location.pathname === url;
    },
    randomString: () => {
        return Math.random().toString(36).substring(7);
    },
    objectValue: (object: any, defaultValue: any, ...props: string[]) => {
        let response = object;
        if (!object) {
            return defaultValue;
        } else if (!props.length) {
            return defaultValue
        } else {
            for (let item of props) {
                if (!response[item]) {
                    return defaultValue
                }
                response = response[item];
            }
        }
        return response;
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