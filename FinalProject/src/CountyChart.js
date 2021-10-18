import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Axios from 'axios';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const StartDate = "03/24/2020";

const CountyChart = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        Axios.get("http://localhost:5000/County").then((response) =>{
            setData(response.data.filter(o => o.Updated === StartDate))
            console.log(response.data.filter(o => o.Updated === StartDate))
            setLoading(false);
            });
    }, []);


    return (
        <>
            <ComposableMap data-tip="" projection="geoAlbersUsa" width={800} height={600}>
                <ZoomableGroup zoom={1}>>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseEnter={() => {
                                        const NAME = geo.properties.name;
                                        const state = data.find(o => o.AdminRegion2 === NAME);
                                        if(loading){
                                            setTooltipContent('Data is loading')
                                        }else{
                                            if (state){
                                                setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - ${state.Confirmed}</br>`);
                                            } else {
                                                setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - 0</br>`);
                                            }

                                        }
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

export default memo(CountyChart);
