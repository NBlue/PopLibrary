import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({
    to,
    href,
    disabled,
    children,
    className,
    onClick,
    ...passProps
}) => {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };

    //Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith("on") && typeof props[key] === "function") {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = "a";
    }

    const classes = "btn " + className;

    return (
        <Comp {...props} className={classes}>
            <span className="title">{children}</span>
        </Comp>
    );
};

export default Button;
