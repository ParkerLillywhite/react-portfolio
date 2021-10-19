import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = (props) => {

    const PortfolioList = props.data.map(portfolioItem => {
        return (
            <div key= {portfolioItem.id}className="portfolio-item-thumb">
            <div className="portfolio-thumb-image">
                <img src={portfolioItem.thumb_image_url} />
            </div>
            <div className= "portfolio-details">
            <h1 className="title">{portfolioItem.name}</h1>

            <div className="actions">
            <a onClick={() => props.handleEditClick(portfolioItem)}>
            <FontAwesomeIcon className="icon"icon="edit" />
            </a>
            </div>
            
            <a onClick={() => props.handleDeleteClick(portfolioItem)}>
            <FontAwesomeIcon className="icon"icon="trash" />
            </a>
            </div>
            </div>
        )
    })

    return <div className="portfolio-sidebar-list-wrapper">{PortfolioList}</div>

}

export default PortfolioSidebarList;