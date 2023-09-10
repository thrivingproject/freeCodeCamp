// index.js
// where your node app starts
const port = 8000

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});


// Return a JSON object with a unix timestamp from request param
app.get('/api/:date', (req, res) => {

    let date = isNaN(Date.parse(req.params.date))
        ? Number(req.params.date)
        : Date.parse(req.params.date)

    res.json(date
        ? {
            unix: date,
            utc: new Date(date).toUTCString()
        }
        : { error: "Invalid Date" }
    )
})

app.get('/api', (req, res) => {
    let date = new Date()
    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    })
})


// listen for requests :)
var listener = app.listen(port, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
