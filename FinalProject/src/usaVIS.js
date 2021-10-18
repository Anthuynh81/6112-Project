import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { json } from "d3-fetch";

const geoUrl = "https://gist.githubusercontent.com/mheydt/29eec003a4c0af362d7a/raw/d27d143bd75626647108fc514d8697e0814bf74b/us-states.json";

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

const MapChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        json("/unemployment-by-county-2017.csv").then(counties => {
            setData(counties);
        });
    }, []);

    return (
        <>
            <ComposableMap projection="geoAlbersUsa" width={1000} height={800}>
                <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo => {
                                const cur = data.find(s => s.id === geo.id);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={colorScale(cur ? cur.unemployment_rate : "#EEE")}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default MapChart;
