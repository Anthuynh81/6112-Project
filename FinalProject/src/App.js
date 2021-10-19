import './App.css';
import React from "react";
import {useState} from "react";
import StateChart from "./StateChart";
import CountyChart from "./CountyChart";
import USAChart from "./USAChart";
import ReactTooltip from "react-tooltip";
import { Slider } from '@material-ui/core';
import * as d3 from 'd3'

function App() {
    const startDate = new Date(2020,0,23);
    const [toolTip, setTooltip] = useState("");
    const [map, setMap] = useState("USA");
    const [slider, setSlider] = useState(0);
    const [date, setDate] = useState(startDate.toISOString().split('T')[0]);
    const setUSA = () => {
        setMap("USA")
    }
    const setState = () => {
        setMap("State")
    }
    const setCounty = () => {
        setMap("County")
    }

    const changeValue = (event, value) =>{
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        setSlider(value);
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + slider);
        console.log(newDate);
        setDate(newDate.toISOString().split('T')[0]);
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
                <h3 className="center">{date}</h3>
                <Slider onChange={changeValue} className="slider" min={0} max={630} defaultValue={0} step={1}/>
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
