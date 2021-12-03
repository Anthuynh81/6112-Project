import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import Axios from 'axios';

function IndividualVaccineBarChart() {
    const [data, setData] = useState({
        Entity: "Empty",
        Code: "Empty",
        Day: "0",
        Pfizer: "0",
        Moderna: "0",
        JohnsonJohnson: "0"
    });

    useEffect(() => {
        Axios.get("http://localhost:5000/Vaccine").then((response) =>{
            setData(response.data)
            console.log("Vaccine Information")
            console.log(response.data)
        });
    }, []);

    const labels = ['Pfizer', 'Moderna', 'Johnson & Johnson'];


    const datapoints = [data.Pfizer, data.Moderna, data.JohnsonJohnson]

    const data1 = {
        labels,
        datasets: [
            {
                label: 'Vaccination',
                data: datapoints,
                backgroundColor: 'rgba(75,192,192,1)',
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