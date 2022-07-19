import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { SiMinutemailer } from "react-icons/si";

import HeadHomeLayout from "~/components/HeadHomeLayout";
import "./HomeLayout.scss";
import Button from "~/components/Button";

const Subscribe = () => {
    return (
        <div className="subscribe_wrap">
            <div className="wide">
                <HeadHomeLayout
                    title="Subscribe Our Newsletter"
                    slogan="Subscribe here with your email us and get up to date"
                />

                <div className="wrap">
                    <div className="input">
                        <AiOutlineMail className="icon" />
                        <input
                            type="text"
                            placeholder="Subscribe us"
                            name=""
                            id=""
                            className=""
                        />
                    </div>
                    <Button className="subscribe_btn">
                        Subscribe
                        <SiMinutemailer className="icon_right" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;
