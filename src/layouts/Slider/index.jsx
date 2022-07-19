import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import "./Slider.scss";
import images from "~/assets/images";

const HandleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <MdArrowForwardIos
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const HandlePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <MdArrowBackIosNew
            className={className}
            style={{ ...style }}
            onClick={onClick}
        />
    );
};

const Sliders = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <HandleNextArrow />,
        prevArrow: <HandlePrevArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            <div className="slider">
                <img src={images.slider1} alt="" className="slider_image" />

                <div className="slider_text">
                    <div className="wide">
                        <h2>ARE YOU SEARCHING A BOOK...?</h2>
                        <h1>BIGGEST LIBRARY</h1>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium dolor emque laudantium, totam
                            rem aperiam.ipsam voluptatem.
                        </p>
                        <Link to="/book" className="btn outline">
                            BUY NOW
                        </Link>
                    </div>
                </div>
            </div>
            <div className="slider">
                <img src={images.slider2} alt="" className="slider_image" />

                <div className="slider_text">
                    <div className="grid wide">
                        <h2>ARE YOU SEARCHING A BOOK...?</h2>
                        <h1>BIGGEST LIBRARY</h1>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium dolor emque laudantium, totam
                            rem aperiam.ipsam voluptatem.
                        </p>
                        <Link to="/" className="btn primary outline">
                            BUY NOW
                        </Link>
                    </div>
                </div>
            </div>
            <div className="slider">
                <img src={images.slider3} alt="" className="slider_image" />

                <div className="slider_text">
                    <div className="grid wide">
                        <h2>ARE YOU SEARCHING A BOOK...?</h2>
                        <h1>BIGGEST LIBRARY</h1>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium dolor emque laudantium, totam
                            rem aperiam.ipsam voluptatem.
                        </p>
                        <Link to="/" className="btn primary outline">
                            BUY NOW
                        </Link>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Sliders;
