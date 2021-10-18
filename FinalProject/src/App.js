import './App.css';
import React from "react";
import {useState} from "react";
import Chart2 from "./Chart2";
import ReactTooltip from "react-tooltip";

function App() {
    const [toolTip, setTooltip] = useState("");
    const [map, setMap] = useState("USA");

    const setUSA = () => {
        setMap("USA")
    }
    const setState = () => {
        setMap("State")
    }
    const setCounty = () => {
        setMap("County")
    }

    return (
        <body>
            <div>
                <h1 className="center">United States COVID-19 Interactive Dashboard</h1>

                United States Map:<br/>
                <Chart2 setTooltipContent={setTooltip}/>
                <ReactTooltip html={true}>{toolTip}</ReactTooltip>
                <h3 className="center">{map}</h3>
                <div className="buttoncontainer">
                    <button type="button" className="button" onClick={setCounty}>County Level Map</button>
                    <button type="button" className="button" onClick={setState}>State Level Map</button>
                    <button type="button" className="button" onClick={setUSA}>United States Map</button>
                </div>
            </div>
        </body>
    );
}

export default App;
