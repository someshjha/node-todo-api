const {MongoClient, ObjectID} = require('mongodb'); //es6 destructuring


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to mongoDb server');
    }
    
    console.log('Connected to MongoDb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5977b98d67b5d1aa8becf1fc')
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

    // db.collection('Users').findOneAndUpdate({
    //     _id: new ObjectID('5977b5cf45097f8c4253a9e3')
    // }, {
    //     $set: {
    //         name: 'Somesh'
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5977b5cf45097f8c4253a9e3')
    }, {
        $set: {
            name: 'Suga'
        },
    
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });


    //db.close();
    
});



