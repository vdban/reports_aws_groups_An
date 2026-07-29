import { createBrowserRouter } from 'react-router';
import { RootLayout, AdminGuard } from '@/RootLayout';
import { OverviewPage } from '@/pages/OverviewPage';
import { RoomsPage } from '@/pages/RoomsPage';
import { LogPage } from '@/pages/LogPage';
import { UsersPage } from '@/pages/UsersPage';
import { PowerPage } from '@/pages/PowerPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: OverviewPage },
      { path: 'rooms', Component: RoomsPage },
      {
        path: 'log',
        element: (
          <AdminGuard>
            <LogPage />
          </AdminGuard>
        ),
      },
      {
        path: 'users',
        element: (
          <AdminGuard>
            <UsersPage />
          </AdminGuard>
        ),
      },
      { path: 'power', Component: PowerPage },
    ],
  },
]);
