// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //es6 destructuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongoDb server');
    }
    
    console.log('Connected to MongoDb server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'})
    //     .then((result) => {
    //         console.log(result);n
    //     }, (err) => {
    //         console.log('Unable to delete', err);
    // });


    // deleteOne

    // db.collection('Todos').deleteOne({text: 'Eat Lunch'})
    //     .then((result) => {
    //          console.log(result);
        
    // }, (err) => {
    //          console.log('Unable to delete', err);
    // });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to find record', err);
    // });

    // db.collection('Users').deleteMany({name: 'Somesh'}).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log('Unable to delete docs', err);
    // });

    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5977c43167b5d1aa8becf63e')
    // }).then((res) => {
    //     console.log(res);
    // }, (err) => {
    //     console.log(err);
    // });

    //db.close();
    
});


