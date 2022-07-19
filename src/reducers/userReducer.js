export const userReducer = (state, action) => {
    const {
        type,
        payload: { isAuthenticated, userData },
    } = action;

    switch (type) {
        case "SET_AUTH":
            return {
                ...state,
                loading: false,
                isAuthenticated,
                userData,
            };

        case "UPDATE_USER_INFO":
            return {
                ...state,
                loading: false,
                isAuthenticated,
                userData,
            };
        default:
            return state;
    }
};
