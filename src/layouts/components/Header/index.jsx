import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
// import { BsCartCheck } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAddShoppingCart } from "react-icons/md";

import "./Header.scss";
import images from "~/assets/images";
import Search from "../Search";
import { UserContext } from "~/contexts/UserContext";

const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
};

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const {
        userState: { userData },
        logoutUser,
    } = useContext(UserContext);

    // Get width screen to reponsive mobile
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize(getWindowSize());
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const handleShowSearch = () => {
        setShowMenu(false);
        setShowSearch(!showSearch);
    };

    return (
        <header className="header">
            {/* Action */}
            {windowSize.innerWidth > 600 ? (
                <>
                    {/* Logo */}
                    <Link to="/" className="logo">
                        <img src={images.logo} alt="" className="logo_img" />
                    </Link>
                    <div className="action">
                        <div className="action_page">
                            <NavLink
                                activeclassname="active"
                                to="/"
                                className="page_item"
                            >
                                <p>Home</p>
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                to="/book"
                                className="page_item"
                            >
                                <p>Our Book</p>
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                to="/contact"
                                className="page_item"
                            >
                                <p>Contact Us</p>
                            </NavLink>
                        </div>

                        <div className="action_user">
                            <div className="search icon_wrap">
                                <BiSearchAlt2
                                    className="icon"
                                    onClick={handleShowSearch}
                                />
                            </div>

                            <Link to="/cartOrder" className="cart icon_wrap">
                                <MdAddShoppingCart className="icon" />
                            </Link>

                            <div className="user">
                                <div className="user_avatar">
                                    <img
                                        className="img"
                                        src="https://images.unsplash.com/photo-1644982652061-df82282e178d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                                        alt=""
                                    />
                                </div>
                                <div className="user_text">
                                    <p className="user_hello">Hello,</p>
                                    <p className="user_name">{userData.name}</p>
                                </div>

                                <div className="dropdown">
                                    <RiArrowDropDownLine className="dropdown_icon" />

                                    <div className="user_action">
                                        <Link
                                            to={`/user/${userData._id}`}
                                            className="user_action-item"
                                        >
                                            <p>Edit Profile</p>
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="user_action-item"
                                            onClick={() => logoutUser()}
                                        >
                                            <p>Logout</p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Logo */}
                    <Link
                        to="/"
                        className="logo"
                        onClick={() => setShowMenu(false)}
                    >
                        <img src={images.logo} alt="" className="logo_img" />
                    </Link>
                    <div className="action action_mobile">
                        <div className="search icon_wrap">
                            <BiSearchAlt2
                                className="icon"
                                onClick={handleShowSearch}
                            />
                        </div>
                        <Link
                            to="/cartOrder"
                            className="cart icon_wrap"
                            onClick={() => setShowMenu(false)}
                        >
                            <MdAddShoppingCart className="icon" />
                        </Link>
                        <div className="menu icon_wrap">
                            <BiMenu
                                className="icon"
                                onClick={() => {
                                    setShowSearch(false);
                                    setShowMenu(!showMenu);
                                }}
                            />
                        </div>
                    </div>
                    <div
                        className={
                            showMenu ? "menu_mobile active" : "menu_mobile"
                        }
                    >
                        <Link
                            to="/"
                            className="action"
                            onClick={() => setShowMenu(false)}
                        >
                            <p>Home</p>
                        </Link>
                        <Link
                            to="/book"
                            className="action"
                            onClick={() => setShowMenu(false)}
                        >
                            <p>Our Book</p>
                        </Link>
                        <Link
                            to="/contact"
                            className="action"
                            onClick={() => setShowMenu(false)}
                        >
                            <p>Contact Us</p>
                        </Link>
                        <Link
                            to="/user/:123456"
                            className="action"
                            onClick={() => setShowMenu(false)}
                        >
                            <p>Edit Profile</p>
                        </Link>
                        <Link
                            to="/login"
                            className="action"
                            onClick={() => setShowMenu(false)}
                        >
                            <p>Logout</p>
                        </Link>
                    </div>
                </>
            )}

            {/* Search Book */}
            <Search style={showSearch ? "active" : ""} />
        </header>
    );
};

export default Header;
