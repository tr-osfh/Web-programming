import React from 'react';
import {connect} from "react-redux";
import Graph from "../components/Graph";
import Table from "../components/Table";
import SendPointForm from "../components/SendPointForm";
import "../css/main.css"
import {logoutUser} from "../store/thunks/authThunk";
import UserProfile from "../components/UserProfile";
import Guard from "../components/Guard";
import WebService from "../service/WebService";

const Main = (props) => {
    return (
        <div className="layout">
            <WebService></WebService>
            <div className="user"><UserProfile logoutUser={props.logoutUser} user={props.user} /></div>
            <div className="graph"><Graph sendPoint={props.sendPoint} currentR={props.r} data={props.points || []} /></div>
            <div className="form"><SendPointForm /></div>
            <div className="table"><Table data={props.points || []} /></div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    points: state.point.points,
    r: state.point.r,
    user: state.auth.user
});

const mapDispatchToProps = {
    logoutUser
};

export default Guard(connect(mapStateToProps, mapDispatchToProps)(Main));