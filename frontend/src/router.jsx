import { createBrowserRouter } from 'react-router-dom';
import privateRoutes from './routes/PrivateRoutes';
import publicRoutes from './routes/PublicRoutes';

const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
]);

export default router;
