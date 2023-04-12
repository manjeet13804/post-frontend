import axios from 'axios';
import {  useLayoutEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
const Blog = () => {
    const [states, setStates] = useState()
    const { id } = useParams();
    const url = `https://blogs-posts.onrender.com/api/blog/${id}`
    useLayoutEffect(() => {
        axios.get(url)
            .then(async function (response) {
                setStates(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    return <>
       {states && <div className="blog" >
            Title {states.title}<br />
            By {states.author} {new Date(states.createdAt).toLocaleString()}<br />
            <span className="description">
              {  states.description }
              </span>
        </div>}<br/>
        <Link to="/">
            <button>Back to home</button>
        </Link>
    </>
}
export default Blog;