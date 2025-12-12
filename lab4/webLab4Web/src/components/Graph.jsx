import React from 'react';
import "../css/graph.css";
import {sendPoint} from "../store/thunks/pointThunk";
import {connect} from "react-redux";

function Graph({sendPoint, currentR, data}) {

    const convertToCords = (x, y, r) => {
        const centerX = 200;
        const centerY = 200;

        const pointX = (x * 160 / Math.abs(r)) + centerX;
        const pointY = centerY - (y * 160 / Math.abs(r));

        return {
            x: pointX,
            y: pointY
        }
    }

    const convertToPoint = (x, y, r) => {
        const centerX = 200;
        const centerY = 200;

        const userPointX = (((x - centerX) / 160 * Math.abs(r)).toFixed(2));
        const userPointY = (((centerY - y) / 160 * Math.abs(r)).toFixed(2));

        return  {
            x: userPointX,
            y: userPointY,
            r: r,
            source: r > 0 ? "graphPos" : "graphNeg"
        }
    }




    const drawDots = () => {
        return (data.map(function(dot, index) {
            if (dot.r == currentR && currentR != 0) {
                const position = convertToCords(dot.x, dot.y, dot.r);
                return (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: '8px',
                            height: '8px',
                            borderRadius: '100%',
                            backgroundColor: dot.result ? 'green' : 'red',
                        }}
                    />
                )
            }
            return null;
        }))
    }


    if (!currentR) {
        return (
            <div className="graph-base">
                <text className="choose-r">Выбирите R</text>
            </div>
            )
    }

    const graphClick = async (event) => {
        event.preventDefault();


        const graph = document.getElementById("graph-base");
        const rect  = graph.getBoundingClientRect();

        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        if (currentR === "0"){
            const coords = convertToPoint(0, 0, 0);

            sendPoint(coords);
        }
        const coords = convertToPoint(clickX, clickY, currentR);

        sendPoint(coords);
    }

    const graphSwitch = () => {
        if (currentR < 0) {
            return  ("n-")
        } else if (currentR > 0) {
            return ("")
        } else {
            return "null-"
        }
    }


    return (
        <div id="graph-base" style={{ cursor: 'pointer' }} className="graph-base" onClick={graphClick}>

            <div className={`${graphSwitch()}III`}></div>
            <div className={`${graphSwitch()}blocker1`}></div>
            <div className={`${graphSwitch()}blocker2`}></div>
            <div className={`${graphSwitch()}II`}></div>
            <div className={`${graphSwitch()}IIII`}></div>



            <div className="vertical-arrow"></div>
            <div className="arrow-up"></div>
            <div className="horizontal-arrow"></div>
            <div className="arrow-right"></div>

            <div className="y-r"></div>
            <div className="y-r-na-2"></div>
            <div className="y-minus-r"></div>
            <div className="y-minus-r-na-2"></div>

            <div className="x-r"></div>
            <div className="x-r-na-2"></div>
            <div className="x-minus-r"></div>
            <div className="x-minus-r-na-2"></div>

            <text className="text-x-r">{currentR}</text>
            <text className="text-x-r-na-2">{currentR /2}</text>
            <text className="text-x-minus-r-na-2">{-1 * currentR /2}</text>
            <text className="text-x-minus-r">{-1 *currentR}</text>

            <text className="text-y-r">{currentR}</text>
            <text className="text-y-r-na-2">{currentR /2 }</text>
            <text className="text-y-minus-r-na-2">{-1 * currentR /2 }</text>
            <text className="text-y-minus-r">{-1 * currentR}</text>

            {drawDots(data, currentR)}

        </div>
    );
}


const mapDispatchToProps = {
    sendPoint,
};



export default connect(null, mapDispatchToProps)(Graph)