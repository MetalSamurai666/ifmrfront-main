export default [
  {
    name: 'id',
    label: 'ID'
  },
  {
    name: 'fullname',
    label: 'Ism-sharifi',
    type: 'union',
    select: ['lastname', 'name', 'surname'],
    width: 50
  },
  {
    name: 'phone',
    label: 'Telefon raqam'
  },
  {
    name: 'bdate',
    label: 'Tug`ilgan sana',
    type: 'date'
  },
  {
    name: 'gender',
    label: 'Jins',
    type: 'enum',
    value: {
      1: 'Erkak',
      2: 'Ayol'
    }
  },
  {
    name: 'school',
    label: 'Bilim yurti',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'field',
    label: 'Yo`nalish',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'year',
    label: 'O`quv yili',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'region',
    label: 'Viloyat',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'city',
    label: 'Shahar/Tuman',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'citizen',
    label: 'Fuqaroligi',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'nationality',
    label: 'Millati',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'address',
    label: 'Manzil'
  },
  {
    name: 'passport',
    label: 'Passport seriya/raqam',
    type: 'union',
    select: ['passportSeria', 'passportNumber']
  },
  {
    name: 'pnfl',
    label: 'JSHSHR'
  },
  {
    name: 'language',
    label: 'Ta`lim tili',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'testarea',
    label: 'Test hududi',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'disability',
    label: 'Nogironligi',
    type: 'populate',
    select: ['title']
  },

  {
    name: 'subject',
    label: 'Chet tili',
    type: 'populate',
    select: ['title']
  },
  {
    name: 'sertificate_grade',
    label: 'Sertifikat darajasi'
  },
  {
    name: 'sertificate_seria',
    label: 'Sertifikat seriyasi'
  },
  {
    name: 'createdAt',
    label: 'Hujjat topshirgan vaqti',
    type: 'timedate'
  }
]
