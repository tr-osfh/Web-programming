import React from 'react';
import {Card, TextInput, Button} from "belle";
import { connect } from "react-redux";
import { registerUser } from "../store/thunks/authThunk";
import "../css/style.css"

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            password2: '',
            successMessage: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({successMessage: ''});

        const registerData = {
            login: this.state.login.trim(),
            password: this.state.password.trim(),
            password2: this.state.password2.trim()
        };

        this.props.registerUser(registerData).then((response) => {
            this.setState(
                {
                    successMessage: response.message,
                    login: '',
                    password: '',
                    password2: ''
                });
        }).catch(function(error) {
            console.error(error);
        });

    }

    render() {
        const { successMessage } = this.state;
        const { error } = this.props;

        return (
            <Card>
                <b>Создание аккаунта</b>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                        <div style={{ color: 'green', margin: '10px 0' }}>{successMessage}</div>

                        <lable className="form-lable">Логин</lable>
                        <TextInput
                            value={this.state.login}
                            onUpdate={(event) => this.setState({ login: event.value })}
                            className="form-text-input"
                        ></TextInput>

                        <lable className="form-lable">Пароль:</lable>

                        <TextInput
                            value={this.state.password}
                            onUpdate={(event) => this.setState({ password: event.value })}
                            className="form-text-input"
                        ></TextInput>


                        <lable className="form-lable">Повторите пароль:</lable>
                        <TextInput
                            value={this.state.password2}
                            onUpdate={(event) => this.setState({ password2: event.value })}
                            className="form-text-input"
                        ></TextInput>

                        <Button     style={{
                            display: 'block',
                            margin: '10px auto',
                        }}
                                    type="submit" primary className="data-button">Зарегистрироваться</Button>
                    </div>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
});

const mapDispatchToProps = {
    registerUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);