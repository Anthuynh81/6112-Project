import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

function IndividualVaccineBarChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:5000/Vaccine").then((response) =>{
            setData(response.data)
        });
    }, []);

    const labels = ['Pfizer', 'Moderna', 'Johnson & Johnson'];


    let datapoints = [data[0].Pfizer, data[0].Moderna, data[0].JohnsonJohnson]

    const data1 = {
        labels,
        datasets: [
            {
                label: 'Vaccination',
                data: datapoints,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };


    return (
        <div>
            <h2>Bar Chart</h2>
            <Bar data={data1} />
        </div>
    );
}

export default IndividualVaccineBarChart;