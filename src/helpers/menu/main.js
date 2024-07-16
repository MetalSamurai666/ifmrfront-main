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
    path: 'newscategory',
    name: 'newscategorylist',
    component: () => import('@/views/dashboard/newsCategory.vue'),
    meta: {
      title: 'Категория',
      group: 'news',
      icon: 'list'
    }
  },
  {
    path: 'news',
    name: 'newslist',
    component: () => import('@/views/dashboard/news.vue'),
    meta: {
      title: 'Новости',
      group: 'news',
      icon: 'memo'
    }
  },
  {
    path: 'publisher',
    name: 'publisher',
    component: () => import('@/views/dashboard/publisher.vue'),
    meta: {
      title: 'Публикации',
      group: 'publisher',
      icon: 'memo'
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
  },
  {
    path: 'doccategory',
    name: 'doccategory',
    component: () => import('@/views/dashboard/doccategory.vue'),
    meta: {
      title: 'Тип документов',
      group: 'document',
      icon: 'document'
    }
  },
  {
    path: 'document',
    name: 'document',
    component: () => import('@/views/dashboard/document.vue'),
    meta: {
      title: 'Док/законы',
      group: 'document',
      icon: 'reading'
    }
  }
]

export default menu
