import "./dashboard.css";
import { CgChevronDown } from "react-icons/cg";
import { BiUser } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai"
import { AiTwotoneLike } from "react-icons/ai"
import { BsFillShareFill } from "react-icons/bs"
import { WhatsappShareButton } from 'react-share'
import Logout from "./logout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Action = () => {
  const userId = localStorage.getItem("userId");
  const [userName, setUserName] = useState("")
  useEffect(() => {
    if (userId) setUserName(userId.split("@")[0]);
    else setUserName("")
  }, [userId])
  const [states, setStates] = useState([]);
  const [isExpanded, setIsExpanded] = useState([]);
  const [comment, setComment] = useState([])
  const [render, setRender] = useState(false)
  const [open, setOpen] = useState(false)
  const [fetch, setFetch] = useState(false)
  const likeddata = states.map((each) => each.like.includes(userId))
  useEffect(() => {
    axios.get("https://blogs-posts.onrender.com/api/blog")
      .then(async function (response) {
    setStates(response.data.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
    setFetch(false)
  }, [fetch])

  const handleReadMore = (id,operation) => {
    if (operation) setIsExpanded([...isExpanded,id])
    else{
      const update=isExpanded.filter(newid=>newid!==id)
      setIsExpanded(update)
    }
  }

  const handleLikes = (id, operation) => {
    axios.put(`https://blogs-posts.onrender.com/api/blogs/like/${id}/${userId}`, { operation },
      {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
    setFetch(true)
  }


  const handelComment = async (val) => {
    axios.put(`https://blogs-posts.onrender.com/api/blogs/addcomment/${userId}/${comment.blogId}`, comment,
      {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(function (response) {
        console.log(response.data);
        alert(response.data.message)
      })
    setComment([])
    setFetch(true)
  }

  const handelCommentLikes = (commentid, blogid, userid, userName, operation) => {
    const commentLike = { commentid, blogid, userid, userName, operation }
    axios.put(`https://blogs-posts.onrender.com/api/blogs/likecomment/${blogid}/${commentid}`, commentLike,
      {
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
      .then(function (response) {
        console.log(response.data);
      })
    setComment([])
    setFetch(true)
  }

  return (
    <>
      <div className="">
        <nav className="headercontainer">
          {userId && <div className="userid">USER ID:{userId} </div>}
          <div className="header-menu">
            <Link to="/create">
              {userId && <span className="menu">Create</span>}
            </Link>
            <Link to="/login">
              {!userId && <span className="menu">Login</span>}
            </Link>
          </div>
          {userId && <div className="dropdown" onClick={() => setOpen(!open)}>
       
            <BiUser />
            {userName}
            <CgChevronDown />
            {open && <div className="dropdown-content">
              <span onClick={() => setRender(!render)}>
                <Logout ></Logout>
              </span>
            </div>}
          </div>}
        </nav>

      </div>
      <div className="postcontainer">
        {states.map((post, index) => {
          const date = new Date(post.createdAt).toLocaleString()
          const text = post.description
          const display = likeddata[index]

          return <div className="blog" key={index}>
            Title {post.title}<br />
            By {post.author} {date}<br />
            <span className="description">
              {isExpanded.includes(post._id) ? text : text.substring(0, 100)}
              {isExpanded.includes(post._id) ? text.length > 100 && <button onClick={() => handleReadMore(post._id,false)}>Read Less</button>
                : text.length > 100 && <button onClick={() => handleReadMore(post._id,true)}>Read More</button>} <br />
              {userId ? display ? <AiTwotoneLike onClick={() => handleLikes(post._id, false)} /> :
                <AiOutlineLike onClick={() => handleLikes(post._id, true)} /> : null}
              {post.likes}
              <WhatsappShareButton url={`http://localhost:3000/blog/${post._id}`}>
                <BsFillShareFill />
              </WhatsappShareButton>
            </span> <br />
            {userId && <div > Add a Comment<br />
              <form onSubmit={(e) => {
                e.preventDefault()
                handelComment(comment)
              }}>
                <textarea id={post._id} value={post._id === comment.blogId ? comment.val : ""} onChange={(e) => setComment({ val: e.target.value, blogId: post._id, userName, userId })} />
                <button type="submit">Add</button>
              </form>
            </div>}
            {post.comments.map((blog, index) => {
              const commentdisplay = blog.like.includes(userId)
              return <div key={index}>
                {blog.userName}<br />
                {blog.description}
                {console.log(commentdisplay)}
                {userId ? commentdisplay ? <AiTwotoneLike onClick={() => handelCommentLikes(blog._id, post._id, userId, userName, false)} /> :
                  <AiOutlineLike onClick={() => handelCommentLikes(blog._id, post._id, userId, userName, true)} /> : null}
              </div>
            })
            }
          </div>
        })}
      </div>
    </>

  )
}
export default Action;