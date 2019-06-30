import React, { Component }  from 'react';
import TRComponent from '../artifacts/component/tr-component';
import TRHTTResponse from '../artifacts/processor/http/tr-http-response';


export default class Bismillah extends TRComponent {
    



    public callTo(){
        this.getToApi("api/v1/authentication/logout", {
            callback: (response: TRHTTResponse)=>{
                console.log(response);
            }
        }, {
            callback: (response: TRHTTResponse)=>{
                console.log(response);
            }
        });


        console.log("Post Test");
        this.postJsonToApi("api/v1/authentication/login", 
        {
            email: "admin@taskmanager.local",
            password: "123456",
        }, {
            callback: (response: TRHTTResponse)=>{
                console.log(response);
            }
        }, {
            callback: (response: TRHTTResponse)=>{
                console.log(response);
            }
        });
    }

    componentDidMount() {
        this.callTo();
    }

    renderUI() {
        
        return <h1>Bismillah</h1>;
    }
}