import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let data = [
    {
        id: 1,
        title: 'Task 1',
        description: 'This is a task 1',
    },
    {
        id: 2,
        title: 'Task 2',
        description: 'This is a task 2',
    }
];

app.get('/api/tasks', (req, res) => {
    res.json(data);
});

app.get('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = data.find(task => task.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        id: data.length + 1,
        title,
        description,
    };
    data.push(newTask);
    res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const task = data.find(task => task.id === id);
    if (task) {
        task.title = title || task.title;
        task.description = description || task.description;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = data.find(task => task.id === id);
    if (task) {
        data = data.filter(task => task.id !== id);
        res.sendStatus(204);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});