import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { TbBookOff } from "react-icons/tb";

import BookItem from "~/components/BookItem";
import HeadContentPage from "~/components/HeadContentPage";
import Spinner from "~/components/Spinner";
import "./SearchPage.scss";
import axios from "axios";
import config from "~/Config";
import { useSearchParams } from "react-router-dom";
import Dialog from "~/components/Dialog";

// Set number book to show screen in paginate
function PaginatedBooks({ itemsPerPage, data, handleDialog }) {
    const [currentBooks, setCurrentBooks] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentBooks(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [data, itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            {/* Book list */}
            <div className="container">
                {currentBooks &&
                    currentBooks.map((data, index) => {
                        return (
                            <BookItem
                                key={index}
                                data={data}
                                handleDialog={handleDialog}
                            />
                        );
                    })}
            </div>

            {/* Pagitantion */}
            <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<<"
                renderOnZeroPageCount={null}
            />
        </>
    );
}

const OurBook = () => {
    const [loading, setLoading] = useState(true);
    const [booksData, setBooksData] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const alertData = {
        title: "Add To Cart",
        message: "Add Cart To Successfully!",
    };

    let query = "";
    const name = searchParams.get("name");
    const author = searchParams.get("author");
    if (name) {
        query = `?name=${name}`;
    } else if (author) {
        query = `?author=${author}`;
    }

    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${config.apiUrl}books${query}`);
                setLoading(false);
                setBooksData(res.data);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        getBook();
    }, [query]);

    return (
        <div className="ourBook_page">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {showDialog && (
                        <Dialog handleDialog={setShowDialog} data={alertData} />
                    )}
                    <HeadContentPage link="Search Book" />
                    {booksData.length === 0 ? (
                        <div className="not_result_wrap">
                            <TbBookOff className="icon" />
                            <p>☹️ There are no results! ☹️</p>
                        </div>
                    ) : (
                        <PaginatedBooks
                            itemsPerPage={12}
                            data={booksData}
                            handleDialog={setShowDialog}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default OurBook;
