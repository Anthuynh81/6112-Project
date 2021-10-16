import './App.css';
import React from "react";
import {useState} from "react";
import Axios from 'axios';


function App() {
    const [USAdata, setUSAdata] = useState([]);
    const [Statedata, setStatedata] = useState([]);
    const [Countydata, setCountydata] = useState([]);

    const getUSA = () => {
        Axios.get("http://localhost:5000/USA").then((response) =>{
            setUSAdata(response.data)
            console.log(response.data)
        });
    }

    const getState = () => {
        Axios.get("http://localhost:5000/State").then((response) =>{
            setStatedata(response.data)
            console.log(response.data)
        });
    }

    const getCounty = () => {
        Axios.get("http://localhost:5000/County").then((response) =>{
            setCountydata(response.data)
            console.log(response.data)
        });
    }


    return (
        <body>
        <button onClick={getUSA}>Show USA</button>
        <button onClick={getState}>Show State</button>
        <button onClick={getCounty}>Show County</button>

            <div>
                <h1 className="center">United States COVID-19 Interactive Dashboard</h1>

                United States Map:<br/>
                <svg id="mapsvg_pr" className="map"></svg>
                <div id="slidecontainer">
                    <input id="slider" type="range" min="0" step="1" value="0" className="slider"/>
                    <span id="date"></span>
                    <div className="buttoncontainer">
                        <button type="button" className="button" onClick="countymap()">County Level Map</button>
                        <button type="button" className="button" onClick="statemap()">State Level Map</button>
                        <button type="button" className="button" onClick="usamap()">United States Map</button>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default App;
