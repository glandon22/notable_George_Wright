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

app.get('/appointments', function(req, res) {
    const doctor = req.query.doctor;
    const date = req.query.appointmentDate;

    if (!doctor || !date) {
        res.status(400).send("Please include a valid doctor ID and date.");
        return;
    }

    else if (!appointments[doctor]) {
        res.status(400).send("The following doctor does exist.");
        return;
    }

    else if (!appointments[doctor][date]) {
        res.status(400).send("The following doctor does not have any appointments scheduled for that day.");
    }

    res.status(200).send(JSON.stringify(appointments[doctor][date]));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });