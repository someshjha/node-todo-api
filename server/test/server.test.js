const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
     _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});


describe('POST /todo', () =>{
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todo')
            .send({text})
            .expect(201)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));

            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todo')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done)
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID()
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 400 for non object Id', (done) =>{
        request(app)
            .get(`/todos/123`)
            .expect(400)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.findById(hexId).then((todos) => {
                    expect(null).toNotExist();
                    done();
                }).catch((e) => done(e));

            }); 
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID()
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 400 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/233444`)
            .expect(400)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    var text = 'Test todo patch';
    it('should update the todo', (done) =>{
        var hexId = todos[0]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text,
            completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, 
                completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toNotExist();

            })
            .end(done());
    });
});