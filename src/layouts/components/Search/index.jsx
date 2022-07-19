import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = ({ style }) => {
    const classes = "search_wrap " + style;

    const [typeSearch, setTypeSearch] = useState("name");

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            searchValue: "",
        },
        onSubmit: (values, onSubmitProps) => {
            const query = typeSearch + "=" + values.searchValue;
            onSubmitProps.resetForm();
            navigate(`../search?${query}`, { replace: true });
        },
    });

    return (
        <div className={classes}>
            <form
                className="search_value search_form"
                onSubmit={formik.handleSubmit}
            >
                <div className="input_search">
                    <input
                        type="text"
                        name="searchValue"
                        placeholder="Enter to search..."
                        value={formik.values.searchValue}
                        onChange={formik.handleChange}
                        className="searchValue search_input"
                    />
                    {/* {searchLoading && <FaSpinner className="icon" />} */}
                </div>

                <div>
                    <input
                        type="submit"
                        className="search_button search_input"
                        value="Search by name"
                        onClick={() => {
                            setTypeSearch("name");
                        }}
                    />
                    <input
                        type="submit"
                        className="search_button search_input"
                        value="Search by author"
                        onClick={() => setTypeSearch("author")}
                    />
                </div>
            </form>
        </div>
    );
};

export default Search;
