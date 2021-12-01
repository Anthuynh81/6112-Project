const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors')
var router = express.Router();

const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
   console.log("Server is running on port " + port)
});

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'covid'
});

app.get('/USA', (req, res) => {
    if(req.query.date != null){
        con.query('SELECT * FROM usadata WHERE Updated = ?', [req.query.date], (err, rows) => {
            if(err) throw err;
            const table = [];
            rows.forEach( (row) => {
                const tableRow = {
                    ID: row.ID,
                    Updated: row.Updated,
                    Confirmed: row.Confirmed,
                    ConfirmedChange: row.ConfirmedChange,
                    Deaths: row.Deaths,
                    DeathsChanged: row.DeathsChanged,
                    Recovered: row.Recovered,
                    RecoveredChange: row.RecoveredChange,
                    Latitude: row.Latitude,
                    Longitude: row.Longitude,
                    Country_Region: row.Country_Region,
                    AdminRegion1: row.AdminRegion1,
                    AdminRegion2: row.AdminRegion2
                }
                table.push(tableRow)
            })
            res.send(table);
        })
    }else {
        con.query('SELECT * FROM usadata', (err, rows) => {
            if (err) throw err;
            const table = [];
            rows.forEach((row) => {
                const tableRow = {
                    ID: row.ID,
                    Updated: row.Updated,
                    Confirmed: row.Confirmed,
                    ConfirmedChange: row.ConfirmedChange,
                    Deaths: row.Deaths,
                    DeathsChanged: row.DeathsChanged,
                    Recovered: row.Recovered,
                    RecoveredChange: row.RecoveredChange,
                    Latitude: row.Latitude,
                    Longitude: row.Longitude,
                    Country_Region: row.Country_Region,
                    AdminRegion1: row.AdminRegion1,
                    AdminRegion2: row.AdminRegion2
                }
                table.push(tableRow)
            })
            res.send(table);
        })
    }
})

app.get('/State', (req, res) => {
    con.query('SELECT * FROM statedata WHERE Updated = ?', [req.query.date], (err, rows) => {
        if(err) throw err;
        const table = [];
        rows.forEach( (row) => {
            const tableRow = {
                ID: row.ID,
                Updated: row.Updated,
                Confirmed: row.Confirmed,
                ConfirmedChange: row.ConfirmedChange,
                Deaths: row.Deaths,
                DeathsChanged: row.DeathsChanged,
                Recovered: row.Recovered,
                RecoveredChange: row.RecoveredChange,
                Latitude: row.Latitude,
                Longitude: row.Longitude,
                Country_Region: row.Country_Region,
                AdminRegion1: row.AdminRegion1,
                AdminRegion2: row.AdminRegion2
            }
            table.push(tableRow)
        })
        res.send(table);
    })
})

app.get('/County', (req, res) => {
    con.query('SELECT * FROM countydata WHERE Updated = ?', [req.query.date], (err, rows) => {
        if(err) throw err;
        const table = [];
        rows.forEach( (row) => {
            const tableRow = {
                ID: row.ID,
                Updated: row.Updated,
                Confirmed: row.Confirmed,
                ConfirmedChange: row.ConfirmedChange,
                Deaths: row.Deaths,
                DeathsChanged: row.DeathsChanged,
                Recovered: row.Recovered,
                RecoveredChange: row.RecoveredChange,
                Latitude: row.Latitude,
                Longitude: row.Longitude,
                Country_Region: row.Country_Region,
                AdminRegion1: row.AdminRegion1,
                AdminRegion2: row.AdminRegion2
            }
            table.push(tableRow)
        })
        res.send(table);
    })
})

app.get('/Vaccine', (req, res) => {
    con.query('SELECT * FROM VACCINE WHERE CODE = "USA" AND DAY = (SELECT MAX(DAY) FROM VACCINE WHERE CODE = "USA")', (err, rows) => {
        if(err) throw err;
        const table = [];
        rows.forEach( (row) => {
            const tableRow = {
                Entity: row.Entity,
                Code: row.Code,
                Day: row.Day,
                Pfizer: row.Pfizer,
                Moderna: row.Moderna,
                JohnsonJohnson: row.JohnsonJohnson
            }
            table.push(tableRow)
        })
        console.log(table)
        res.send(table);
    })
})

module.exports = router;
