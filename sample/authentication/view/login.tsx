import React from 'react';
import TRComponent from '../../artifacts/component/tr-component';
import TRComponentState from '../../artifacts/component/tr-component-state';
import TRBrowserStorageManager from '../../artifacts/manager/tr-browser-storage-manager';


interface LoginState extends TRComponentState {
    email?: any;
    password?: any;
    errormessage?: any;
}

export default class Login extends TRComponent<any, LoginState> {

    state: LoginState = {
        email: "",
        password: "",
        errormessage: ""
    }

    constructor(props: any) {
        super(props);
    }

    formDataChangeHandler = (event: any) => {
        let inputName = event.target.name;
        let inputValue = event.target.value;
        let error: any = '';
        if (inputName == "email" && inputValue == "") {
            error = <strong>Please Enter Email Address</strong>;
        } else if (inputName == "password" && inputValue == "") {
            error = <strong>Please Enter Password</strong>;
        } else {
            this.setState<never>({ [inputName]: inputValue });
        }
        this.setState({ errormessage: error });
    }

    formSubmitHandler = (event: any) => {
        event.preventDefault();
        if(this.state.email == "admin@test.local" && this.state.password == "123456"){
            TRBrowserStorageManager.add("isAuthorized", true)
            this.props.route.history.push("/dashboard", this.state)
        }else{
            this.setState({ errormessage: <strong>Invalid Username or Password</strong> });  
        }
    }


    renderUI() {
        return (
            <React.Fragment>
                <p><h1>Login Form</h1></p>
                <p>{this.state.errormessage}</p>
                <form onSubmit={this.formSubmitHandler}>
                    <p>Enter your Email:</p>
                    <input type='email' name='email' onChange={this.formDataChangeHandler} />
                    <p>Enter your Password:</p>
                    <input type='password' name='password' onChange={this.formDataChangeHandler} />
                    <p><input type='submit' name='submit' value="Login" /></p>
                </form>
            </React.Fragment>
        );
    }
}