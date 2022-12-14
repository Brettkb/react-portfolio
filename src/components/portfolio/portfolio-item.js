import React, {Component} from "react";
import { Link } from "react-router-dom";

export default class PortfolioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolioItemClass: ""
        };
    }

    handleMouseEnter() {
        this.setState({portfolioItemClass: 'image-blur'});

    }

    handleMouseLeave() {
        this.setState({portfolioItemClass: ""});

    }
    //data that we'll need: 
// - background img; thumb_image_url
// - logo: 
// - description: description
// - id (for slug): id
//destructured below>
render() {
    const {id, description, thumb_image_url, logo_url} = this.props.item;

    
    return(
        <Link to={`/portfolio/${id}`}>
        <div className="portfolio-item-wrapper"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        >

        <div 
        className={"portfolio-img-background " + this.state.portfolioItemClass}
        style={{
            backgroundImage:"url(" + thumb_image_url + ")"
        }}
        /> {/*way of getting background img to component, self closing div, inline styles used above, since doing js, use {{}} cuz object inside*/}

        <div className="img-text-wrapper">
            <div className="logo-wrapper">
                <img src={logo_url}/>
            </div>
            <div className="subtitle">{description}</div>
        </div>
        </div>
        </Link>
    );
    }
}