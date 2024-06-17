const menu = [
  {
    path: 'category',
    name: 'category',
    component: () => import('@/views/dashboard/category.vue'),
    meta: {
      title: 'Категория',
      group: 'publisher',
      icon: 'list'
    }
  },
  {
    path: 'page',
    name: 'page',
    component: () => import('@/views/dashboard/page.vue'),
    meta: {
      title: 'Страницы',
      group: 'content',
      icon: 'document'
    }
  }
]

export default menu
