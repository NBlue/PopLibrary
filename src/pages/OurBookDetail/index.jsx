import React, { useEffect, useState, useContext } from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";

import HeadContentPage from "~/components/HeadContentPage";
import images from "~/assets/images";
import "./OurBookDetail.scss";
import Button from "~/components/Button";
import request from "~/utils/httpRequest";
import Spinner from "~/components/Spinner";
import { UserContext } from "~/contexts/UserContext";
import Dialog from "~/components/Dialog";

const OurBookDetail = () => {
    // Get param from route
    let { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [bookData, setBookData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const alertData = {
        title: "Add To Cart",
        message: "Add Cart To Successfully!",
    };

    const { addToCart } = useContext(UserContext);

    const handleAddToCart = (data) => {
        addToCart(data);
        setShowDialog(true);
    };

    useEffect(() => {
        request
            .get(`books?bookId=${id}`)
            .then((res) => {
                setLoading(false);
                setBookData(res.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {showDialog && (
                <Dialog handleDialog={setShowDialog} data={alertData} />
            )}
            <div className="ourBookDetail_wrap">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <HeadContentPage link="Book Detail" />

                        <div className="container">
                            <img
                                className="img"
                                src={bookData.thumbnail}
                                alt="BookImage"
                            />

                            <div className="content_wrap">
                                <h1 className="name">{bookData.name}</h1>
                                <ul className="rating_list">
                                    <li className="rating_item">
                                        <BsStarFill className="icon" />
                                    </li>
                                    <li className="rating_item">
                                        <BsStarFill className="icon" />
                                    </li>
                                    <li className="rating_item">
                                        <BsStarFill className="icon" />
                                    </li>
                                    <li className="rating_item">
                                        <BsStarFill className="icon" />
                                    </li>
                                    <li className="rating_item">
                                        <BsStarHalf className="icon" />
                                    </li>
                                </ul>

                                <p className="typebook">
                                    Typebook: <span>{bookData.type}</span>
                                </p>
                                <p className="author">
                                    Author: <span>{bookData.author}</span>
                                </p>

                                <div className="description_wrap">
                                    <p className="description">
                                        {bookData.description}
                                    </p>
                                </div>

                                <div className="price_action">
                                    <p className="price">$ {bookData.price}</p>

                                    <div className="action">
                                        {/* <ul className="quantity_wrap">
                                        {bookCount > 1 ? (
                                            <li
                                                onClick={() =>
                                                    setBookCount(bookCount - 1)
                                                }
                                            >
                                                <p>-</p>
                                            </li>
                                        ) : (
                                            <li className="disabled">
                                                <p>-</p>
                                            </li>
                                        )}
                                        <li>
                                            <p>{bookCount}</p>
                                        </li>
                                        {bookCount < 10 ? (
                                            <li
                                                onClick={() =>
                                                    setBookCount(bookCount + 1)
                                                }
                                            >
                                                <p>+</p>
                                            </li>
                                        ) : (
                                            <li className="disabled">
                                                <p>+</p>
                                            </li>
                                        )}
                                    </ul> */}
                                        {/* <button className="add_cart">Add to cart</button> */}
                                        <Button
                                            className="subscribe_btn submit_mess"
                                            onClick={() =>
                                                handleAddToCart(bookData)
                                            }
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default OurBookDetail;
