const express = require('express');
const { Task } = require('../models');

const app = express();
app.use(express.json());


app.post('/tasks', async (req, res) => {
    const { title, completed } = req.body;
    const newTask = await Task.create({ title, completed });
    res.status(201).json(newTask);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
        task.title = title;
        task.completed = completed;
        await task.save();
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
        await task.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
