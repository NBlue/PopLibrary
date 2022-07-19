import React, { useContext, useState } from "react";
import StickyBox from "react-sticky-box";
import { FaSpinner } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";

import "./CartOrder.scss";
import { Link } from "react-router-dom";
import { UserContext } from "~/contexts/UserContext";
import Dialog from "~/components/Dialog";

const CartOrder = () => {
    const {
        userState: { userData },
        deleteToCart,
        orderToCart,
    } = useContext(UserContext);

    // Sum Price
    let priceSum = 0;
    for (let cart of userData.cart) {
        priceSum += Number(cart.price);
    }

    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);

    const alertData = {
        title: "Order Book",
        message: "Order Book Successfully!",
    };

    const handleOrder = async () => {
        setLoading(true);
        await orderToCart();
        setShowDialog(true);
    };

    let content;
    if (userData.cart.length === 0) {
        content = (
            <div className="empty_wrap">
                <TbShoppingCartDiscount className="icon" />
                <h1>Your Cart is Empty</h1>
                <h2>Add something to make me happy :)</h2>
                <Link to="/" className="back_home--btn">
                    CONTINUE BUY BOOK
                </Link>
            </div>
        );
    } else {
        content = (
            <>
                <h1 className="head">
                    Cart:{" "}
                    <span className="quantity">
                        ({userData.cart.length} books)
                    </span>
                </h1>
                <div className="container">
                    <div className="book_list">
                        {userData.cart.map((cart, index) => {
                            return (
                                <div key={index} className="book_item">
                                    <img
                                        src={cart.thumbnail}
                                        alt="ImageBook"
                                        className="img"
                                    />
                                    <div className="info">
                                        <h1 className="name">{cart.name}</h1>
                                        <span>
                                            <p className="author">
                                                Author:{" "}
                                                <span>{cart.author}</span>
                                            </p>
                                            <p className="type">
                                                Book Type:{" "}
                                                <span>{cart.type}</span>
                                            </p>
                                        </span>
                                        <button
                                            className="delete_btn"
                                            onClick={() =>
                                                deleteToCart(cart._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    <div className="price_quantity">
                                        <p className="price">{cart.price}$</p>
                                        {/* <ul className="quantity_wrap">
                                            <li className="disabled">
                                                <p>-</p>
                                            </li>
                                            <li>
                                                <p>1</p>
                                            </li>
                                            <li>
                                                <p>+</p>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Vị trí cách top 143.6px = $head + .head>.quantity */}
                    <StickyBox offsetTop={143.6} offsetBottom={20}>
                        <div className="pay_wrap">
                            <div className="info">
                                <div className="info_item">
                                    <p className="title">Custom:</p>
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Customer name"
                                        defaultValue={userData.name}
                                        name=""
                                        id=""
                                    />
                                </div>
                                <div className="info_item">
                                    <p className="title">Delivery location:</p>
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Customer name"
                                        defaultValue={userData.address}
                                        name=""
                                        id=""
                                    />
                                </div>
                            </div>
                            <div className="total">
                                <h3>Total:</h3>
                                <h3 className="price">{priceSum}$</h3>
                            </div>
                            <button className="order_btn" onClick={handleOrder}>
                                {loading && <FaSpinner className="icon" />}
                                <p>Order Book</p>
                            </button>
                        </div>
                    </StickyBox>
                </div>
            </>
        );
    }

    return (
        <>
            {showDialog && (
                <Dialog handleDialog={setShowDialog} data={alertData} />
            )}
            <div className="cartOrder_wrap">{content}</div>;
        </>
    );
};

export default CartOrder;
