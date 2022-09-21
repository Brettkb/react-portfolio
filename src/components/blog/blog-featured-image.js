import React from 'react';

const BlogFeaturedImage = props => {
    if (!props.img) {  //if props img is === null
        return null;
    }
    return ( //if there is an img
        <div className="featured-image-wrapper">
            <img src={props.img} />
        </div>
    );
};
    
  
export default BlogFeaturedImage;