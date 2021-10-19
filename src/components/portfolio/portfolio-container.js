import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component{
    constructor(){
        super();
        this.state = {
            pageTitle: "Welcome to my portfolio",
            isLoading: false,
            data: []
        };

        this.handleFilter = this.handleFilter.bind(this)
        this.getPortfolioItems=this.getPortfolioItems.bind(this);
    }

    handleFilter(filter){
        if (filter === "Clear_Filter"){
            this.getPortfolioItems();
        } else {
            this.getPortfolioItems(filter);
        }
       
    }

    getPortfolioItems(filter = null){
        axios
          .get("https://parkerlillywhite.devcamp.space/portfolio/portfolio_items")
          .then(response => {
              if(filter)  {
                this.setState({
                    data: response.data.portfolio_items.filter(item => {
                        return item.category === filter;
                        //if the item category is equal to the filet, i want you to return it
                    })
                })

              } else {
                this.setState({
                    data: response.data.portfolio_items
                })
              }
            
            
          })
          .catch(error => {
            console.log(error);
          })
      }

    portfolioItems() {
    
        return this.state.data.map(item => {
            
            return <PortfolioItem 
            key={item.id} 
            item={item} 
            />;
        })
        //map build up a collection
        //map always has to return something
    }


    componentDidMount(){
        this.getPortfolioItems();
    }

    

    render(){
        if (this.state.isLoading) {
            return <div>loading...</div>;
        }

        

        return ( 
            <div className="homepage-wrapper">
                <div className="filter-links">
                <button className="btn" onClick={() => this.handleFilter('ecommerce')}>ecommerce</button>
                <button className="btn" onClick={() => this.handleFilter('Scheduling')}>Scheduling</button>
                <button className="btn" onClick={() => this.handleFilter('Enterprise')}>Enterprise</button>
                <button className="btn" onClick={() => this.handleFilter('Clear_Filter')}>All</button>
              
                </div>
                <div className="portfolio-items-wrapper">
                
                {this.portfolioItems()}
            </div>
            </div>
        )
    }
}


    //class based components are much smarter, 
    //they should have more logic than function based components
    //function based components are "dumb", like holding just an image or