import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Switch, 
  Route
} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from './navigation/navigation-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth"
import NoMatch from "./pages/no-match";
import Icons from "../helpers/icons";

export default class App extends Component {
 constructor(props) {
  super(props);

  Icons();

  this.state = {
    loggedInStatus: "NOT_LOGGED_IN"
  };

  this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
  this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
  this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
}

 handleSuccessfulLogin() {
  this.setState({
    loggedInStatus: "LOGGED_IN"
  });
 }

 handleUnsuccessfulLogin() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
 }
 handleSuccessfulLogout() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
 };

 checkLoginStatus() {
  return axios
  .get("https://api.devcamp.space/logged_in", { withCredentials: true
})
.then(response => {  //grabbing data, saving as vars and then implement conditional
  const loggedIn = response.data.logged_in;  //then do it for state
  const loggedInStatus = this.state.loggedInStatus;  //axios returns a promise, so need to call then on it
//if loggedIn & status is LOGGED_IN(in state) => return data
//if loggedIn status NOT_LOGGED_IN => update state 
//if not loggedIn & status is LOGGED_in => update state to logged_out
  if (loggedIn && loggedInStatus === "LOGGED_IN"){
    return loggedIn;
  } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  } else if (!loggedIn && loggedinStatus === "LOGGED_IN") {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }  //always want a catch with a promise
})
.catch(error =>{
  console.log("Error", error);
})
 }
 
 componentDidMount() { //lifecycle hook
  this.checkLoginStatus();
 }

 authorizedPages() {
  return [
    <Route key="portfolio-manager" path="/portfolio-manager" component = {PortfolioManager} />
    
  ];
 }

  render() {
    return (
      <div className="container">
      <Router>
        <div>
        <NavigationContainer 
        loggedInStatus={this.state.loggedInStatus} 
        handleSuccessfulLogout={this.state.handleSuccessfulLogout}
        />

        <Switch>
          <Route exact path="/" component = {Home} />

          <Route
           path="/auth" 
           render = {props =>(         //this is a render prop, takes a func, little advanced but cool, allows to pass in a props and what 
            <Auth                     //we want to render at a certain state
            {...props}
            handleSuccessfulLogin={this.handleSuccessfulLogin}
            handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
            />
           )}
           />

          <Route path="/about-me" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" 
          render={props => (  //explicit vs implicit  returns, if use {} must return, but if it all on one line you don't or () u don't
          <Blog {...props} loggedInStatus={this.state.loggedInStatus} />

          )}
          />
          <Route 
          path="/b/:slug"
          render={props => (
            <BlogDetail {...props} loggedInStatus={this.state.loggedInStatus} />
          )}
          />

          {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()) : null}
          <Route exact path="/portfolio/:slug" component= {PortfolioDetail} />
          <Route component={NoMatch} />
        </Switch>
        </div>
      </Router>
        
        </div>
    );
  }
}
