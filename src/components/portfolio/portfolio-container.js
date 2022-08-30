import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from './portfolio-item';

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []
        };
        this.handleFilter = this.handleFilter.bind(this);  //have to do for each custom func dealing with events 

    }
    //pass args str8 in2 handlers
    handleFilter(filter) {
        this.setState({  //allow to loop thru and find items we want to work with
            data: this.state.data.filter(item =>{
                return item.category === filter;  //since stored in var we are setting state with this
            })
        });

    }

    getPortfolioItems() {
        // Make a request for a user with a given ID
    axios.get("https://brettbuckley.devcamp.space/portfolio/portfolio_items")
    .then(response => {
        console.log("response data", response);
      // handle success
      this.setState({
        data: response.data.portfolio_items
      })
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
      }


    portfolioItems() {

        return this.state.data.map(item => {
            return <PortfolioItem key={item.id} item={item}/>;
        });
    }

    componentDidMount() {
        this.getPortfolioItems();

    }
//function for us to click a button on the page and then should update title- 
//func takes a () and an object, so ()and {}, looks at state propery, initial state, then page title key, then change it's value

    render() {
        if (this.state.isLoading){  //short circuiting render function
            return <div>Loading...</div>
        }

        return (       //  using anon func in onclicks, these are changing state and throwing away others, must refresh to rehit buttons.
                
                <div className="portfolio-items-wrapper">
                <button className="btn" onClick={() => this.handleFilter('Operations/ProblemSolve')}> Operations/ProblemSolve </button> 
                <button className="btn" onClick={() => this.handleFilter('IT/Management')}> IT/Management </button>
                <button className="btn" onClick={() => this.handleFilter('Management/Performance')}> Management/Performance </button>
                {this.portfolioItems()} </div>
                
        );
    }
}