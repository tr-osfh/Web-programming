import React from 'react';
import { connect } from 'react-redux';
import {CookieService} from "./CookieService";
import { setAllDots } from "../store/thunks/pointThunk";
import {NavigationService} from "./NavigationService";

class WebSocketService extends React.Component {
    socket = null;

    componentDidMount() {
        this.connect();
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close();
        }
    }

    connect = () => {
        const url = 'ws://localhost:8080/webLab4/update';
        console.log('Connecting to WebSocket:', url);

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {

        };

        this.socket.onmessage = (event) => {

            try {
                const points = JSON.parse(event.data);
                this.props.setAllDots(points);
            } catch (error) {
                console.log('Error parsing WebSocket data:', error);
            }
        };

        this.socket.onclose = () => {
            CookieService.deleteCookie("login");
            CookieService.deleteCookie("JSESSIONID");
            NavigationService.navigate("/");

        };

        this.socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };
    }

    render() {
        return null;
    }
}

export default connect(null, { setAllDots })(WebSocketService);