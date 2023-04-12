import "./SignUp.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useLocation } from "react-router-dom";
const Login = ({data}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = (e) => {
        e.preventDefault();
        let DATA = {
            email: email,
            password: password
        }
        localStorage.setItem('userId', DATA.email)
        axios.post('https://blogs-posts.onrender.com/api/user/login', DATA)
            .then(function (response) {
                console.log(response.data.message);
                const res = response.data.message
                console.log(res);
                if (res === "Login successful") {
                    // console.log("Hello")
                    // localStorage.setItem('token', response.data.token)
                    // navigate('/dashboard')
                }
                else {

                    alert(response.data.message)
                    localStorage.setItem('token', "BLOGS " + response.data.token)
                    // console.log(localStorage, localStorage.token)
                    if(location.pathname==="/create") navigate("/create")
                    else navigate('/')
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('Invalid Credential Kindly Enter corret id and Password ')
            });
    }

    return <div className="main-box">
        <section className="information">
            <p className="login-para">Enter your credentials to login</p>
            <form method="POST" >
                <input className="form-control" type="email" placeholder="User Id" required name="email"
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }} /><br />

                <input className="form-control" type="password" placeholder="password" required name="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                <br />
                <input type="checkbox" className="checkbox" />
                <span>  Remember me?</span>
                <button className="btn-button" onClick={login}>Login</button>
            </form>
            <Link to="/">
                <div className="forget"></div>
            </Link>
            <div className="signup-link">
                <span>Need an Account? </span>
                <Link to="/signup">
                    <span className="signup-link1">Sign Up</span>
                </Link>
            </div>
        </section >

    </div >
}
export default Login; 
