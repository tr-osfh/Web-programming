import React from 'react';
import {Button} from "belle";

const GoogleLoginButton = ({onLogin}) => {
    const handleClick = () => {
        if (window.google && window.google.accounts) {
            onLogin();
        } else {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = onLogin;
            document.head.appendChild(script);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Button className="data-button"
                    style={{
                        margin: '0 auto'
                    }}
            onClick={handleClick}
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="google-icon"
                />
                <span style={{ marginLeft: 30 }}>Войти через ГУГЛ</span>
            </Button>
        </div>
    )
}

export default GoogleLoginButton;