import React from "react";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

import "./Dialog.scss";

const Dialog = ({ handleDialog, data, navigate = false }) => {
    const Navigate = useNavigate();

    const handleAlert = () => {
        if (navigate) Navigate("/login");
        handleDialog(false);
    };

    return (
        <div className="dialog_wrap">
            <div className="dialog">
                <div className="dialog_header">
                    <h5>{data.title}</h5>
                    <GrClose className="icon" onClick={handleAlert} />
                </div>
                <div className="dialog_body">
                    <p>{data.message}</p>
                </div>
                <div className="dialog_footer">
                    <button type="button" onClick={handleAlert}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
