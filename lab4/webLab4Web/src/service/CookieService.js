export const CookieService = {
    getCookie(name) {
        if (typeof document === 'undefined') return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);

        if (parts.length === 2) {
            const cookieValue = parts.pop().split(';').shift();
            if (!cookieValue) return null;

            try {
                const decoded = decodeURIComponent(cookieValue);
                if (decoded.startsWith('{') || decoded.startsWith('[')) {
                    return JSON.parse(decoded);
                }
                return decoded;
            } catch(e) {
                return cookieValue;
            }
        }
        return null;
    },

    setCookie(name, value, days = 3) {
        if (typeof document === 'undefined') return;

        let cookieValue = typeof value === 'string'
            ? encodeURIComponent(value)
            : encodeURIComponent(JSON.stringify(value));

        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = `; expires=${date.toUTCString()}`;
        }

        document.cookie = `${name}=${cookieValue}${expires}; path=/; SameSite=Lax`;
    },

    deleteCookie(name) {
        this.setCookie(name, '', -1);
    }
};