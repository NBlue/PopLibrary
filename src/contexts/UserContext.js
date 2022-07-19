import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import config from "~/Config";
import { userReducer } from "~/reducers/userReducer";
import setAuthtoken from "~/utils/setAuthtoken";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [userState, dispatch] = useReducer(userReducer, {
        userData: null,
        loading: true,
        isAuthenticated: false,
    });

    // Authenticate user
    const loadUser = async () => {
        let localData;
        if (localStorage[config.LOCAL_STORAGE_TOKEN_NAME]) {
            localData = JSON.parse(
                localStorage[config.LOCAL_STORAGE_TOKEN_NAME]
            );
            setAuthtoken(localData.token);
        }

        try {
            const res = await axios.get(
                `${config.apiUrl}users/by-email?email=${localData.email}`
            );

            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: true,
                    userData: res.data,
                },
            });
        } catch (error) {
            localStorage.removeItem(config.LOCAL_STORAGE_TOKEN_NAME);
            setAuthtoken(null);
            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: false,
                    userData: null,
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    // Login
    const loginUser = async (userForm) => {
        try {
            const res = await axios.post(
                `${config.apiUrl}login/user`,
                JSON.stringify({
                    email: userForm.email,
                    publicKey: userForm.password,
                })
            );
            const localData = {
                email: userForm.email,
                token: res.data.token,
            };

            if (res.data.success) {
                localStorage.setItem(
                    config.LOCAL_STORAGE_TOKEN_NAME,
                    JSON.stringify(localData)
                );
            }

            await loadUser();

            return res.data;
        } catch (error) {
            console.log(error);
            return {
                succes: false,
                message: "Errol mess",
            };
        }
    };

    // Register
    const registerUser = async (userForm) => {
        try {
            const res = await axios.post(
                `${config.apiUrl}users`,
                JSON.stringify({
                    ...userForm,
                    publicKey: userForm.password,
                })
            );

            if (res.data) {
                return {
                    success: true,
                    data: res.data,
                };
            } else {
                return {
                    success: false,
                };
            }
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Email already registered!",
            };
        }
    };

    // Update Profile
    const updateProfile = async (profileForm) => {
        try {
            const dataUpdate = {
                ...userState.userData,
                ...profileForm,
            };
            const res = await axios.put(
                `${config.apiUrl}users?userId=${userState.userData._id}`,
                dataUpdate
            );
            if (res.data) {
                dispatch({
                    type: "UPDATE_USER_INFO",
                    payload: {
                        isAuthenticated: true,
                        userData: dataUpdate,
                    },
                });
                return res.data;
            }
        } catch (error) {
            return error;
        }
    };

    // Add Cart
    const addToCart = async (dataBook) => {
        const cartUpdate = [...userState.userData.cart, dataBook];

        const dataUpdate = {
            ...userState.userData,
            cart: cartUpdate,
        };

        try {
            const res = await axios.put(
                `${config.apiUrl}users?userId=${userState.userData._id}`,
                dataUpdate
            );
            if (res.data) {
                dispatch({
                    type: "UPDATE_USER_INFO",
                    payload: {
                        isAuthenticated: true,
                        userData: dataUpdate,
                    },
                });
                return res.data;
            }
        } catch (error) {
            return error;
        }
    };

    // Delete Cart
    const deleteToCart = async (idBook) => {
        const data = userState.userData.cart.filter(
            (cart) => cart._id !== idBook
        );

        const dataUpdate = {
            ...userState.userData,
            cart: data,
        };

        try {
            const res = await axios.put(
                `${config.apiUrl}users?userId=${userState.userData._id}`,
                dataUpdate
            );
            if (res.data) {
                dispatch({
                    type: "UPDATE_USER_INFO",
                    payload: {
                        isAuthenticated: true,
                        userData: dataUpdate,
                    },
                });
                return res.data;
            }
        } catch (error) {
            return error;
        }
    };

    // Order Cart
    const orderToCart = async () => {
        const dataUpdate = {
            ...userState.userData,
            cart: [],
        };

        try {
            const res = await axios.put(
                `${config.apiUrl}users?userId=${userState.userData._id}`,
                dataUpdate
            );
            if (res.data) {
                dispatch({
                    type: "UPDATE_USER_INFO",
                    payload: {
                        isAuthenticated: true,
                        userData: dataUpdate,
                    },
                });
                return res.data;
            }
        } catch (error) {
            return error;
        }
    };

    // Logout
    const logoutUser = async () => {
        try {
            const res = await axios.get(`${config.apiUrl}logout`);
            if (res.data.success) {
                localStorage.removeItem(config.LOCAL_STORAGE_TOKEN_NAME);
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
                return res.data;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    // Context data
    const useContextData = {
        userState,
        loginUser,
        registerUser,
        logoutUser,
        updateProfile,
        addToCart,
        deleteToCart,
        orderToCart,
    };

    // Return provider
    return (
        <UserContext.Provider value={useContextData}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
