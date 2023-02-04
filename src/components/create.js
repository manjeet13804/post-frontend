import { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "./create.css"
import Login from "./Login";
const Create = () => {
    const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        author: "",
        category:""
    })
    const addPost = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/blogs', formData,
            {
                headers: {
                    authorization: localStorage.getItem('token')
                }

            })
            .then(function (response) {
                console.log(response)
                console.log(response.data);
                alert(response.data.message);
                setFormData({
                    title: "",
                    description: "",
                    author: "",
                    category:""
                })
                if (response.data.message === "success") {
                    navigate('/')
                }
            })
            .catch(function (error) {
                alert(error)
            });
    }
    return <>
      { userId ? <div className="main-create">
            <form action="#">
            <label htmlFor="title">Category</label><br />
                <input required className="input-data" value={formData.category} onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value })
                }} /><br />
                <label htmlFor="title">Title</label><br />
                <input required className="input-data" value={formData.title} onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value })
                }} /><br />
                <label  htmlFor="decription">Add description</label><br />
                <textarea required className="input-data" id="input-data" value={formData.description} onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value })
                }} /><br />
                <label htmlFor="author">Author</label><br />
                <input required className="input-data" value={formData.author} onChange={(e) => {
                    setFormData({ ...formData, author: e.target.value })
                }} /><br />
                <button className="btn" onClick={addPost}>Add Post</button>
            </form>
        </div>:
        <>
        <div style={{display : "flex", justifyContent:"center"}}>You need To login to create a post login below </div>
          <Login data={"create"}/>
          </>
            }
    </>
}
export default Create;