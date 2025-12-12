export const SEND_POINT = 'SEND_POINT';
export const SET_X = 'SET_X';
export const SET_Y = 'SET_Y';
export const SET_R = 'SET_R';
export const RESET_FORM = 'RESET_FORM';
export const POINT_FAILURE = 'POINT_FAILURE';
export const SET_DOTS = 'SET_DOTS'
export const NO_POINT_FAILURE = 'NO_POINT_FAILURE';


const initialState = {
    x: '',
    y: '',
    r: '',
    points: [],
    error: ''
};

export const noPointFailure = () => ({
    type: NO_POINT_FAILURE,
})

export const pointFailure = (error) => ({
    type: POINT_FAILURE,
    payload: error
});

export const setX = (x) => ({
    type: SET_X,
    payload: x,
});

export const setY = (y) => ({
    type: SET_Y,
    payload: y,
});

export const setR = (r) => ({
    type: SET_R,
    payload: r,
});

export const resetForm = () => ({
    type: RESET_FORM
});

export const sendPoint = (point) => ({
    type: SEND_POINT,
})

export const setDots = (dots) => ({
    type: SET_DOTS,
    payload: dots
})

const pointReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_X:
            return {
                ...state,
                x: action.payload,
            };
        case SET_Y:
            return {
                ...state,
                y: action.payload,
            };
        case SET_R:
            return {
                ...state,
                r: action.payload,
            };
        case SET_DOTS:
            return {
                ...state,
                points: action.payload,
            }
        case NO_POINT_FAILURE:
            return {
                ...state,
                error: ""
            }
        case RESET_FORM:
            return {
                ...state,
                x: '',
                y: '',
                r: ''
            };
        case POINT_FAILURE:
            return {
                ...state,
                error: state.error + action.payload + "\n"
            }
        default:
            return state;
    }
}

export default pointReducer;
