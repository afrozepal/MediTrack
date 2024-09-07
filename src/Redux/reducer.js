const initialState = {
    username: null,
    password: null,
    email: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            };
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            };
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;