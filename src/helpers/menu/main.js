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
    path: 'publisher',
    name: 'publisher',
    component: () => import('@/views/dashboard/publisher.vue'),
    meta: {
      title: 'Публикации',
      group: 'publisher',
      icon: 'list'
    }
  },
  {
    path: 'slider',
    name: 'slider',
    component: () => import('@/views/dashboard/slider.vue'),
    meta: {
      title: 'Слайдер',
      group: 'content',
      icon: 'picture'
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
  },
  {
    path: 'link',
    name: 'link',
    component: () => import('@/views/dashboard/link.vue'),
    meta: {
      title: 'Полезные ссылки',
      group: 'other',
      icon: 'link'
    }
  },
  {
    path: 'partner',
    name: 'partner',
    component: () => import('@/views/dashboard/partner.vue'),
    meta: {
      title: 'Партнеры',
      group: 'other',
      icon: 'suitcase'
    }
  }
]

export default menu
