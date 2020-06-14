const express = require('express');
const moment = require('moment');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5001;

let doctors = [
    {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe"
    },
    {
        "id": 2,
        "firstName": "Jane",
        "lastName": "Doe"
    },
    {
        "id": 3,
        "firstName": "Alice",
        "lastName": "Robbins"
    },
    {
        "id": 4,
        "firstName": "Sam",
        "lastName": "Smith"
    }
];

let appointments = {
    "1": {
        "09222020": {
            "0900": [
                {
                    "id": "321-4657-54323",
                    "firstName": "George",
                    "lastName": "Wright",
                    "type": "New Patient"
                }
            ]
        }
    },
    "2": {

    },
    "3": {

    },
    "4": {

    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/doctors', function(req, res) {
    res.status(200).send(JSON.stringify(doctors));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });