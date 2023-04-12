import "./SignUp.css"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [sigupDetails, setSignDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        photo:""
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        const formData=new FormData()
        formData.append("photo",sigupDetails.photo,sigupDetails.photo.name)
        formData.append("email",sigupDetails.email)
        formData.append("password",sigupDetails.password)
        axios
            .post("https://blogs-posts.onrender.com/api/user/signup", formData)
            .then((res) => {
                alert("Signup Successfull")
                navigate("/login")})
            .catch((err) => alert("Email already Exists"));
    }

    return <div className="main-box">
        <section className="information">
            <p className="signup-para">Create New Account</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <input className="form-control" type="email" placeholder="Mail Id"
                    {...register("email", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please Enter A Valid Email!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, email: e.target.value })
                    }
                    value={sigupDetails.email} /><br />

                {errors.email && (
                    <p className="error">* {errors.email.message}</p>
                )}

                <input className="form-control form-control-md" type="password" placeholder="password"
                    {...register("password", {
                        required: "Please Enter Your Password",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters long!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, password: e.target.value })
     
                  }
                    value={sigupDetails.password}
                /><br />

                {errors.password && (
                    <p className="error">* {errors.password.message}</p>
                )}

                <input className="form-control" type="password" placeholder="Confirm password"
                    {...register("confirmPassword", {
                        required: "Please Confirm Your Password",
                        validate: (match) => {
                            const password = getValues("password");
                            return match === password || "Passwords should match!";
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, confirmPassword: e.target.value })
                    }
                    value={sigupDetails.confirmPassword} />


                {errors.confirmPassword && (
                    <p className="error">* {errors.confirmPassword.message}</p>
                )}
                <label htmlFor="photo">Upload Profile photo</label>
                    <input className="form-control" type="file" placeholder="photo" name="photo"
                    {...register("photo")
                    }
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, photo: e.target.files[0] })
                    }
                     /><br />

                    <button type="submit" className="btn-button-1">Sign up</button>
                    
            </form>
        </section>

    </div>
}

export default Signup;

