import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import HeadHomeLayout from "~/components/HeadHomeLayout";
import "./HomeLayout.scss";

const TopPopular = ({ data }) => {
    const [showDetailBook, setShowDetailBook] = useState(0);

    return (
        <div className="topPopular_wrap">
            <div className="wide">
                <HeadHomeLayout
                    title="Most Popular Books"
                    slogan="The Most Popular Books Today are available in Book Library"
                />

                <div className="book">
                    {data.map((data, index) => {
                        const {
                            _id,
                            name,
                            thumbnail,
                            author,
                            price,
                            description,
                        } = data;

                        return (
                            <div
                                key={_id}
                                className={
                                    index === showDetailBook
                                        ? "book_detail active"
                                        : "book_detail"
                                }
                            >
                                <img
                                    src={thumbnail}
                                    className="img"
                                    alt="Ảnh minh họa"
                                />
                                <div className="content">
                                    <h1 className="name">{name}</h1>
                                    <h2 className="author">{author}</h2>
                                    <p className="description">{description}</p>
                                    <div className="wrap">
                                        <h3 className="price">$ {price}</h3>
                                        <Link
                                            to={`/book/${_id}`}
                                            className="link"
                                        >
                                            See More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="book_list">
                        {data.map((data, index) => {
                            const { id, thumbnail } = data;
                            return (
                                <div
                                    key={id}
                                    className="book_item"
                                    onClick={() => setShowDetailBook(index)}
                                >
                                    <img
                                        src={thumbnail}
                                        className="img"
                                        alt="Ảnh minh họa"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopPopular;
