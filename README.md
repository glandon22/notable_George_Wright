# Notable Coding Challenge

## Getting Started

1. Download this GitHub repo.
2. CD into the repo
3. run `npm install`
4. To start the service, run `node index.js`

### Routes

1. GET /doctors

This will return an array of objects containing all current doctors.

```JSON

ex. [
        {"id":1,"firstName":"John","lastName":"Doe"},
        {"id":2,"firstName":"Jane","lastName":"Doe"},
        {"id":3,"firstName":"Alice","lastName":"Robbins"},
        {"id":4,"firstName":"Sam","lastName":"Smith"}
    ]

```
2. GET /appointments

This will return an object containing all the appointments for a doctor on a given day.

ex. {"0900":[{"id":"12","firstName":"George","lastName":"Wright","type":"New Patient"}]}

3. POST /appointment 

This route allows you to add a new appointment to an existing doctor. 

It accepts a payload in the follow structure:

```JSON
{
"doctorID" : 2,
    "appointment" : {
        "id": 1,
        "firstName": "Margaret",
        "lastName":"Robbins",
        "time": "0930",
        "date": "07152020",
        "type": "Follow-Up"
    }
}
```

4. DELETE  /appointment

This will delete an existing appointment from a doctor's schedule. It accepts a payload in the following structure:

```JSON

{
    "doctor" : 2,
    "id": 2,
	"time": "0930",
	"date": "07152020",
	"type": "Follow-Up"
}
```


## Authors

* **George Wright** 