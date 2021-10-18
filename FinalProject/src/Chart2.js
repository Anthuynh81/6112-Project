import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import Axios from 'axios';

const geoUrl = "https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json";
const StartDate = "01/21/2020";

const mapType = this.props;

const colorScale = scaleQuantize()
    .domain([1, 10])
    .range([
        "#ffedea",
        "#ffcec5",
        "#ffad9f",
        "#ff8a75",
        "#ff5533",
        "#e2492d",
        "#be3d26",
        "#9a311f",
        "#782618"
    ]);


const MapChart2 = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/State").then((response) =>{
            setData(response.data.filter(o => o.Updated === StartDate))
        });
    }, []);

    return (
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa" width={1000} height={800}>
                <ZoomableGroup zoom={1}>>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const NAME = geo.properties.name;
                                        const state= data.find(o => o.AdminRegion1 === NAME);
                                        setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - ${state.Confirmed}</br>
                                                        ${mapType}`);
                                    }}
                                    onMouseLeave={() => {
                                        setTooltipContent("");
                                    }}
                                    style={{
                                        default: {
                                            fill: "#D6D6DA",
                                            outline: "none"
                                        },
                                        hover: {
                                            fill: "#F53",
                                            outline: "none"
                                        },
                                        pressed: {
                                            fill: "#E42",
                                            outline: "none"
                                        }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default memo(MapChart2);
