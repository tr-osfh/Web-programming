const API_URL = "http://localhost:8080/webLab4/api";

export const authAPI = {
    login: async (login) => {
        const response = await fetch(`${API_URL}/users/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(login),
        } );

        return response.json();
    },

    register: async (register) => {
        const response = await fetch(`${API_URL}/users/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(register),
        });

        return response.json();

    },

    authWithGoogle: async (authData) => {
        const url = `${API_URL}/users/auth/google`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                access_token: authData.access_token,
                username: authData.user_info.name
            })
        });

        const result = await response.json();
        return result;
    },

    logout: async () => {
        const response = await fetch(`${API_URL}/users/sessions`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return response.json();
    }
}