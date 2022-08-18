/* Basic Node and Express */
require('dotenv').config()
var bodyParser = require('body-parser')
let express = require('express');
let app = express();

console.log('Server is running')

// Implement Root-level middleware logger, chain a body-parser
app.use((req, res, next) => {
    let log = req.method + ' ' + req.path + ' - ' + req.ip
    console.log(log)
    next();
}, bodyParser.urlencoded({
    extended: false
}))

// Serve an HTML file
app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

// Serve JSON on a specific route
app.get('/json', (req, res) => {
    let message = 'Hello json'
    // Use .env file
    if (process.env.MESSAGE_STYLE == 'uppercase' )message = message.toUpperCase()

    // Respond with .env dependant message
    res.json({
        message: message 
    })
})

// Get query parameter input from the client
app.route('/name')
    .get((req, res) => {
        let name = [req.query.first, req.query.last].join(' ')
        res.json({
            name: name
        })
    })
    // Get data from POST requests
    .post((req, res) => {
        let name = [req.body.first, req.body.last].join(' ')
        res.json({
            name: name
        })
    })

// Chain middleware to create a time server
app.get('/now', (req, res, next) => {
    req.time = new Date().toString() 
    next()
}, (req, res) => {
    res.json({time: req.time})
})

// Serve static assets
app.use('/public', express.static(__dirname + '/public'))

// Get route parameter input from the client
app.get('/:word/echo', (req, res) => res.json({echo: req.params.word}))

module.exports = app;
