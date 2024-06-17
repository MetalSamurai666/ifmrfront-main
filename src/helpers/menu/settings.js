const settings = [
  {
    path: 'citizen',
    name: 'citizen',
    component: () => import('@/views/settings/citizen.vue'),
    meta: {
      title: 'Fuqarolik',
      icon: 'list',
      api: 'api/citizen',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'nationality',
    name: 'nationality',
    component: () => import('@/views/settings/nationality.vue'),
    meta: {
      title: 'Millat',
      icon: 'folderOpened',
      api: 'api/nationality',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'region',
    name: 'region',
    component: () => import('@/views/settings/region.vue'),
    meta: {
      title: 'Viloyat',
      icon: 'location',
      api: 'api/region',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'city',
    name: 'city',
    component: () => import('@/views/settings/city.vue'),
    meta: {
      title: 'Shahar/tuman',
      icon: 'officeBuilding',
      api: 'api/city',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'year',
    name: 'year',
    component: () => import('@/views/settings/year.vue'),
    meta: {
      title: 'O`quv yili',
      icon: 'calendar',
      api: 'api/year',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'field',
    name: 'field',
    component: () => import('@/views/settings/field.vue'),
    meta: {
      title: 'Ta`lim sohalari',
      group: 'study',
      icon: 'school',
      api: 'api/field',
      access: ['admin']
    }
  },
  {
    path: 'language',
    name: 'language',
    component: () => import('@/views/settings/language.vue'),
    meta: {
      title: 'Imtihon topshirish tili',
      icon: 'reading',
      api: 'api/language',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'subject',
    name: 'subject',
    component: () => import('@/views/settings/subject.vue'),
    meta: {
      title: 'Fanlar',
      icon: 'collection',
      api: 'api/subject',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'grade',
    name: 'grade',
    component: () => import('@/views/settings/grade.vue'),
    meta: {
      title: 'Ta`lim darajasi',
      icon: 'briefcase',
      api: 'api/grade',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'gradeSertificate',
    name: 'gradeSertificate',
    component: () => import('@/views/settings/gradeSertificate.vue'),
    meta: {
      title: 'Sertifikatlari',
      icon: 'document-checked',
      api: 'api/gradeSertificate',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'disability',
    name: 'disability',
    component: () => import('@/views/settings/disability.vue'),
    meta: {
      title: 'Imkoniyati cheklanganlik',
      icon: 'postcard',
      api: 'api/disability',
      group: 'settings',
      access: ['admin']
    }
  },
  {
    path: 'testarea',
    name: 'testarea',
    component: () => import('@/views/settings/testarea.vue'),
    meta: {
      title: 'Imtihon hududlar',
      icon: 'tickets',
      api: 'api/testarea',
      group: 'settings',
      access: ['admin']
    }
  }
]

export default settings
