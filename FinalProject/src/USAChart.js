import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Axios from 'axios';
import { json } from 'd3-fetch';

const geoUrl =   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const StartDate = "01/21/2020";

const USAChart = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);


    useEffect(() => {
        Axios.get("http://localhost:5000/USA").then((response) =>{
            setData(response.data.filter(o => o.Updated === StartDate))
        });
    }, []);

    return (
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa" width={1000} height={800}>
                <ZoomableGroup zoom={1}>>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.filter(geo => geo.name === "United States of America").map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const NAME = geo.properties.name;
                                        const state= data.find(o => o.AdminRegion1 === NAME);
                                        setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - ${state.Confirmed}</br>`);
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

export default memo(USAChart);
