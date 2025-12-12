import React from 'react';
import { Card, TextInput, Button } from 'belle';
import { connect } from 'react-redux';
import {loginUser, setUser, loginWithGoogle} from "../store/thunks/authThunk";
import GoogleLoginButton from "./GoogleLoginButton";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async e => {
        e.preventDefault();

        const authData = {
            login: this.state.login.trim(),
            password: this.state.password.trim()
        }

        this.props.loginUser(authData).then((response) => {
            if (response && response.user) {
                this.props.setUser(response.user);
            }
        }).catch((error) => {
        });
    }

    render() {
        const { error } = this.props;

        return (
            <Card className="belle-card">
                <b>Вход в систему</b>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

                        <label className="form-label">Логин:</label>
                        <TextInput
                            value={this.state.login}
                            onUpdate={(event) => this.setState({ login: event.value })}
                            className="belle-text-input"
                        />

                        <label className="form-label">Пароль:</label>
                        <TextInput
                            value={this.state.password}
                            onUpdate={(event) => this.setState({ password: event.value })}
                            className="belle-text-input"
                        />

                        <Button style={{
                            display: 'block',
                            margin: '10px auto'
                        }} type="submit"  primary className="data-button">Войти</Button>
                    </div>
                </form>
                <GoogleLoginButton onLogin={() => this.props.loginWithGoogle()}></GoogleLoginButton>
            </Card>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error
});

const mapDispatchToProps = {
    loginUser,
    setUser,
    loginWithGoogle
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
