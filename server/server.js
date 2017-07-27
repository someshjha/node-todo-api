const {ObjectId} = require('mongodb');


var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todo', (req, res) => {
    console.log(req.body);
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

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};