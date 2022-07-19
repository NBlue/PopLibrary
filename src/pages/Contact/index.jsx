import React, { useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import emailjs from "emailjs-com";

import HeadContentPage from "~/components/HeadContentPage";
import "./Contact.scss";
import Button from "~/components/Button";
import Dialog from "~/components/Dialog";

const Contact = () => {
    const [showDialog, setShowDialog] = useState(false);

    const form = useRef();

    const alertData = {
        title: "Send message",
        message: "Send message to library manager successfully!",
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_gqm7rrd",
                "template_szdtxwq",
                form.current,
                "quxGAOJKtMEWrVtWL"
            )
            .then(
                (result) => {
                    console.log(result.text);
                },
                (error) => {
                    console.log(error.text);
                }
            );

        e.target.reset();
        setShowDialog(true);
    };

    return (
        <div className="contact_page">
            {showDialog && (
                <Dialog handleDialog={setShowDialog} data={alertData} />
            )}
            <HeadContentPage link="Contact" />

            <div className="content">
                <form ref={form} onSubmit={sendEmail} className="input_wrap">
                    <div className="info">
                        <div className="input_text-wrap">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name *"
                                className="input_fild"
                                required
                            />
                        </div>
                        <div className="input_text-wrap">
                            <label htmlFor="">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email *"
                                className="input_fild"
                                required
                            />
                        </div>
                        <div className="input_text-wrap">
                            <label htmlFor="">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone *"
                                className="input_fild"
                                required
                            />
                        </div>
                    </div>
                    <div className="input_text-wrap">
                        <label htmlFor="">Message</label>
                        <textarea
                            type="text"
                            name="message"
                            placeholder="Add to your message"
                            required
                        />
                    </div>
                    <Button type="submit" className="subscribe_btn submit_mess">
                        Submit Message
                    </Button>
                </form>
                <div className="contact_wrap">
                    <div className="title ">
                        <h1>GET IN TOUCH</h1>
                        <p>
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident
                        </p>
                    </div>
                    <div className="title ">
                        <h1>INFORMATION</h1>

                        <ul>
                            <li>
                                <FaMapMarkerAlt className="icon" />
                                <p>1 Dai Co Viet, Hai Ba Trung, Ha Noi</p>
                            </li>
                            <li>
                                <BsTelephoneFill className="icon" />
                                <p>(25) 82 800 80</p>
                            </li>
                            <li>
                                <MdEmail className="icon" />
                                <p>poplibrary@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
