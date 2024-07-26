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
  },
  {
    path: 'center',
    name: 'centers',
    component: () => import('@/views/dashboard/centerList.vue'),
    meta: {
      title: 'Центры',
      group: 'centers',
      icon: 'reading'
    }
  },
  {
    path: 'center-settings',
    name: 'center-settings',
    component: () => import('@/views/dashboard/centerSettings.vue'),
    meta: {
      title: 'Настройки',
      group: 'centers',
      icon: 'setting'
    },
    children: [
      {
        path: 'room',
        name: 'room',
        component: () => import('@/views/dashboard/roomList.vue'),
        meta: {
          title: 'Тип помещений',
          group: 'centers',
          icon: 'office-building'
        }
      },
      {
        path: 'storage',
        name: 'storage',
        component: () => import('@/views/dashboard/storageList.vue'),
        meta: {
          title: 'Тип хранения',
          group: 'centers',
          icon: 'files'
        }
      },
      {
        path: 'safe',
        name: 'safe',
        component: () => import('@/views/dashboard/safeList.vue'),
        meta: {
          title: 'Тип безопасности',
          group: 'centers',
          icon: 'warn-triangle-filled'
        }
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/dashboard/serviceList.vue'),
        meta: {
          title: 'Тип услуг',
          group: 'centers',
          icon: 'memo'
        }
      },
      {
        path: 'spec',
        name: 'spec',
        component: () => import('@/views/dashboard/specList.vue'),
        meta: {
          title: 'Специализация',
          group: 'centers',
          icon: 'list'
        }
      },
      {
        path: 'connect',
        name: 'connect',
        component: () => import('@/views/dashboard/connectList.vue'),
        meta: {
          title: 'Транспортная свзяь',
          group: 'centers',
          icon: 'van'
        }
      },
      {
        path: 'classification',
        name: 'classification',
        component: () => import('@/views/dashboard/classificationList.vue'),
        meta: {
          title: 'Классификация',
          group: 'centers',
          icon: 'collection'
        }
      },
      {
        path: 'type',
        name: 'type',
        component: () => import('@/views/dashboard/typeList.vue'),
        meta: {
          title: 'Тип склада',
          group: 'centers',
          icon: 'school'
        }
      }
    ]
  }
]

export default menu
