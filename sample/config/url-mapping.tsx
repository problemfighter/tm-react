import TRURLMapping from "../../artifacts/config/tr-url-mapping";
import React from 'react';


export default class URLMapping extends TRURLMapping {

    public getNotFoundView() {
        return (<h1>OI Pola</h1>)
    }

}