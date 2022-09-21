import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state= { //default state of portfolio items, is an array, when component mounts we call get portitems, and populating array
            portfolioItems: [],
            portfolioToEdit: {}
        };


        this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) { //telling api which record to delete - checks if its my records and then deletes "the chosen one"
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, {withCredentials: true}
        ).then(response => { //need to iterate over state/portfolio items
            this.setState({  //set and iterate, creating new collection on the fly
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            });
            return response.data;
        }).catch(error => {
            console.log("handleDeleteClick error", error);
        });
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }


    handleNewFormSubmission(portfolioItem) { //adding to array at the top, cant just push -taking state(an array) and adding to portfolio single item array
        this.setState({  //if just pushed it would go to bottom
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        });
        //TODO
        //update the portfolioitems state
        //add the portfolioItem to the list
    }

    handleFormSubmissionError(error) { 
        console.log("handleFormSubmissionError error", error);
    }

    getPortfolioItems() {  //optional param in sitelink
        axios //specific to this api, the ? at the end there below.  remove ? - the " to make it be opposite  !!!!!!!!!!!!!!!!!!!!
        .get("https://brettbuckley.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", {withCredentials: true
    })
    .then(response=> {
        this.setState({
            portfolioItems: [...response.data.portfolio_items]
        });
    })
    .catch(error => {
        console.log("error in getPortfolioItems", error);
    })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }
    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm 
                        handleNewFormSubmission={this.handleNewFormSubmission}
                        handleEditFormSubmission={this.handleEditFormSubmission}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>

                <div className="right-column">
                    <h1>
                        <PortfolioSidebarList  // letting the sidebar list know it has access to them
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItems}
                        handleEditClick={this.handleEditClick}
                        />
                    </h1>
                </div>
            </div>
        );
    }
}