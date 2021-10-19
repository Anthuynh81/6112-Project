import './App.css';
import React from "react";
import {useState} from "react";
import StateChart from "./StateChart";
import CountyChart from "./CountyChart";
import USAChart from "./USAChart";
import ReactTooltip from "react-tooltip";

function App() {
    const [toolTip, setTooltip] = useState("");
    const [map, setMap] = useState("USA");
    const [slider, setSlider] = useState(0)

    const setUSA = () => {
        setMap("USA")
    }
    const setState = () => {
        setMap("State")
    }
    const setCounty = () => {
        setMap("County")
    }

    function pickChart(map) {
        if(map == "County"){
            return <CountyChart setTooltipContent={setTooltip}/>
        }else if(map == "State"){
            return <StateChart setTooltipContent={setTooltip}/>
        }else{
            return <USAChart setTooltipContent={setTooltip}/>
        }
    }

    return (
        <body>
            <div>
                <h1 className="center">United States COVID-19 Interactive Dashboard</h1>

                United States Map:<br/>
                {pickChart(map)}
                <ReactTooltip html={true}>{toolTip}</ReactTooltip>
                <h3 className="center">{slider}</h3>
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
