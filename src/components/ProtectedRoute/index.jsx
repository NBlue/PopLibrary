import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import Spinner from "../Spinner";

const ProtectedRoute = ({ layout }) => {
    const {
        userState: { isAuthenticated, loading },
    } = useContext(UserContext);

    if (loading) {
        return <Spinner />;
    }
    if (isAuthenticated) {
        return layout;
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
