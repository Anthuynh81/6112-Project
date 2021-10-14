const express = require('express')
const app = express()
const supertest = require("supertest");
const axios = require('axios');
const getValue = require('./exampleFunction');

var router = require('./routes/mySql');
const path = require("path");
const logger = require("morgan");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', router);

test("Get request", async () => {
    app.get('/test', async (req, res) => {
        res.json({message: 'pass!'})
    })

    await supertest(app).get("/test").expect(200)
})


jest.mock('axios');

it('Mock Value Test', async () => {
    axios.get.mockResolvedValue({
        data: [
            {
                userId: 1,
                id: 1,
                title: 'First Value'
            },
            {
                userId: 1,
                id: 2,
                title: 'Second Value'
            }
        ]
    });

    const title = await getValue();
    expect(title).toEqual('First Value');
});
