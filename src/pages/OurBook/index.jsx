import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Select from "react-select";
import ReactPaginate from "react-paginate";

import "./OurBook.scss";
import config from "~/Config";
import Dialog from "~/components/Dialog";
import Spinner from "~/components/Spinner";
import BookItem from "~/components/BookItem";
import HeadContentPage from "~/components/HeadContentPage";
import { useSearchParams } from "react-router-dom";

const customStyles = {
    control: (base) => ({
        ...base,
        border: "1px solid #ccc",
        borderRadius: "0",
        boxShadow: "none",
        "&:hover": {
            borderColor: "#f6b93b",
        },
    }),
    menu: (base) => ({
        ...base,
        borderRadius: "0",
    }),
    option: (base, state) => ({
        ...base,
        cursor: "pointer",
        backgroundColor: state.isSelected ? "#f6b93b" : "transparent",
        "&:hover": {
            backgroundColor: state.isSelected
                ? "#f6b93b"
                : "hsla(40, 91%, 60%, 30%)",
        },
    }),
};

// Set number book to show screen in paginate
function PaginatedBooks({
    itemsPerPage,
    data = [],
    handleDialog,
    itemOffset,
    handleChangeItemOffset,
}) {
    const endOffset = Math.min(itemOffset + itemsPerPage, data.length);
    const currentBooks = [...data].slice(itemOffset, endOffset) || [];

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        handleChangeItemOffset(newOffset);
    };

    return (
        <>
            {/* Book list */}
            <div className="container">
                {currentBooks.map((data, index) => {
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
                previousLabel="<<"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={Math.ceil(data.length / itemsPerPage)}
                forcePage={Math.ceil(itemOffset / itemsPerPage)}
                renderOnZeroPageCount={null}
            />
        </>
    );
}

const OurBook = () => {
    const [loading, setLoading] = useState(true);
    const [booksData, setBooksData] = useState([]);
    const [booksDataShow, setBooksDataShow] = useState([]);
    const [typeBook, setTypeBook] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [itemOffset, setItemOffset] = useState(0);
    let [searchParams, setSearchParams] = useSearchParams();

    const alertData = {
        title: "Add To Cart",
        message: "Add Cart To Successfully!",
    };

    const formik = useFormik({
        initialValues: {
            bookType: "",
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    // Custom <Select/>
    const options = config.typeBooks.map((type) => {
        return {
            value: type,
            label: type,
        };
    });
    if (typeBook !== "") {
        options.unshift({ value: "", label: "All Book" });
    }

    const defaultValue = (options, value) => {
        return options
            ? options.find((option) => options.value === value)
            : "Book Type:";
    };

    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${config.apiUrl}books`);
                setLoading(false);
                setBooksData(res.data);
                setBooksDataShow(res.data);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        };
        getBook();
    }, []);

    // Filter typebook in client
    const handleTypeBook = (typeBook) => {
        setItemOffset(0);
        if (typeBook !== "") {
            const data = booksData.filter((book) => book.type === typeBook);
            setBooksDataShow(data);
            setSearchParams(`?type=${typeBook}`);
        } else {
            setSearchParams(``);
            setBooksDataShow(booksData);
        }
    };

    const handleChangeItemOffset = (value) => {
        setItemOffset(value);
    };

    return (
        <div className="ourBook_page">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {showDialog && (
                        <Dialog handleDialog={setShowDialog} data={alertData} />
                    )}
                    <HeadContentPage link="Our book" />
                    {/* itemsPerPage: number book in 1 page */}
                    <div className="select_wrap">
                        <Select
                            name="bookType"
                            className="search_type search_input"
                            styles={customStyles}
                            value={defaultValue(
                                options,
                                formik.values.bookType
                            )}
                            onChange={(value) => {
                                formik.setFieldValue("bookType", value.value);
                                handleTypeBook(value.value);
                                setTypeBook(value.value);
                            }}
                            options={options}
                            placeholder={"Book Type:"}
                        />
                    </div>
                    <PaginatedBooks
                        handleChangeItemOffset={handleChangeItemOffset}
                        itemOffset={itemOffset}
                        itemsPerPage={12}
                        data={booksDataShow}
                        handleDialog={setShowDialog}
                    />
                </>
            )}
        </div>
    );
};

export default OurBook;
