const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5978c8bfe6ed9bac5df6836111';

// if(!ObjectId.isValid(id)) {
//     console.log('ID is not valid');
// } 

var userId = '5978a5387826ad9ceed4a6a0';

// Todo.find({
//     _id: id
// }).then((todos) =>{
//     console.log('Todos', todos);
// }, (e)=>{
//     console.log(e);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) =>{
//     console.log('Todo', todo);
// }, (e)=>{
//     console.log(e);
// });

// Todo.findById(id).then((todo) =>{
//     if(!todo) {
//         return console.log(`Id : ${id} not found.`);
//     }
//     console.log('Todo find by Id', todo);
// }).catch((e) => {
//     console.log(e);
// });

User.findById(userId).then((user) => {
    if(!user) {
        return console.log(`UserId: ${userId} not found.` );
    }
    console.log('User find by Id', JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});