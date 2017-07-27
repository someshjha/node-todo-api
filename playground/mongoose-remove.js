const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((res) => {
//     console.log(res);
// });


Todo.findOneAndRemove({_id: '5979600167b5d1aa8bed360b'}).then((doc) => {

});

Todo.findByIdAndRemove('5979600167b5d1aa8bed360b').then((todo) => {
    console.log(todo)
});

