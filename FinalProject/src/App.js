import './App.css';
import React from "react";
import {useState} from "react";
import StateChart from "./StateChart";
import CountyChart from "./CountyChart";
import USAChart from "./USAChart";
import Line from "./totalLineChart";
import DeathsLineChart from "./deathLineChart";
import IndividualVaccineBarChart from "./individaulVaccineBarChart";
import { Slider } from '@material-ui/core';

function App() {
    const startDate = new Date(2020,0,23);
    const [toolTip, setTooltip] = useState("");
    const [map, setMap] = useState("USA");
    const [slider, setSlider] = useState(0);
    const [date, setDate] = useState(startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }));


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
        setSlider(value);
        const newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + slider);
        console.log(newDate);
        setDate(newDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }));
    }

    return (
        <body>
            <div>
                <h1 className="center">United States COVID-19 Interactive Dashboard {map}</h1>

                United States Map:<br/>

                <CountyChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>
                <StateChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>
                <USAChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>

                <h3 className="center">{date}</h3>
                <Slider onChange={changeValue} className="slider" min={0} max={630} defaultValue={0} step={1}/>
                <div className="buttoncontainer">
                    <button type="button" className="button" onClick={setCounty}>County Level Map</button>
                    <button type="button" className="button" onClick={setState}>State Level Map</button>
                    <button type="button" className="button" onClick={setUSA}>United States Map</button>
                </div>

                <Line />
                <DeathsLineChart />
                <IndividualVaccineBarChart />
            </div>
        </body>
    );
}

export default App;
