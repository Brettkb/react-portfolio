import React, { Component } from "react";
import Login from "../auth/login";
import loginImg from "../../../static/assets/images/auth/login.jpg"

export default class Auth extends Component {  //intermediary, talks to app, but also passes data back and forth with login component
    constructor(props) {
        super(props);
// anytime passing a method down thru props we must bind it
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);  //now make mthods
        
    }

    handleSuccessfulAuth() {  //call like any other prop, pass func instead of string tho
        this.props.handleSuccessfulLogin();//below is redirect, looking into history of when app was gone to, where we they routed to 
        this.props.history.push("/");
    }

    handleUnsuccessfulAuth() {
        this.props.handleUnsuccessfulLogin();//now need to call from login component and will auto go up to app compnent
    }

    handle
    render() {
        return (
        <div className="auth-page-wrapper">
            <div className="left-column" 
                style={{
                    backgroundImage: `url(${loginImg})`
                }}
            /> 
        <div className="right-column">
            <Login
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}   
             />
        </div>
        </div>
        );
    }
}