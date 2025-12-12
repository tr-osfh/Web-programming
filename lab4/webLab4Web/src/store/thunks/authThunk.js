/* global google */

import {
    loginSuccess, loginFailure,
    registerSuccess, registerFailure,
    setUsername, logout
} from '../ducks/authDuck';
import { authAPI } from '../../api/authAPI';
import {CookieService} from "../../service/CookieService";
import {NavigationService} from "../../service/NavigationService";

export const loginUser = (credentials) => async (dispatch) => {
    const cookieLogin = CookieService.getCookie("login");
    if (cookieLogin) {
        dispatch(loginSuccess(cookieLogin));
        NavigationService.navigate('/main');
        return;
    }

    try {
        if (!credentials.login || !credentials.password) {
            dispatch(loginFailure('Заполните все поля'));
            return;
        }

        const response = await authAPI.login(credentials);

        if (response && response.user){
            dispatch(loginSuccess(response.user));

            CookieService.setCookie("login", response.user);
            NavigationService.navigate('/main');
            return response;
        } else {
            const errorMessage = response.message || 'Ошибка авторизации';
            dispatch(loginFailure(errorMessage));
        }
    } catch (error) {
        dispatch(error.message);
        throw error;
    }
};

export const registerUser = (userData) => async (dispatch) => {

    dispatch(registerFailure(""));

    if (!userData.login || !userData.password || !userData.password2) {
        dispatch(registerFailure("Заполните все поля"));
        return;
    }

    if (userData.password !== userData.password2) {
        dispatch(registerFailure("Пароли должны совпадать"));
        return;
    }

    if (userData.password.length < 6) {
        dispatch(registerFailure('Пароль должен быть длинее 6 символов'))
        return;
    }


    try {
        const response = await authAPI.register({
            login: userData.login,
            password: userData.password
            });

        if (response && response.message) {
            dispatch(registerSuccess());
            return response;
        } else {
            const errorMessage = response.message || 'Ошибка регистрации';
            dispatch(registerFailure(errorMessage));
        }
    } catch (error) {
        const errorMessage = 'Ошибка подключения к серверу';
    }
};

export const setUser = (username) => async (dispatch) => {
    dispatch(setUsername(username));
}

export const logoutUser = () => async (dispatch) => {

    try {
        const response = await authAPI.logout();

        if (response) {
            dispatch(logout());
            CookieService.deleteCookie("login");
            NavigationService.navigate('/');
            return response;
        } else {
            const errorMessage = response.message || 'Ошибка подключения к серверу';
        }
    } catch (error) {
        const errorMessage = error.message || 'Ошибка подключения к серверу';
    }
}

export const loginWithGoogle = () => async (dispatch) => {
    try {
        const cookieLogin = CookieService.getCookie("login");
        if (cookieLogin) {

            dispatch(loginSuccess(cookieLogin));
            NavigationService.navigate('/main');
            return;
        }

        if (!window.google || !window.google.accounts) {
            await loadGoogleScript();
        }

        return new Promise((resolve, reject) => {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: "123",
                scope: 'email profile openid',
                callback: async (tokenResponse) => {
                    try {

                        if (!tokenResponse.access_token) {
                            throw new Error('No access token received from Google');
                        }

                        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: {
                                'Authorization': `Bearer ${tokenResponse.access_token}`
                            }
                        });

                        if (!userInfoResponse.ok) {
                            const errorText = await userInfoResponse.text();
                            throw new Error(`Google API error: ${errorText}`);
                        }

                        const userInfo = await userInfoResponse.json();

                        console.log(userInfo);

                        const result = await authAPI.authWithGoogle({
                            access_token: tokenResponse.access_token,
                            user_info: userInfo
                        });


                        if (result && result.user) {
                            dispatch(loginSuccess(result.user.login));
                            CookieService.setCookie("login", result.user.login);
                            NavigationService.navigate('/main');
                            resolve(result.user);
                        } else {
                            dispatch(loginFailure(result.message));
                            reject();
                        }
                    } catch (error) {
                        dispatch(loginFailure(error || 'Ошибка Google аутентификации'));
                        reject(error);
                    }
                },
                error_callback: (error) => {
                    dispatch(loginFailure('Ошибка авторизации Google: ' + error.message));
                    reject(new Error('Google OAuth error: ' + error.message));
                },
                ux_mode: 'popup'
            });

            client.requestAccessToken();
        });
    } catch (error) {
        dispatch(loginFailure(error.message || 'Ошибка входа'));
        throw error;
    }
};

const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
        if (window.google && google.accounts) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google && google.accounts) {
                resolve();
            } else {
                reject(new Error('Failed to load Google Identity Services'));
            }
        };
        script.onerror = () => reject(new Error('Failed to load Google script'));

        document.head.appendChild(script);
    });
};
