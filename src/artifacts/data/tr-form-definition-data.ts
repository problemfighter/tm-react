export class TrFormDefinitionData {

    public name?: string;
    public required: boolean = false;
    public isErrorAttribute: boolean = true;
    public isHelpTextAttribute: boolean = true;
    public isError: boolean = false;
    public errorMessage: string = "This Field is Required";
    public defaultValue: any = "";

    public constructor(init?: Partial<TrFormDefinitionData>) {
        Object.assign(this, init);
    }

    setName(value: string): TrFormDefinitionData {
        this.name = value;
        return this;
    }

    setRequired(value: boolean): TrFormDefinitionData {
        this.required = value;
        return this;
    }

    setIsError(value: boolean): TrFormDefinitionData {
        this.isError = value;
        return this;
    }

    setErrorMessage(value: string): TrFormDefinitionData {
        this.errorMessage = value;
        return this;
    }

    setDefaultValue(value: any): TrFormDefinitionData {
        this.defaultValue = value;
        return this;
    }

}