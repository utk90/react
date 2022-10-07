import React, { useEffect, useState } from 'react'
import { getMethod } from '../../Service/Service';
import './Posts.css';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getMethod().then(data => { if (data) setPosts(data) }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <div className='post-heading'>POSTS</div>
            {posts && posts.length > 0 && posts.map((post, index) => {
                return (
                    <div key={post + "_" + index}>
                        <div>{post.emailId}</div>
                        <div>{post.password}</div>
                        <div>{post.firstName}</div>
                        <div>{post.lastName}</div>
                        <div>{post.address}</div>
                        <div>{post.countryCode}</div>
                        <div>{post.phoneNumber}</div>
                    </div>
                )
            })}
        </>
    )
}

export default Posts