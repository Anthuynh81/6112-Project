import React, {memo, useEffect, useState} from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import Axios from 'axios';
import ReactTooltip from "react-tooltip";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";
const startDate = new Date(2020,0,23);

const CountyChart = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(startDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }));

    if (props.date !== date){
        setLoading(true);
        setDate(props.date);
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/County", { params: {date: date}}).then((response) =>{
            setData(response.data)
            setLoading(false);
            });
    }, [date]);

    if(props.map === "County"){
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
                                                props.setTooltipContent('Data is loading')
                                            }else{
                                                if (state){
                                                    props.setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - ${state.Confirmed}</br>`);
                                                } else {
                                                    props.setTooltipContent(`${geo.properties.name}</br>
                                                        Confirmed - 0</br>`);
                                                }

                                            }
                                        }}
                                        onMouseLeave={() => {
                                            props.setTooltipContent("");
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
                <ReactTooltip html={true}>{props.toolTip}</ReactTooltip>
            </>
        );
    }else{
        return null;
    }

};

export default memo(CountyChart);
