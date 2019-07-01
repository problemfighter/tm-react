import React from 'react';
import TRComponent from '../../artifacts/component/tr-component';
import { TRProps } from '../../artifacts/model/tr-model';
import TRComponentState from '../../artifacts/component/tr-component-state';
import TRBrowserStorageManager from '../../artifacts/manager/tr-browser-storage-manager';



export default class Dashboard extends TRComponent<any, TRComponentState> {

    

    logout = (event:any) =>{
        TRBrowserStorageManager.remove("isAuthorized")
        this.props.route.history.push("/", this.state)
    }

    renderUI() {
        return (
            <React.Fragment>
                <h1>Login Success.</h1>
                <p><a onClick={this.logout}>Logout</a></p>
            </React.Fragment>
        );
    }
}