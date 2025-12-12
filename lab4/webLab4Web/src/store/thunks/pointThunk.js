import {
    setX, setY, setR, pointFailure,
    setDots, resetForm, noPointFailure
} from "../ducks/pointDuck";

import {pointAPI} from '../../api/pointAPI';
import {NavigationService} from "../../service/NavigationService";

export const sendPoint = (point) => async (dispatch) => {
    try {

        const response = await pointAPI.send(point);


        if (response.x !== undefined && response.y !== undefined && response.r !== undefined) {
            return response;
        } else {
            const errorMessage = response.message || "Ошибка получения данных";
            dispatch(pointFailure(errorMessage));
            return response.message;
        }
    } catch (error) {
        NavigationService.navigate('/');
    }
}

export const getPoints = () => async (dispatch) => {
    const response = pointAPI.getDots();
}

export const setAllDots = (dots) => async (dispatch) => {
    dispatch(setDots(dots.sort((a, b) => b.id - a.id)));
}

export const deleteAllDots = () => async (dispatch) => {
    try {
        const response = await pointAPI.deleteDots();

    } catch (error) {
        NavigationService.navigate('/');
    }
}

export const reset = () => async (dispatch) => {
    dispatch(resetForm())
}

export const showDotError = (error) => async (dispatch) => {
    dispatch(pointFailure(error));
}

export const deletePointFailure = () => async (dispatch) => {
    dispatch(noPointFailure());
}

export const saveX = (x) => async (dispatch) => {
    dispatch(setX(x));
}

export const saveY = (y) => async (dispatch) => {
    dispatch(setY(y));
}

export const saveR = (r) => async (dispatch) => {
    dispatch(setR(r));
}