import React, { useContext, useState } from "react";
import { AiOutlineRollback } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import "./Profile.scss";
import images from "~/assets/images";
import Button from "~/components/Button";
import HeadContentPage from "~/components/HeadContentPage";
import { UserContext } from "~/contexts/UserContext";
import Dialog from "~/components/Dialog";

const Profile = () => {
    const navigate = useNavigate();

    const {
        userState: { userData },
        updateProfile,
    } = useContext(UserContext);

    const alertData = {
        title: "Update profile",
        message: "Update profile successfully!",
    };

    const [submitLoading, setSubmitLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleUpdateProfile = async (profileForm) => {
        try {
            const profileUpdate = await updateProfile(profileForm);
            setSubmitLoading(false);
            setShowDialog(true);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle input by fomik
    const formik = useFormik({
        initialValues: {
            name: userData.name,
            email: userData.email,
            address: userData.address,
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
        }),
        onSubmit: (values) => {
            // Handle form submit
            handleUpdateProfile(values);
        },
    });

    return (
        <div className="profile_wrap">
            {showDialog && (
                <Dialog handleDialog={setShowDialog} data={alertData} />
            )}
            <HeadContentPage link="Profile" />
            <div className="container">
                <div className="avatar">
                    <h3 className="avatar__title">Acccount</h3>
                    <img src={images.footer} alt="" />
                    <h4 className="avatar_name">{userData.name}</h4>
                    <button
                        className="avatar_backspace-btn"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineRollback className="icon" />
                    </button>
                </div>
                <div className="info">
                    <form onSubmit={formik.handleSubmit}>
                        <h3 className="info__title">Profile Info:</h3>

                        <section className="form-group">
                            <label htmlFor="name" className="form-label">
                                Fullname:
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {formik.errors.name && (
                                <span className="">{formik.errors.name}</span>
                            )}
                        </section>
                        <section className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email:
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {formik.errors.email && (
                                <span className="">{formik.errors.email}</span>
                            )}
                        </section>
                        <section className="form-group">
                            <label htmlFor="address" className="form-label">
                                Address:
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Enter your address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                            {formik.errors.address && (
                                <span className="">
                                    {formik.errors.address}
                                </span>
                            )}
                        </section>

                        <Button
                            type="submit"
                            className="subscribe_btn submit_mess btn"
                            onClick={() => setSubmitLoading(true)}
                        >
                            {submitLoading && <FaSpinner className="icon" />}
                            <p>Update Profile</p>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
