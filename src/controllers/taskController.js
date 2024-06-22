import Task from '../models/taskModel.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await Task.findByPk(id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description } = req.body;
        const task = await Task.findByPk(id);
        if (task) {
            await task.update({ title, description });
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await Task.findByPk(id);
        if (task) {
            await task.destroy();
            res.sendStatus(204);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
