const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

app.use(morgan('common'));

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));

function getConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'twinships'
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/ships.html'))
});

app.get('/api/ships', (req, res) => {

    const connection = getConnection()

    const shipId = req.params.id
    const queryString = "SELECT * FROM ships"
    connection.query(queryString, [shipId], (err, rows, fields) => {
        if(err) {
            console.log("Failed to query for ships: " + err)
            res.sendStatus(500)
            return
        }
        console.log("We fetched ships successfully")
        res.json(rows)
    });
});

app.get('/api/ships/:id', (req, res) => {
    console.log("Fetching ship with id: " + req.params.id)

    const connection = getConnection()

    const shipId = req.params.id
    const queryString = "SELECT * FROM ships WHERE ship_id = ?"
    connection.query(queryString, [shipId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query for ship: " + err)
            res.sendStatus(500)
            return
        }
        console.log('We fetched ship successfully')
        res.json(rows)
    });
});

app.get('/api/new_ship', (req, res) => {
    console.log("Creating a ship")
    res.sendFile(path.join(__dirname + '/public/form.html'))
})

app.post('/api/ship_create', (req, res) => {
    console.log("Trying to create a new user...")
    const skibsNavn = req.body.create_skibsnavn
    const havneBy = req.body.create_havnebyen
    const kaldeSignal = req.body.create_kaldesignal
    const MMSI = req.body.create_MMSI
    const BRT = req.body.create_BRT
    const længde = req.body.create_længde
    const antalMennesker = req.body.create_antalmennesker
    const formål = req.body.create_formål

    const queryString = "INSERT INTO ships (ship_name, ship_home_port, ship_callsignal, ship_MMSI, ship_BRT, ship_length, ship_max_on_board, ship_purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    getConnection().query(queryString, [skibsNavn, havneBy, kaldeSignal, MMSI, BRT, længde, antalMennesker, formål], (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new ship: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted a new ship with id: ", results.insertedId)
        res.end()
    });
});

app.listen(3000, () => {
    console.log("Server is up and listening on port 3000")
});
