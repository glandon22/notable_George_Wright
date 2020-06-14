const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5001;

let doctors = require('./doctors');
let appointments = require('./appointments');

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

app.delete('/appointment', function(req, res) {
    const body = req.body;
    if (!appointments[body.doctor]) {
        res.status(400).send("Please include a valid doctorID with the request.");
        return;
    }

    else if (!appointments[body.doctor][body.date] || !appointments[body.doctor][body.date][body.time]) {
        res.status(400).send("This doctor does not have an appointment scheduled for this date and time.");
        return;
    }

    for (let i = 0; i < appointments[body.doctor][body.date][body.time].length; i++) {
        if (appointments[body.doctor][body.date][body.time][i].id == body.id) {
            appointments[body.doctor][body.date][body.time].splice(i, 1);
            res.status(200).send("The appointment was removed successfully.");
            return;
        }
    }

    res.status(400).send("No appointment with the corresponding ID was found.");
    return;
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});