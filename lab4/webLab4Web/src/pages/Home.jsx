import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegistrationForm";
import Header from "../components/Header";
import {Button} from "belle";
import { setCurrentForm } from '../store/ducks/authDuck';
import {connect} from "react-redux";
import "../css/style.css"
import AutoLogger from "../components/AutoLogger";
import Clock from "../components/Clock";

const Home = (props) => {
    const changeForm = () => {
        const newForm = props.currentForm === 'login' ? 'register' : 'login';
        props.setCurrentForm(newForm);
    }

    return (
        <div>
            <Header />
            <div className="main-cont">
                <div className="form-cont">
                    <Button
                        style={{
                            display: 'block',
                            margin: '0 auto'
                        }}
                        className="data-button"
                        onClick={changeForm}
                    >
                        {props.currentForm === 'login' ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                    {props.currentForm === 'login' ? <LoginForm /> : <RegisterForm />}
                </div>

                <div className="main-clock">
                    <Clock />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentForm: state.auth.currentForm
});

const mapDispatchToProps = {
    setCurrentForm
};

export default AutoLogger(connect(mapStateToProps, mapDispatchToProps)(Home));