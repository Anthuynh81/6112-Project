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
    database: 'sprint0'
});

app.get('/Data', (req, res) => {
    con.query('SELECT * FROM testTable', (err, rows) => {
        if(err) throw err;
        const table = [];
        rows.forEach( (row) => {
            const tableRow = {
                emplId: row.EmplID,
                firstName: row.FirstName,
                lastName: row.LastName,
                phoneNum: row.Phone,
                age: row.Age
            }
            table.push(tableRow)
        })
        res.send(table);
    })
})

module.exports = router;
