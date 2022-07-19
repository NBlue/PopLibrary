import React from "react";
import { Link } from "react-router-dom";
import HeadContentPage from "~/components/HeadContentPage";
import Footer from "~/layouts/components/Footer";

import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="notFound_wrap">
            <HeadContentPage link="Error 404" />

            <div className="content">
                <h1>WHOOOS!!!</h1>
                <span>
                    <h1 className="status_code">404</h1>
                    <h2>THE PAGE CAN NOT BE FOUND</h2>
                </span>
                <p>
                    We could not found the page you are looking for. Please try
                    another page and verify the URL you have entered.
                </p>

                <Link to="/" className="back_home--btn">
                    GO BACK TO HOME PAGE
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;
