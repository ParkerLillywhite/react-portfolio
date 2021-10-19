import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";






import NavigationContainer from './portfolio/navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";
import PortfolioManager from './pages/portfolio-manager';
import Icons from "../helpers/icons";



export default class App extends Component {

  constructor(props){
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this)
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this)
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
  }

  checkLoginStatus() {
    return axios.
    get("https://api.devcamp.space/logged_in", {
      withCredentials: true
    })
    .then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      //if logged in and status LOGGED_IN => return data
      //if loggedIn status NOT_LOGGED_IN => update state
      //If not loggedIn and status LOGGED_IN => update state

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    })
    .catch(error => {
      console.log("error", error)
    })

  }

  componentDidMount() {
    this.checkLoginStatus();
  }
  //below hides routes from codebase when not logged in
  authorizedPages(){
    return[
      <Route key= "portfoli-manager" path="/portfolio-manager" component={PortfolioManager}/>
      
      
    ]
  }

  render() {
    
    return (
      <div className='container'>
        

        <Router>
          <div>

          <NavigationContainer 
            loggedInStatus = {this.state.loggedInStatus}
            handleSuccessfulLogout = {this.handleSuccessfulLogout}
            />

          

          <Switch>
            <Route exact path="/" component={Home}/>

            <Route 
              path="/auth" 
              //overriding render proccess here
              render={props => (
                //call the auth component
                <Auth
                  {...props} 
                  //allow it to have access to all the props
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
              )
              }
              />
            <Route path="/contact" component={Contact}/>
            
            <Route path="/about-me" component={About}/>

            <Route 
            path="/b/:slug" 
            render={props => (
              <BlogDetail 
                {...props} 
                loggedInStatus={this.state.loggedInStatus}
                />
            )}
            />

            {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages(): null}
            <Route path="/blog" 
            render={props => (
              <Blog {...props} loggedInStatus={this.state.loggedInStatus}/>
            )}
            />


            <Route 
            exact
            path="/portfolio/:slug" 
            component={PortfolioDetail}/>
            <Route component={NoMatch} />
            
          </Switch>
          </div>
        </Router>

        
        
        
      </div>
    );
  }
}
