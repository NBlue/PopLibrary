import axios from "axios";

const request = axios.create({
    baseURL: "https://e-service-bookstore.herokuapp.com/api/v1/",
});

export default request;
