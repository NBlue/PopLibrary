import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import Login from "~/layouts/components/Auth/Login";
import Register from "~/layouts/components/Auth/Register";
import { UserContext } from "~/contexts/UserContext";

import "./Auth.scss";
import Spinner from "~/components/Spinner";

const Auth = ({ authRoute }) => {
    const {
        userState: { isAuthenticated, loading },
    } = useContext(UserContext);

    let body;

    if (loading) {
        body = <Spinner />;
    } else if (isAuthenticated) {
        return <Navigate to="/" />;
    } else {
        body = (
            <>
                {authRoute === "login" && <Login />}
                {authRoute === "register" && <Register />}
            </>
        );
    }

    return <div className="auth_wrap">{body}</div>;
};

export default Auth;
