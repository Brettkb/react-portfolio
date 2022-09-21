import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

//banner_image_url: "https://devcamp-space.s3.amazonaws.com/tSR4dN9o2yPKDTzzEv2Fua7p?response-content-disposition=inline%3B%20filename%3D%22dailysmarty.jpg%22%3B%20filename%2A%3DUTF-8%27%27dailysmarty.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T234332Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=bca76e02c17226a22402f20d98c6c5ba1cdf44eca1b34ce8ebd2c32fe5ee81d6"
//category: "Technology"
//column_names_merged_with_images: (9) ['id', 'name', 'description', 'url', 'category', 'position', 'thumb_image', 'banner_image', 'logo']
//description: "Online tutorials and productivity tips."
//id: 35948
//logo_url: "https://devcamp-space.s3.amazonaws.com/8NM6MMyo3NGThEEGkB3LUgNe?response-content-disposition=inline%3B%20filename%3D%22devcamp.jpg%22%3B%20filename%2A%3DUTF-8%27%27devcamp.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T234332Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=ea8136dabbaba27f06eea784c9f5702a3c1cc0171b2b22e67bc04d073c6b386c"
//name: "Condose"
//position: 3
//thumb_image_url: "https://devcamp-space.s3.amazonaws.com/vjV7GjAzkJ1BNHzP9Zodqsuk?response-content-disposition=inline%3B%20filename%3D%22crondose.jpg%22%3B%20filename%2A%3DUTF-8%27%27crondose.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJEHZJNHM5JFESRRQ%2F20220919%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220919T234332Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=8a3e6bb4a30ca8178c9159498d4e85e93813a8f5986fdbe8b41442713087da9e"
//url: "https://www.crondose.com"

export default class PortfolioDetail extends Component {
constructor(props) {
    super(props);

    this.state = {
        portfolioItem: {}
    };
}

componentWillMount() {
    this.getPortfolioItem();
}

getPortfolioItem() {
axios.get(`https://brettbuckley.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, {withCredentials: true}
).then(response =>{
    this.setState({
        portfolioItem: response.data.portfolio_item
    })
}).catch(error => {
    console.log("getportfolioitem error", error);
});
}

render() {
    const {
        banner_image_url,
        category,
        description,
        logo_url,
        name,
        position,
        thumb_image_url,
        url
    } = this.state.portfolioItem;

    const bannerStyles = {   //cool inline styles
        backgroundImage: "url(" + banner_image_url + ")",
        backgroundSize: "cover", backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
    };
    const logoStyles = {
        width: "200px",
        color: "white"
    };

    return (
        <div className ="portfolio-detail-wrapper">
        <div className = "banner" style={bannerStyles}>
            <img src={logo_url} style={logoStyles} />
            </div>

            <div className="portfolio-detail-description-wrapper">
                <div className="description"> {description}</div>
            </div>

            <div className="bottom-content-wrapper">
                <a href={url} className="site-link" target="_blank">
                    Visit {name}
                </a>
            </div>
        </div>
    );
}
}