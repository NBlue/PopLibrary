import axios from "axios";
import React, { useEffect, useState } from "react";
import Dialog from "~/components/Dialog";
import Spinner from "~/components/Spinner";
import config from "~/Config";
import Subscribe from "~/layouts/components/HomeLayout/Subscribe";
import Testimonials from "~/layouts/components/HomeLayout/Testimonials";
import TopCategory from "~/layouts/components/HomeLayout/TopCategory";
import TopPopular from "~/layouts/components/HomeLayout/TopPopular";
import Wellcome from "~/layouts/components/HomeLayout/Wellcome";
import Slider from "~/layouts/Slider";
import request from "~/utils/httpRequest";
import "./Home.scss";

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [typeBooksData, setTypeBooksData] = useState([]);
    const [popularBooksData, setPopularBooksData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const alertData = {
        title: "Add To Cart",
        message: "Add Cart To Successfully!",
    };

    useEffect(() => {
        const typeBooks = [];
        const topPopular = request.get("books?top=6");
        config.typeBooks.forEach((typeBook, index) => {
            typeBooks[index] = request.get(`books?type=${typeBook}`);
        });

        axios
            .all([...typeBooks, topPopular])
            .then(
                axios.spread((...allBookData) => {
                    let newData = allBookData.map((bookData) => {
                        return bookData.data;
                    });
                    let popularData = newData.pop();

                    let TopData = newData.map((data) => {
                        return data.slice(0, 5);
                    });
                    setTypeBooksData(TopData);
                    setPopularBooksData(popularData);

                    setLoading(false);
                })
            )
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="homepage">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {showDialog && (
                        <Dialog handleDialog={setShowDialog} data={alertData} />
                    )}
                    <Slider />
                    <Wellcome />
                    <TopCategory
                        data={typeBooksData}
                        handleDialog={setShowDialog}
                    />
                    <TopPopular data={popularBooksData} />
                    <Testimonials />
                    <Subscribe />
                </>
            )}
        </div>
    );
};

export default Home;
