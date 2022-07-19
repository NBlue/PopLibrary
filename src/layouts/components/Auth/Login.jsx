import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSpinner } from "react-icons/fa";

import "./Auth.scss";
import images from "~/assets/images";
import { UserContext } from "~/contexts/UserContext";

const Login = () => {
    const [messServerError, setMessServerError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const navigate = useNavigate();

    //  Handle Context
    const { loginUser } = useContext(UserContext);

    const handleLogin = async (loginForm) => {
        try {
            const loginData = await loginUser(loginForm);

            setSubmitLoading(false);
            if (!loginData.success) {
                setMessServerError("Email or password is incorrect!");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Handle input by fomik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Your email is required")
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please enter a valid email address"
                ),
            password: Yup.string()
                .required("Password is required!")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Minimum eight characters, at least one letter and one number"
                ),
        }),
        onSubmit: (values) => {
            setSubmitLoading(true);
            handleLogin(values);
        },
    });

    return (
        <form action="" className="login_wrap" onSubmit={formik.handleSubmit}>
            <span className="img_logo">
                <img className="img" src={images.logo} alt="" />
            </span>
            <h1 className="title">Login</h1>

            <div className="input_wrap">
                <div className="input">
                    <BsFillPersonFill className="icon" />
                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            setMessServerError(null);
                            formik.handleChange(e);
                        }}
                        placeholder="Enter your email"
                    />
                </div>
                {formik.errors.email ? (
                    <p className="error_mess">{formik.errors.email}</p>
                ) : messServerError !== null ? (
                    <p className="error_mess">{messServerError}</p>
                ) : (
                    <p className="error_mess"></p>
                )}
            </div>

            <div className="input_wrap">
                <div className="input">
                    <RiLockPasswordFill className="icon" />
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={(e) => {
                            setMessServerError(null);
                            formik.handleChange(e);
                        }}
                        placeholder="Enter your password"
                    />
                </div>
                {formik.errors.password ? (
                    <p className="error_mess">{formik.errors.password}</p>
                ) : messServerError !== null ? (
                    <p className="error_mess">{messServerError}</p>
                ) : (
                    <p className="error_mess"></p>
                )}
            </div>
            <button type="submit" className="login_btn">
                {submitLoading && <FaSpinner className="icon" />}
                <p>Login</p>
            </button>

            <span className="navi_wrap">
                <p className="text">Do not have an account?</p>
                <Link to="/register" className="navi_btn">
                    Register
                </Link>
            </span>
        </form>
    );
};

export default Login;
