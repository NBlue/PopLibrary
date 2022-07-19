import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Si1Password } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Auth.scss";
import images from "~/assets/images";
import { UserContext } from "~/contexts/UserContext";
import Dialog from "~/components/Dialog";

const Register = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [messServerError, setMessServerError] = useState(null);

    //  Handle Context
    const { registerUser } = useContext(UserContext);

    const alertData = {
        title: "Register Successfully",
        message:
            "You have successfully registered an account! Click OK to return to the account login page and log in to the newly created account!",
    };

    const handleRegister = async (registerForm) => {
        try {
            const registerData = await registerUser(registerForm);
            setSubmitLoading(false);

            if (registerData.success) {
                setShowDialog(true);
            } else {
                setMessServerError(registerData.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Your name is required!"),
            email: Yup.string()
                .required("Your email is required")
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Please enter a valid email address"
                ),
            address: Yup.string().required("Your address is required!"),
            password: Yup.string()
                .required("Password is required!")
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    "Minimum eight characters, at least one letter and one number"
                ),
            confirmPassword: Yup.string()
                .required("Confirm password is required!")
                .oneOf([Yup.ref("password"), null], "Password must match"),
        }),
        onSubmit: (values) => {
            setSubmitLoading(true);
            handleRegister(values);
        },
    });

    return (
        <>
            {showDialog && (
                <Dialog
                    handleDialog={setShowDialog}
                    data={alertData}
                    navigate
                />
            )}
            <form className="register_wrap" onSubmit={formik.handleSubmit}>
                <span className="img_logo">
                    <img className="img" src={images.logo} alt="" />
                </span>
                <h1 className="title">Register</h1>

                <div className="input_wrap">
                    <div className="input">
                        <MdDriveFileRenameOutline className="icon" />
                        <input
                            type="text"
                            name="name"
                            value={formik.values.name}
                            onChange={(e) => {
                                setMessServerError(null);
                                formik.handleChange(e);
                            }}
                            placeholder="Enter your name"
                        />
                    </div>
                    {formik.errors.name ? (
                        <p className="error_mess">{formik.errors.name}</p>
                    ) : messServerError !== null ? (
                        <p className="error_mess">{messServerError}</p>
                    ) : (
                        <p className="error_mess"></p>
                    )}
                </div>

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
                        <TiHome className="icon" />
                        <input
                            type="text"
                            name="address"
                            value={formik.values.address}
                            onChange={(e) => {
                                setMessServerError(null);
                                formik.handleChange(e);
                            }}
                            placeholder="Enter your address"
                        />
                    </div>
                    {formik.errors.address ? (
                        <p className="error_mess">{formik.errors.address}</p>
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
                <div className="input_wrap">
                    <div className="input">
                        <Si1Password className="icon" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={(e) => {
                                setMessServerError(null);
                                formik.handleChange(e);
                            }}
                            placeholder="Confirm your password"
                        />
                    </div>
                    {formik.errors.confirmPassword ? (
                        <p className="error_mess">
                            {formik.errors.confirmPassword}
                        </p>
                    ) : messServerError !== null ? (
                        <p className="error_mess">{messServerError}</p>
                    ) : (
                        <p className="error_mess"></p>
                    )}
                </div>
                <button type="submit" className="register_btn">
                    {submitLoading && <FaSpinner className="icon" />}
                    <p>Register</p>
                </button>

                <span className="navi_wrap">
                    <p className="text">Do you have an account?</p>
                    <Link to="/login" className="navi_btn">
                        Login
                    </Link>
                </span>
            </form>
        </>
    );
};

export default Register;
