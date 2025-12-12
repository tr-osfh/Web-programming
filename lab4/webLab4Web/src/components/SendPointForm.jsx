import React from 'react';
import { Button, Card, TextInput } from "belle";
import { connect } from "react-redux";
import "../css/form.css"
import {
    sendPoint,
    saveR,
    saveX,
    saveY,
    deleteAllDots,
    reset,
    showDotError,
    deletePointFailure
} from "../store/thunks/pointThunk";

const SendPointForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        props.deletePointFailure();

        if (!validate()){
            return;
        }

        const point = {
            x: props.x,
            y: props.y,
            r: props.r,
            source: "form"
        }

        props.sendPoint(point).then(function (result) {
        }).catch(function (error) {
        })
    }

    const validate = () => {
        const availableXR = ["-4", "-3", "-2", "-1", "0", "1", "2", "3", "4"];

        if (props.y === '' || props.r === '' || props.x === '') {
            props.showDotError("Заполните все поля");
            return  false;
        }

        let valid = true;
        if (!availableXR.includes(props.x)){
            valid = false;
            props.showDotError("Выбранное x недоступно");
        } else if (!availableXR.includes(props.r)){
            props.showDotError("Выбранное r недоступно");
            valid = false;
        } else if (props.y > 3 || props.y < -3) {
            props.showDotError("Выбранное y недоступно");
            valid = false;
        }
        return valid;
    }

    const handleDeleteAll = () => {
        props.deleteAllDots();
    }

    const handleReset = () => {
        props.reset();
    }

    const { x, y, r, error} = props;

    return(
        <Card className="belle-card point-form">
            <text className="error">{error}</text>
            <form onSubmit={handleSubmit}>
                <div >
                    <legend className="label-for-param">Координата X:</legend>
                    <div className="radio-group">
                        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(item => (
                            <div key={item}>
                                <label>{item}</label>
                                <input
                                    type="radio"
                                    id={`x-${item}`}
                                    name="x-coordinate"
                                    value={item}
                                    checked={x === item.toString()}
                                    onChange={(event) => props.saveX(event.target.value)}
                                    className="radio-input"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="label-for-param">Координата Y:</label>
                    <TextInput
                        placeholder="-3...3"
                        value={y}
                        onUpdate={(event) => props.saveY(event.value)}
                    />
                </div>

                <div>
                    <legend className="label-for-param">Параметр R:</legend>
                    <div className="radio-group">
                        {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(item => (
                            <div key={item}>
                                <label>{item}</label>
                                <input
                                    type="radio"
                                    id={`r${item}`}
                                    name="r-parametr"
                                    value={item}
                                    checked={r === item.toString()}
                                    onChange={(event) => props.saveR(event.target.value)}
                                    className="radio-input"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <Button className="data-button" type="submit">Отправить!</Button>
                <Button type="button" className="deleteBtn" onClick={handleReset}>Очистить</Button>
                <Button className="delete-button" type="button" onClick={handleDeleteAll}>Удалить точки</Button>
            </form>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    x: state.point.x,
    y: state.point.y,
    r: state.point.r,
    error: state.point.error
});

const mapDispatchToProps = {
    sendPoint,
    saveR,
    saveX,
    saveY,
    deleteAllDots,
    reset,
    showDotError,
    deletePointFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(SendPointForm)