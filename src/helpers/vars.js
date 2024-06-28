const blurRule = [
  {
    required: true,
    message: 'Заполните поля',
    trigger: 'blur'
  }
]

const changeRule = [
  {
    required: true,
    message: 'Заполните поля',
    trigger: 'change'
  }
]

const schoolType = [
  {
    value: 1,
    label: 'Madrasa'
  },
  {
    value: 2,
    label: 'OTM'
  }
]

const blockType = [
  {
    value: 1,
    label: 'Test'
  },
  {
    value: 2,
    label: 'Ijodiy imtihon'
  },
  {
    value: 3,
    label: 'Chet tili'
  },
]



export { blurRule, changeRule, schoolType, blockType }
