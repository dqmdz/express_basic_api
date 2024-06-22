import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, beforeEach } from 'mocha';
import app from '../src/app.js';
import Task from '../src/models/taskModel.js';
import { sequelize } from '../src/config/database.js';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Tasks API', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true }); // Sincroniza todos los modelos y elimina datos previos
    });

    describe('GET /api/tasks', () => {
        it('should get all tasks', async () => {
            await Task.bulkCreate([
                { title: 'Task 1', description: 'This is a task 1' },
                { title: 'Task 2', description: 'This is a task 2' }
            ]);

            const res = await chai.request(app).get('/api/tasks');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(2);
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('should get a task by id', async () => {
            const task = await Task.create({ title: 'Task 1', description: 'This is a task 1' });

            const res = await chai.request(app).get(`/api/tasks/${task.id}`);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('id', task.id);
        });

        it('should return 404 if task not found', async () => {
            const res = await chai.request(app).get('/api/tasks/999');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'Task not found');
        });
    });

    describe('POST /api/tasks', () => {
        it('should create a new task', async () => {
            const newTask = { title: 'Task 3', description: 'This is a task 3' };

            const res = await chai.request(app).post('/api/tasks').send(newTask);
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title', 'Task 3');
            expect(res.body).to.have.property('description', 'This is a task 3');
        });
    });

    describe('PUT /api/tasks/:id', () => {
        it('should update an existing task', async () => {
            const task = await Task.create({ title: 'Task 1', description: 'This is a task 1' });
            const updatedTask = { title: 'Updated Task 1', description: 'Updated description' };

            const res = await chai.request(app).put(`/api/tasks/${task.id}`).send(updatedTask);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('title', 'Updated Task 1');
            expect(res.body).to.have.property('description', 'Updated description');
        });

        it('should return 404 if task not found', async () => {
            const updatedTask = { title: 'Updated Task', description: 'Updated description' };

            const res = await chai.request(app).put('/api/tasks/999').send(updatedTask);
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'Task not found');
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        it('should delete an existing task', async () => {
            const task = await Task.create({ title: 'Task 1', description: 'This is a task 1' });

            const res = await chai.request(app).delete(`/api/tasks/${task.id}`);
            expect(res).to.have.status(204);
        });

        it('should return 404 if task not found', async () => {
            const res = await chai.request(app).delete('/api/tasks/999');
            expect(res).to.have.status(404);
            expect(res.body).to.have.property('message', 'Task not found');
        });
    });
});
