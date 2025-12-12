import React from 'react';
import { connect } from "react-redux";
import { CookieService } from "../service/CookieService";
import {logoutUser, setUser} from "../store/thunks/authThunk";
import { NavigationService } from "../service/NavigationService";

function Guard(WrappedComponent) {
    class GuardComponent extends React.Component {
        componentDidMount() {
            this.initializeAuth();
        }

        initializeAuth = async () => {
            const { user, setUser, logoutUser } = this.props;
            if (user) return;

            const login = CookieService.getCookie("login");

            if (login) {
                await setUser(login);
                return;
            }

            logoutUser();
            NavigationService.navigate("/");
        }

        componentDidUpdate(prevProps) {
            if (prevProps.user !== this.props.user) {
                this.checkAuth();
            }
        }

        checkAuth = () => {
            const { user } = this.props;
            if (!user) {
                NavigationService.navigate("/");
            }
        }

        render() {
            const { user, ...props } = this.props;

            if (!user) {
                return null;
            }

            return <WrappedComponent {...props} />;
        }
    }

    const mapStateToProps = (state) => ({
        user: state.auth.user
    });

    const mapDispatchToProps = (dispatch) => ({
        setUser: (login) => dispatch(setUser(login)),
        logoutUser: () => dispatch(logoutUser()),
    });

    return connect(mapStateToProps, mapDispatchToProps)(GuardComponent);
}

export default Guard;