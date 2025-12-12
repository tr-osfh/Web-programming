import React from 'react';
import { connect } from "react-redux";
import {setUser, logoutUser} from "../store/thunks/authThunk";
import {CookieService} from "../service/CookieService";
import {NavigationService} from "../service/NavigationService";

function AutoLogger(WrappedComponent) {
    class AutoLoggerComponent extends React.Component {

        componentDidMount() {
            this.checkAuth();
        }

        componentDidUpdate(prevProps) {
            if (prevProps.user !== this.props.user) {
                this.checkAuth();
            }
        }

        checkAuth =  () => {
            const { user, setUser} = this.props;
            const login = CookieService.getCookie("login");

            if (login) {
                setUser(login);
                NavigationService.navigate('/main');

            }
        }


        render() {
            const { user, ...props } = this.props;

            return <WrappedComponent {...props} />;
        }
    }

    const mapStateToProps = (state) => ({
        user: state.auth.user
    });

    const mapDispatchToProps = (dispatch) => ({
        setUser: (login) => dispatch(setUser(login)),
        logoutUser : (login) => dispatch(logoutUser(login)),
    });

    return connect(mapStateToProps, mapDispatchToProps)(AutoLoggerComponent);
}

export default AutoLogger;