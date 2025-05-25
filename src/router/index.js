import { Router } from '@vaadin/router';

export const initRouter = (outlet) => {
  const router = new Router(outlet);
  router.setRoutes([
  {
    path: '/',
    redirect: '/employees'
  },
  {
    path: '/employees',
    component: 'employee-list-view',
    action: () => import('../views/list-view.js')
  },
  {
    path: '/employees/new',
    component: 'employee-create-view',
    action: () => import('../views/create-view.js')
  },
  {
    path: '/employees/:id/edit',
    component: 'employee-edit-view',
    action: () => import('../views/edit-view.js')
  },
  {
    path: '(.*)',
    component: 'not-found-view',
    action: () => import('../views/not-found-view.js')
  }
]);
};

