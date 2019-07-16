export const TrUtil = {

    redirectTo: (url: any) => {
        window.location = url;
    },

    hardReload: () => {
        window.location.reload();
    },

    isMatchPathname: (url: any) => {
        return window.location.pathname === url;
    }


};