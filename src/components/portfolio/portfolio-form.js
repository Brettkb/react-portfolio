import React, { Component } from 'react';
import axios from 'axios';
import DropzoneComponent from 'react-dropzone-component';

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";


export default class PortfolioForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            category: "Operations/ProblemSolve",
            position: "", 
            url: "",
            thumb_image: "",
            banner_image: "",
            logo: "",
            editMode: false,
            apiUrl: "https://brettbuckley.devcamp.space/portfolio/portfolio_items",
            apiAction: "post"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleBannerDrop = this.handleBannerDrop.bind(this);
        this.handleThumbDrop = this.handleThumbDrop.bind(this);
        this.handleLogoDrop = this.handleLogoDrop.bind(this);

        this.thumbRef = React.createRef();     //ref references
        this.bannerRef = React.createRef();
        this.logoRef = React.createRef();

    }
    //lifecyclehook
    componentDidUpdate() {
        if (Object.keys(this.props.portfolioToEdit).length > 0) {
            const {
                id,
                name,
                description,
                category,
                position,
                url,
                thumb_image_url,
                banner_image_url,
                logo_url
            } = this.props.portfolioToEdit;

            this.props.clearPortfolioToEdit();

            this.setState({
            id: id,
            name: name || "",
            description: description || "",
            category: category || "Operations/ProblemSolve",
            position: position ||  "", 
            url: url || "",
            editMode: true,
            apiUrl: `https://brettbuckley.devcamp.space/portfolio/portfolio_items/${id}`,
            apiAction: "patch",
            thumb_image_url: thumb_image_url || "",
            banner_image_url: banner_image_url || "",
            logo_url: logo_url || ""
            });
        }
    }

    handleThumbDrop() {
        return {
            addedfile: file => this.setState({ thumb_image: file})
        };
    }
    handleBannerDrop() {
        return {
            addedfile: file => this.setState({ banner_image: file})
        };
    }
    handleLogoDrop() {
        return {
            addedfile: file => this.setState({ logo: file})
        };
    }
    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    buildform() {
        let formData = new FormData();

        formData.append("portfolio_item[name]", this.state.name); //creating form data object, then appending this value, was empty but now
                                     //shows it we want to create this first element, will have this kind of key and a value of ""
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);

        if (this.state.thumb_image) {
        formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
        }
        if (this.state.banner_image) {
        formData.append("portfolio_item[banner_image]", this.state.banner_image);
        }
        if (this.state.logo) {
        formData.append("portfolio_item[logo]", this.state.logo);
        }
        return formData;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: this.buildForm(),
            withCredentials: true
        })
        .then(response => {
            console.log(response)
        
            this.props.handleNewFormSubmission(response.data.portfolio_item);

            this.setState  ({  //attributes in state
                name: "",
                description: "",
                category: "Operations/ProblemSolve",
                position: "", 
                url: "",
                thumb_image: "",
                banner_image: "",
                logo: "",
                editMode: false,
                apiUrl: "https://brettbuckley.devcamp.space/portfolio/portfolio_items",
                apiAction: "post"
            });

            [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {  //actual elements in the dom
                ref.current.dropzone.removeAllFiles();
            });
        }).catch(error => {
            console.log("portfolio form handleSubmit error", error);
        });
        //event.preventDefault();
    }
    render() {
        return (         
                <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
                    <div className="two-column">
                        <input 
                        type="text" name="name" placeholder="Portfolio Item Name" value={this.state.name}
                        onChange={this.handleChange} />
                        <input 
                        type="text" name="url" placeholder="URL" value={this.state.url}
                        onChange={this.handleChange} />
                        </div>
                        <div className="two-column">
                        <input 
                        type="text" name="position" placeholder="Position" value={this.state.position}
                        onChange={this.handleChange} />
                        <select 
                        name="category" value={this.state.category}
                        onChange={this.handleChange} className="select-element" >
                        <option value ="Operations/ProblemSolve">Operations/Problem Solve</option>
                        <option value ="IT/Management">IT/Management</option>
                        <option value ="Management/Performance">Management/Performance</option>
                        </select>
                        </div>
                    

                    <div className="one-column">
                    <textarea 
                        type="text" name="description" placeholder="Description" value={this.state.description}
                        onChange={this.handleChange} />
                    </div>

                    <div className="image-uploaders">
                        <DropzoneComponent 
                        ref = {this.thumbRef}  // added ref to jsx
                        config={this.componentConfig()}
                        djsConfig ={this.djsConfig()} 
                        eventHandlers={this.handleThumbDrop()}
                        >
                        <div className="dz-message">Thumbnail</div>
                        </DropzoneComponent>
                         <DropzoneComponent   // child components/div
                        ref = {this.bannerRef}
                        config={this.componentConfig()}
                        djsConfig ={this.djsConfig()} 
                        eventHandlers={this.handleBannerDrop()}
                        >
                        <div className="dz-message">Banner</div>
                        </DropzoneComponent>
                         <DropzoneComponent 
                        ref = {this.logoRef}
                        config={this.componentConfig()}
                        djsConfig ={this.djsConfig()} 
                        eventHandlers={this.handleLogoDrop()}
                        >
                        <div className="dz-message">Logo</div>
                        </DropzoneComponent>
                        
                    </div>

                    <div>
                        <button className="btn" type="submit">Save</button>
                    </div>
                </form>
            
        );
    }
}