import { browserHistory } from 'react-router-dom';

export const NavigationService = {
    history: null,

    setHistory(history) {
        this.history = history;
    },

    navigate(path) {
        if (this.history) {
            this.history.push(path);
        } else {
            window.location.href = path;
        }
    },

    replace(path) {
        if (this.history) {
            this.history.replace(path);
        }
    },

    goBack() {
        if (this.history) {
            this.history.goBack();
        }
    }
};