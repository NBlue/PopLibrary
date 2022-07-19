import React, { useState } from "react";
import Slider from "react-slick";
import {
    HiOutlineArrowNarrowLeft,
    HiOutlineArrowNarrowRight,
} from "react-icons/hi";

import "./HomeLayout.scss";
import BookItem from "~/components/BookItem";
import HeadHomeLayout from "~/components/HeadHomeLayout";
import config from "~/Config";

const HandleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <HiOutlineArrowNarrowRight
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const HandlePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <HiOutlineArrowNarrowLeft
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const TopCategory = ({ data, handleDialog }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <HandleNextArrow />,
        prevArrow: <HandlePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [typeBookShow, setTypeBookShow] = useState(0);

    const handleTypeBook = (index) => {
        setTypeBookShow(index);
    };

    return (
        <div className="topCategory_wrap">
            <div className="wide">
                <HeadHomeLayout
                    whiteColor
                    title="Our Top Categories"
                    slogan="Here are some of the Top Categories of the Books Available."
                />

                <div className="type_wrap">
                    <ul className="list">
                        {config.typeBooks.map((typeBook, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        typeBookShow === index
                                            ? "item active"
                                            : "item"
                                    }
                                    onClick={() => {
                                        handleTypeBook(index);
                                    }}
                                >
                                    {typeBook}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Truy vấn top 5 loại sách xong cho vào 1 mảng lớn [[top 5 loai 1], [top 5 loai 2], [top 5 loai 3]]  Rồi duyệt qua 2 lượt như cái trên*/}
                <div className="book_wrap">
                    {data.map((typeBook, index) => {
                        return (
                            <div
                                className={
                                    index === typeBookShow
                                        ? "list active"
                                        : "list"
                                }
                                key={index}
                            >
                                <Slider {...settings}>
                                    {typeBook.map((book, index) => {
                                        return (
                                            <BookItem
                                                key={index}
                                                data={book}
                                                handleDialog={handleDialog}
                                            />
                                        );
                                    })}
                                </Slider>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TopCategory;
