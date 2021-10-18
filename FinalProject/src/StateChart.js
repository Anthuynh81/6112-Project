import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Axios from 'axios';

const geoUrl = "https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json";
const StartDate = "01/21/2020";

const StateChart = ({ setTooltipContent }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get("http://localhost:5000/State").then((response) =>{
            setData(response.data.filter(o => o.Updated === StartDate));
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
                                        const state= data.find(o => o.AdminRegion1 === NAME);
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

export default memo(StateChart);
