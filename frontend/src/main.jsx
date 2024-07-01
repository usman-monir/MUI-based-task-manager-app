import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements,  RouterProvider, Route } from 'react-router-dom';
import App from './App';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import PrivateRoute from './components/PrivateRoute';
import Tasks from './screens/Core/Tasks';
import NewTaskForm from './screens/Core/NewTaskForm';
import EditTaskForm from './screens/Core/EditTaskForm';
import NotFound from "./screens/Util/NotFound";

// font styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="login" element={<LoginScreen />} />
      <Route path="register" element={<RegisterScreen />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Tasks />} />
        <Route path="tasks/add" element={<NewTaskForm />} />
        <Route path="tasks/:id/edit" element={<EditTaskForm />} />
      </Route>
      <Route path="*" element={<NotFound/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
