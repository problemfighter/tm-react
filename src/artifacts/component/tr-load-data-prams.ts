export default class TrLoadDataPrams {
    public isReset: Boolean = false;
    public params: any;

    public resetQuery(): TrLoadDataPrams {
        this.isReset = true
        return this
    }

    public setParams(params: any): TrLoadDataPrams {
        this.params = params
        return this
    }
}