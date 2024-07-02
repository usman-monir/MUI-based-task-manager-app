import PrivateRoute from '../components/PrivateRoute';
import Tasks from '../screens/Core/Tasks';
import NewTaskForm from '../screens/Core/NewTaskForm';
import EditTaskForm from '../screens/Core/EditTaskForm';

const privateRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <Tasks /> },
      { path: 'tasks/add', element: <NewTaskForm /> },
      { path: 'tasks/:id/edit', element: <EditTaskForm /> },
    ],
  },
];

export default privateRoutes;
