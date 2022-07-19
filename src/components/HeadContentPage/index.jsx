import React from "react";
import "./HeadContentPage.scss";

const HeadContentPage = ({ link }) => {
    return (
        <div className="HeadContentPage_wrap">
            <h1>Pop Library</h1>
            <p>
                Library <span>/</span> {link}
            </p>
        </div>
    );
};

export default HeadContentPage;
