import './App.css';
import React from "react";
import {useState} from "react";
import StateChart from "./StateChart";
import CountyChart from "./CountyChart";
import USAChart from "./USAChart";
import Line from "./totalLineChart";
import DeathsLineChart from "./deathLineChart";
import IndividualVaccineBarChart from "./individaulVaccineBarChart";
import TotalVaccineBarChart from "./totalVaccineBarChart";
import { Slider } from '@material-ui/core';

function App() {
    const startDate = new Date(2020,0,23);
    const [toolTip, setTooltip] = useState("");
    const [map, setMap] = useState("USA");
    const [slider, setSlider] = useState(0);
    const [lineChart, setLineChart] = useState("Confirmed")
    const [barChart, setBarChart] = useState("Manufacturer")
    const [date, setDate] = useState(startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }));


    //Set state for map chart
    const setUSA = () => {
        setMap("USA")
    }
    const setState = () => {
        setMap("State")
    }
    const setCounty = () => {
        setMap("County")
    }

    //Set state for Bar chart
    const setManufacturer = () => {
        setBarChart("Manufacturer")
    }
    const setTotal = () => {
        setBarChart("Total")
    }

    //Set state for line chart
    const setConfirmed = () => {
        setLineChart("Confirmed")
    }
    const setDeaths = () => {
        setLineChart("Deaths")
    }

    const showLineChart = () => {
        if(lineChart == "Confirmed"){
            return <Line />
        }else{
            return <DeathsLineChart />
        }
    }

    const showBarChart = () => {
        if(barChart == "Manufacturer"){
            return <IndividualVaccineBarChart />
        }else{
            return <TotalVaccineBarChart />
        }
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
                <h1 className="center">United States COVID-19 Interactive Dashboard</h1>

                United States Map:<br/>

                <CountyChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>
                <StateChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>
                <USAChart setTooltipContent={setTooltip} map={map} date={date} toolTip={toolTip}/>

                <h3 className="center">{date}</h3>
                <Slider onChange={changeValue} className="slider" min={0} max={630} defaultValue={0} step={1}/>
                <div className="buttoncontainer" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <button type="button" className="button" onClick={setCounty}>County Level Map</button>
                    <button type="button" className="button" onClick={setState}>State Level Map</button>
                    <button type="button" className="button" onClick={setUSA}>United States Map</button>
                </div>

                <h1 className="center">Confirmed/Deaths Over Time</h1>

                {showLineChart()}

                <div className="buttoncontainer" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <button type="button" className="button" onClick={setConfirmed}>Confirmed Cases</button>
                    <button type="button" className="button" onClick={setDeaths}>Deaths</button>
                </div>

                <h1 className="center">Vaccination Statistics</h1>

                {showBarChart()}

                <div className="buttoncontainer" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <button type="button" className="button" onClick={setManufacturer}>By Manufacturer</button>
                    <button type="button" className="button" onClick={setTotal}>Total</button>
                </div>
            </div>
        </body>
    );
}

export default App;
