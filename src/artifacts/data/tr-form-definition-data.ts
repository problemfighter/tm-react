import {CustomValidation} from "../model/tr-model";

export class TrFormDefinitionData {

    public name?: string;
    public required: boolean = false;
    public isErrorAttribute: boolean = true;
    public isHelpTextAttribute: boolean = true;
    public helpText?: string;
    public fillValue: boolean = true;
    public customValidation?: CustomValidation;
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

    setFillValue(fillValue: boolean): TrFormDefinitionData {
        this.fillValue = fillValue;
        return this;
    }

    setCustomValidation(customValidation: CustomValidation): TrFormDefinitionData {
        this.customValidation = customValidation;
        return this;
    }

    setErrorMessage(value: string): TrFormDefinitionData {
        this.errorMessage = value;
        return this;
    }

    setHelpText(helpText: string): TrFormDefinitionData {
        this.helpText = helpText;
        return this;
    }

    setDefaultValue(value: any): TrFormDefinitionData {
        this.defaultValue = value;
        return this;
    }

}