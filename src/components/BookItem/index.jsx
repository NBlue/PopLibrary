import React, { useContext } from "react";

import Button from "../Button";
import "./BookItem.scss";
import { UserContext } from "~/contexts/UserContext";

const BookItem = ({ data, handleDialog }) => {
    const { _id, name, thumbnail, author, price } = data;

    const { addToCart } = useContext(UserContext);

    const handleAddToCart = (data) => {
        addToCart(data);
        handleDialog(true);
    };

    return (
        <div className="bookItem_wrap">
            <div className="wrap_show">
                <img src={thumbnail} alt="" className="img" />
                <p className="name">{name}</p>
            </div>
            <div className="wrap_hover">
                <p className="name">{name}</p>
                <p className="author">{author}</p>
                <p className="price">{price} $</p>
                <Button
                    className="custom"
                    onClick={() => handleAddToCart(data)}
                >
                    Add to Cart
                </Button>
                <Button to={`/book/${_id}`} className="custom">
                    Book Detail
                </Button>
            </div>
        </div>
    );
};

export default BookItem;
