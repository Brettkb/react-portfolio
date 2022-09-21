import React from 'react';
import { Link } from 'react-router-dom';
import striptags from 'striptags';
import Truncate from 'react-truncate';

const BlogItem = props => {
    const {  //shorthand deconstruction
        id,
        blog_status,
        content,
        title,
        featured_image_url
    } = props.blogItem;

    return (
        <div>
        <Link to={`/b/${id}`}>
            <h1> {title} </h1>
            </Link>
            <div>
                <Truncate lines={5} ellipsis={ //all for summary, striptags removes all tags from string
                    <span>
                        ...<Link to={`/b/${id}`}>Read more</Link>
                    </span>
                }>{striptags(content)}</Truncate>  
            </div>
        </div>
    );
};

export default BlogItem;