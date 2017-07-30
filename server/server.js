require('./config/config');

const _ = require('lodash')
const {ObjectId} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.status(201).send(doc)
    }, (e) => {
        console.log('Unable to create todo', e);
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        });
    }, (e) =>{
        res.status(400).send(e);
    })
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    var {id} = req.params;
    if(!ObjectId.isValid(id)){
        return res.status(400).send({error: `Id: ${id} is not valid`});
    }

    Todo.findById(id).then((todo) => {
        if(!todo) {
            res.status(404).send({error: 'Todo not found.'});
        }
        res.status(200).send({todo});
    });

}, (e) => {
    res.status(400).send(e);
});

app.delete('/todos/:id', (req, res) => {
    var {id} = req.params;
    if(!ObjectId.isValid(id)){
        return res.status(400).send({error: `Id: ${id} is not valid`});
    }

    Todo.findByIdAndRemove(id).then((todo)=> {
        if(!todo) {
            res.status(404).send({error: 'Todo not found.'});
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.patch('/todos/:id', (req, res) => {
    var {id} = req.params;
    var body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectId.isValid(id)){
        return res.status(400).send({error: `Id: ${id} is not valid`});
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send({error: `Id: ${id} is not found`});
        }

        res.send({todo});

    }, (e) => {
        res.status(400).send();
    })

});

// POST /user
app.post('/user', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.status(201).header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me',authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});



module.exports = {app};