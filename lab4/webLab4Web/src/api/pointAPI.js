const API_URL = "http://localhost:8080/webLab4/api";

export const pointAPI = {
    send: async (point) =>{
        const response = await fetch(`${API_URL}/points`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(point)
        });

        return response.json();
    },

    getDots : async () => {
        const response = await fetch(`${API_URL}/points`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include'
        });


        return response.json();
    },

    deleteDots : async () =>{
        const response = await fetch(`${API_URL}/points`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include'
        });

        return response.json();
    },

}