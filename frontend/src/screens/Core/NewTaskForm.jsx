import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import TaskService from "../../services/taskService"; // Ensure the correct path

const NewTaskForm = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "" });
  const [loading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TaskService.createTask(task);
      navigate("/");
    } catch (error) {
      setError(error.message);
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
        Create New Task
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
          Add
        </Button>
      </form>
    </Container>
  );
};

export default NewTaskForm;
