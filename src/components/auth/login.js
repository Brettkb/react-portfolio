import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {   //using js primitive object, turns to string, updates form and state
        this.setState({  //dynamic value in an object below, allows the state of data entry to update - instead of staying "Your email" forever
        [event.target.name]: event.target.value,
        errorText: ""
        });
    }
        //what processes we want to occur when submitted - willhave to send to api - need to access state and how form submission process wrks
        //if don't then when submitting now it refreshes page, handles event, nav to link and then puts email/pw into address bar
        handleSubmit(event) {
            axios
              .post(
                "https://api.devcamp.space/sessions",
                {
                  client: {
                    email: this.state.email,
                    password: this.state.password
                  }
                },
                { withCredentials: true }
              )
              .then(response => {
                if (response.data.status === 'created') {
                    this.props.handleSuccessfulAuth();
                } else {
                    this.setState({
                        errorText: "Wrong email or password"
                    });
                    this.props.handleUnsuccessfulAuth();
                }
              })
              .catch(error => {
                console.log("some error occurred", error);
                this.setState ({
                    errorText: "An error occurred"
                });
                this.props.handleUnsuccessfulAuth();
              });  
        
            event.preventDefault();
          }
        

    render() {
        return (
        <div>
            <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>
            <div>{this.state.errorText}</div>
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper"> 
                <div className="form-group">
                <FontAwesomeIcon icon = "envelope" />
                    <input type ="email" name= "email" placeholder="Your email" value = {this.state.email} onChange={this.handleChange}
                    />
                  </div>
                    <div className="form-group">
                    <FontAwesomeIcon icon="lock" />
                    <input type ="password" name= "password" placeholder="Your password" value = {this.state.password} onChange={this.handleChange} 
                    />
                  </div>
                        <button className="btn" type="submit">Login</button>
                </form>            
        </div>
        );
    }
}