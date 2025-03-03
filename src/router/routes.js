
const routes = [
  { path: '/', redirect: { name: 'Main' } },
  {
    path: '',
    component:  () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        name: 'Main',
        path: '',
        component: () => import('src/pages/MainPage'),
        meta: {
          title: 'BUSIDO Avto'
        },
      },
      {
        path: 'cars',
        component:  () => import('src/layouts/MainLayoutCar.vue'),
        children: [
          {
            name: 'Car',
            path: ':carId',
            component: () => import('src/pages/PageCar.vue'),
            meta: {
              title: 'BUSIDO Avto'
            },
          },
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
]

export default routes
