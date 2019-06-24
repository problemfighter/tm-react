import TRPageInfoData from "./tr-page-info-data";


export default class TRLayoutInfoData {


    public layout: any;
    public pageInfoDataList: Array<TRPageInfoData> = [];


    public addPage(pageInfo: TRPageInfoData): TRLayoutInfoData {
        this.pageInfoDataList.push(pageInfo);
        return this;
    }

    public addPageInstance(relativeURL: string, component: any): TRLayoutInfoData {
        this.pageInfoDataList.push(this.pageInfoInstance(relativeURL, component));
        return this;
    }

    public pageInfoInstance(relativeURL: string, component: any): TRPageInfoData {
        let pageInfo = new TRPageInfoData();
        pageInfo.relativeURL = relativeURL;
        pageInfo.component = component;
        return pageInfo;
    }

    public static instance(layout: any): TRLayoutInfoData {
        let layoutData = new TRLayoutInfoData();
        layoutData.layout = layout;
        return layoutData;
    }

}