const addZero = (v) => (v < 10 ? `0${v}` : `${v}`)

const convertDate = (value = new Date(), type = null) => {
  const date = new Date(value)
  return type == 'full'
    ? `${addZero(date.getHours())}:${addZero(date.getMinutes())} ${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
    : `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${addZero(date.getFullYear())}`
}

const months = [
  { value: 0, name: 'Январь' },
  { value: 1, name: 'Февраль' },
  { value: 2, name: 'Март' },
  { value: 3, name: 'Апрель' },
  { value: 4, name: 'Май' },
  { value: 5, name: 'Июнь' },
  { value: 6, name: 'Июль' },
  { value: 7, name: 'Август' },
  { value: 8, name: 'Сентябрь' },
  { value: 9, name: 'Октябрь' },
  { value: 10, name: 'Ноябрь' },
  { value: 11, name: 'Декабрь' }
]

export { convertDate, months }
