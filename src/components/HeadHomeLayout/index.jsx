import React from "react";
import { GiBookCover } from "react-icons/gi";

import "./HeadHomeLayout.scss";

const HeadHomeLayout = ({ slogan, title, whiteColor = false }) => {
    const classes = "header_home_layout " + (whiteColor ? "whiteColor" : "");

    return (
        <div className={classes}>
            <h1>{title}</h1>
            <h3>{slogan}</h3>
            <span className="icon_wrap">
                <GiBookCover className="icon" />
            </span>
        </div>
    );
};

export default HeadHomeLayout;
