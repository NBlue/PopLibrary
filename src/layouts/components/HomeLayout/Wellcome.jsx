import React from "react";
import { AiFillGift } from "react-icons/ai";
import { MdLibraryBooks } from "react-icons/md";
import { RiBook2Fill } from "react-icons/ri";
import { BsCalculatorFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import HeadHomeLayout from "~/components/HeadHomeLayout";
import "./HomeLayout.scss";

const Wellcome = () => {
    return (
        <div className="wellcome_wrap">
            <div className="wide">
                <HeadHomeLayout
                    title="Welcome To The Library"
                    slogan="Welcome to the Most Popular Library Today"
                />

                <div className="type_list">
                    <div className="type_item">
                        <div className="icon_wrap">
                            <AiFillGift className="icon" />
                        </div>

                        <h6 className="title">EBOOKS</h6>
                        <p className="text">
                            an electronic version of a printed book that can be
                            read on a computer.
                        </p>
                        <Link to="" className="link">
                            Read More
                        </Link>
                    </div>

                    <div className="type_item">
                        <div className="icon_wrap">
                            <RiBook2Fill className="icon" />
                        </div>

                        <h6 className="title">AUDIOBOOKS</h6>
                        <p className="text">
                            an audiocassette or CD recording of a reading of a
                            book, typically a novel.
                        </p>
                        <Link to="" className="link">
                            Read More
                        </Link>
                    </div>

                    <div className="type_item">
                        <div className="icon_wrap">
                            <MdLibraryBooks className="icon" />
                        </div>

                        <h6 className="title">MAGAZINE</h6>
                        <p className="text">
                            a periodical publication containing articles and
                            illustrations information.
                        </p>
                        <Link to="" className="link">
                            Read More
                        </Link>
                    </div>

                    <div className="type_item">
                        <div className="icon_wrap">
                            <BsCalculatorFill className="icon" />
                        </div>

                        <h6 className="title">TEANS & KIDS</h6>
                        <p className="text">
                            the years of a person's age from 13 to 19 and are
                            the kids and teens.
                        </p>
                        <Link to="" className="link">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wellcome;
