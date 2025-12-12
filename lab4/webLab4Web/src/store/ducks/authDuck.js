
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const SET_CURRENT_FORM = 'SET_CURRENT_FORM';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const SET_USERNAME = 'SET_USERNAME';


export const setCurrentForm = (formType) => ({
    type: SET_CURRENT_FORM,
    payload: formType
});

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const setUsername = (name) => ({
    type: SET_USERNAME,
    payload: name
})

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const logout = () => ({
    type: LOGOUT
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error
});


const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
    currentForm: 'login'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null
            };
        case SET_CURRENT_FORM:
            return {
                ...state,
                error: "",
                currentForm: action.payload
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null
            };

        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default authReducer;