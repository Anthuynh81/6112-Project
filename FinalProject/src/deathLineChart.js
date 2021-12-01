import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import Axios from 'axios';

function DeathsLineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/USA").then((response) =>{
            setData(response.data)
            console.log(data)
        });
    }, []);

    const updatedColumn = (data) => data.map(x => x.Updated);
    const confirmedColumn = (data) => data.map(x => x.Deaths);

    const data1 = {
        labels: updatedColumn(data),
        datasets: [
            {
                label: 'Deaths Over Time',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: confirmedColumn(data)
            }
        ]
    };

    return (
        <div>
            <h2>Line Chart</h2>
            <Line data={data1} />
        </div>
    );
}

export default DeathsLineChart;