export default class TrLoadDataPrams {
    public isReset: Boolean = false;

    public resetQuery(): TrLoadDataPrams {
        this.isReset = true
        return this
    }
}