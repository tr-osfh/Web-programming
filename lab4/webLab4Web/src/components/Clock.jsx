import React from 'react';
import "../css/clock.css"

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            date: new Date().toLocaleDateString('ru-RU')
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }


    tick() {
        this.setState({
            time: new Date(),
            date: new Date().toLocaleDateString('ru-RU')
        });
    }

    render() {
        const { time, date } = this.state;

        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();

        const secondAngle = (seconds * 6) - 90;
        const minuteAngle = (minutes * 6 + seconds * 0.1) - 90;
        const hourAngle = (hours * 30 + minutes * 0.5) - 90;

        return (
            <div className="clock">
                <div className="ring"></div>
                <div className="inner-ring-2"></div>
                <div className="inner-ring"></div>



                <div
                    className="hour-hand"
                    style={{
                        transform: `rotate(${hourAngle}deg)`,
                        transformOrigin: 'bottom center'
                    }}
                ></div>

                <div className="center"></div>

                <div
                    className="minute-hand"
                    style={{
                        transform: `rotate(${minuteAngle}deg)`,
                        transformOrigin: 'bottom center'
                    }}
                ></div>

                <div
                    className="second-hand"
                    style={{
                        transform: `rotate(${secondAngle}deg)`,
                        transformOrigin: 'bottom center'
                    }}
                ></div>

            </div>
        );
    }
}

export default Clock;