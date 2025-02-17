import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import TaskService from '../../services/taskService';

const EditTaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef(null);

  const [task, setTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRedirect(params.get('redirect') || '');

    const fetchTask = async () => {
      const response = await TaskService.fetchTaskById(id);
      if (response?.success) {
        setTask(response.data);
        setLoading(false);
      } else {
        setError(response?.message);
        setLoading(false);
      }
    };
    fetchTask();
  }, [id, location]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await TaskService.updateTask(id, task);
    if (response?.success) {
      navigate(`/${redirect}`);
    } else {
      setError(response?.message);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" marginTop="50px">
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          value={task.title}
          onChange={handleChange}
          inputRef={titleRef}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="description"
          label="Description"
          value={task.description}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Task
        </Button>
      </form>
    </Container>
  );
};

export default EditTaskForm;
