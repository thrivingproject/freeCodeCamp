const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
    },
    logs: [Object]
})

userSchema.virtual('logsCount').get(function () {
    return this.logs.length
})

const User = mongoose.model('User', userSchema);


// Users
app.route('/api/users')
    .post((req, res) => {
        let user = new User({
            _id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            logs: []
        })
        user.save(error => {
            if (error) res.status(500).json({ error })
            else res.json({
                username: user.username,
                _id: user._id
            })
        })
    })
    .get((req, res) => {
        User.find()
            .select('_id username')
            .exec((error, users) => {
                if (error) res.status(500).json({ error })
                else res.json(users)
            })
    })


// Exercises
app.post('/api/users/:_id/exercises', (req, res, next) => {
    req.body.date = req.body.date ? new Date(req.body.date) : new Date()
    next()
}, (req, res) => {
    let { description, duration, date } = req.body, _id = req.params._id
    let newLog = {
        description,
        duration: Number(duration),
        date
    }
    User.findById(_id, (error, user) => {
        if (error) res.status(500).json({ error })
        else {
            user.logs.push(newLog)
            user.save(error => {
                if (error) res.status(500).json({ error })
                else {
                    res.json({
                        username: user.username,
                        _id: user._id,
                        description: user.logs.at(-1).description,
                        duration: user.logs.at(-1).duration,
                        date: user.logs.at(-1).date.toDateString(),
                    })
                }
            })
        }
    })
})


// Logs
app.get('/api/users/:_id/logs', (req, res, next) => {
    if (req.query.to) req.query.to = new Date(req.query.to)
    if (req.query.from) req.query.from = new Date(req.query.from)
    next()
}, (req, res) => {
    let { from, to, limit } = req.query, _id = req.params._id
    User.findById(_id, (error, user) => {
        if (error) res.status(500).json({ error })
        else {
            let logs = user.logs
            if (from) logs = logs.filter(log => log.date >= from)
            if (to) logs = logs.filter(log => log.date <= to)
            if (limit) logs = logs.slice(0, limit)
            logs = logs.map(log => {
                return {
                    ...log,
                    date: log.date.toDateString()
                };
            });
            res.json({
                username: user.username,
                count: user.logsCount,
                _id: user._id,
                log: logs
            })
        }
    })
})


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
