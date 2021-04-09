export default class TrLoadDataPrams {
    public isReset: Boolean = false;
    public params: any;

    public resetQuery(): TrLoadDataPrams {
        this.isReset = true
        return this
    }
}