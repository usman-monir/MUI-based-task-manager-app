import React, { useState } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskService from '../services/taskService';

const Task = ({ task, onDeleteTask }) => {
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleDeleteTask = async () => {
    try {
      onDeleteTask(task._id);
    } catch (error) {
      console.error(`Failed to delete task with ID ${task._id}:`, error);
    }
  };

  const handleEditClick = () => {
    navigate(`/tasks/${task._id}/edit`);
  };

  const toggleCompletion = async () => {
    try {
      const updatedTask = { ...task, completed: !isCompleted };
      await TaskService.updateTask(task._id, updatedTask);
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error(`Failed to update task with ID ${task._id}:`, error);
    }
  };

  return (
    <Card
      key={task._id}
      sx={{
        maxWidth: 400,
        marginBottom: 2,
        backgroundColor: isCompleted ? 'grey.300' : 'white',
        opacity: isCompleted ? .5 : 1,
        transition: 'all 0.5s',
        '&:hover': {
          backgroundColor: 'grey.100',
          cursor: 'pointer',
        },
      }}
      onClick={toggleCompletion}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <br />
        <hr />
        <Button variant="contained" color="secondary" onClick={handleEditClick}>
          Edit
        </Button>
        <br />
        <br />
        <Button variant="contained" color="warning" onClick={handleDeleteTask}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default Task;
