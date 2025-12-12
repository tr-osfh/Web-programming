import React from 'react';
import {Button, Card} from "belle";
import {connect} from "react-redux";
import {logoutUser} from "../store/thunks/authThunk";
import "../css/form.css"

function UserProfile({logoutUser, user}){
    return  (
        <Card>
            <text className="label-for-param">Текущий пользователь: {user}</text>
            <Button className="deleteBtn logout" onClick={logoutUser}>Выйти</Button>
        </Card>
    )
}

const mapDispatchToProps = {
    logoutUser,
};
export default connect(null, mapDispatchToProps)(UserProfile)