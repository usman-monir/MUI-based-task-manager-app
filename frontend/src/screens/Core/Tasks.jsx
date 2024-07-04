import { useEffect, useMemo, useCallback, useReducer } from "react";
import { Typography, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TaskService from "../../services/taskService";
import Task from "../../components/Task";

const initialState = {
  tasks: [],
  errorMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload, errorMessage: "" };
    case "SET_ERROR":
      return { ...state, errorMessage: action.payload };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    default:
      return state;
  }
};

const Tasks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await TaskService.fetchTasks();
    if (response?.success) {
      dispatch({ type: "SET_TASKS", payload: response.data });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response?.message || "Failed to fetch tasks",
      });
    }
  };

  const handleDeleteTask = useCallback(async (taskId) => {
    const response = await TaskService.deleteTask(taskId);
    if (response?.success) {
      dispatch({ type: "DELETE_TASK", payload: taskId });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: response?.message || "failed to delete task",
      });
    }
  }, []);

  const handleCreateTask = useCallback(() => {
    navigate("/tasks/add");
  }, [navigate]);

  const renderTasks = useMemo(() => {
    if (state?.tasks?.length === 0) {
      return (
        <Typography variant="body1">
          No tasks yet. Create a new task!
        </Typography>
      );
    }
    return state.tasks?.map((task) => (
      <Task task={task} key={task._id} onDeleteTask={handleDeleteTask} />
    ));
  }, [state.tasks, handleDeleteTask]);

  return (
    <div>
      {state.errorMessage && (
        <Alert severity="error">{state.errorMessage}</Alert>
      )}
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      <Button
        sx={{ my: 3 }}
        variant="contained"
        color="primary"
        onClick={handleCreateTask}
      >
        Create New Task
      </Button>
      {renderTasks}
    </div>
  );
};

export default Tasks;
