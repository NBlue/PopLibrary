import React from "react";
import { FaSpinner } from "react-icons/fa";

import "./Spinner.scss";

const Spinner = () => {
    return (
        <div className="spinner_wrap">
            <FaSpinner className="spinner_icon" />
        </div>
    );
};

export default Spinner;
