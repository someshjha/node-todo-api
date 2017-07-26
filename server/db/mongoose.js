var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minLength: 1,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }

// });

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

// var todoNew = new Todo({
//    text: ' Edit this video '
// });

// todoNew.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minLength: 1,
//         trim: true
//     }

// });

// var newUser = new User({
//     email: 'somvid@gmail.com'   
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save user', err);
// });