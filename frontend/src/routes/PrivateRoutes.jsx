import PrivateRoute from '../components/PrivateRoute';
import Tasks from '../screens/Core/Tasks';
import NewTaskForm from '../screens/Core/NewTaskForm';
import EditTaskForm from '../screens/Core/EditTaskForm';
import UserProfile from '../screens/Core/UserProfile';
import Dashboard from '../screens/Core/Dashboard';
import Logout from '../screens/Auth/Logout';

const privateRoutes = [
  {
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <Tasks /> },
      { path: 'tasks/add', element: <NewTaskForm /> },
      { path: 'tasks/:id/edit', element: <EditTaskForm /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'logout', element: <Logout /> },
    ],
  },
];

export default privateRoutes;
