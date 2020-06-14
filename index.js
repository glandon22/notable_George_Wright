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
                    "id": "12",
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

app.post('/appointment', function(req, res) {
    const doctor = req.body.doctorID;
    const appointment = req.body.appointment;
    const date = appointment.date;
    if (!doctor || !appointments[doctor]) {
        res.status(400).send("Please include a valid doctorID with the request.");
        return;
    }
    else if (parseInt(appointment.time) % 15 !== 0) {
        res.status(400).send("Please include a valid appointment time. Appointment times begin at 9 AM in 15 minute increments, ex. 0915.");
        return;
    }
    else if (!appointment.firstName) {
        res.status(400).send("Please include a valid patient first name.");
        return;
    }
    else if (!appointment.lastName) {
        res.status(400).send("Please include a valid patient last name.");
        return;
    }
    else if (appointment.type != "New Patient" && appointment.type != "Follow-Up") {
        res.status(400).send("Please include a valid patient type, New Patient or Follow-Up.");
        return;
    }

    if (!appointments[doctor][date]) {
        appointments[doctor][date] = {};
    }
    
    if (!appointments[doctor][date][appointment.time]) {
        appointments[doctor][date][appointment.time] = [];
    }      
    
    if (appointments[doctor][date][appointment.time].length >= 3) {
        res.status(400).send("This doctor already has three appoints for this date and time."); 
        return;
    }

    appointments[doctor][date][appointment.time].push({
        "id": appointment.id,
        "firstName": appointment.firstName,
        "lastName": appointment.lastName,
        "type": appointment.type
    });

    res.status(200).send("Appointment created successfully");
    console.log(JSON.stringify(appointments, null, 4));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});