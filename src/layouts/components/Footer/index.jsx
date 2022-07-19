import React from "react";
import images from "~/assets/images";

import { FaMapMarkerAlt, FaFacebookF } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import {
    AiOutlineTwitter,
    AiFillYoutube,
    AiOutlineGithub,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
    return (
        <div className="footer_wrap">
            <div className="background">
                <img src={images.footer} alt="" className="img" />

                <iframe
                    className="map"
                    title="This is a unique title"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24127.500503325842!2d105.85951998932818!3d21.002801834546222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zxJDhuqFpIGjhu41jIELDoWNoIGtob2EgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1656661694850!5m2!1svi!2s"
                    width="600"
                    height="450"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>

                <div className="contact_cricle">
                    <FaMapMarkerAlt className="icon_map" />
                    <h3>Lorem ipsum Sed ut perspiciatis</h3>
                    <h4>200 capacity</h4>
                    <p>Esse cillum dolore eu fugiat nulla USA</p>
                    <span className="phone_text">
                        <BsFillTelephoneFill className="icon" />
                        <p>80.828247.89</p>
                    </span>
                </div>
            </div>
            <div className="grid wide">
                <div className="footer">
                    <p>Copyrights © 2015-16 KodeForest. All rights reserved</p>
                    <ul className="social_list">
                        <li className="social_item">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FaFacebookF className="icon" />
                            </a>
                        </li>
                        <li className="social_item">
                            <a
                                href="https://twitter.com/?lang=vi"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <AiOutlineTwitter className="icon" />
                            </a>
                        </li>
                        <li className="social_item">
                            <a
                                href="https://www.youtube.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <AiFillYoutube className="icon" />
                            </a>
                        </li>
                        <li className="social_item">
                            <a
                                href="https://github.com/haitranduc4270/project_web_20212"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <AiOutlineGithub className="icon" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
