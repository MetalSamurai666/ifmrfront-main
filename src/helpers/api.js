import router from '@/router'
import cookies from 'vue-cookies'
import axios from 'axios'
import { ElMessage } from 'element-plus'
// const url = 'https://muslimapi.bookblogs.uz'
const url = 'http://localhost:3000'

const api = async (payload) => {
  // if (!cookies.get('sitetoken')) router.push({ name: 'sign-in' })
  return await axios({
    method: payload.method || 'get',
    url: `${url}/${payload.url}`,
    data: payload.data || null,
    params: payload.params || {},
    headers: {
      Authorization: `Bearer ${cookies.get('sitetoken') || ''}`
    }
  }).catch((error) => {
    console.log(error)
    ElMessage({
      type: 'error',
      message: error.response?.data?.msg || error.response?.data?.message || ''
    })
    if (error.response?.status == 401) {
      router.push({ name: 'sign-in' })
      cookies.remove('sitetoken')
      cookies.remove('siteuser')
    }
    if (error.response?.status == 403) {
      router.push({ name: 'dashboard' })
      cookies.remove('sitetoken')
      cookies.remove('siteuser')
    }
    return error
  })
}

const checkSlug = async (model, slug) => {
  let { data } = api({
    url: `api/${model}/${slug}`
  })
  return data
}

const generateExcel = async (model, data = [], params = {}) => {
  console.log(params)
  console.log(data)
  let res = await api({
    method: 'post',
    url: `api/${model}/export`,
    data,
    params: {
      search: { ...params }
    }
  })
  await download(res.data)
}

const download = async (filepath) => {
  console.log(filepath)
  let filename = filepath.split('/').at(-1)
  axios({
    url: `${url}/${filepath}`,
    method: 'GET',
    responseType: 'blob'
  }).then((response) => {
    var fileURL = window.URL.createObjectURL(new Blob([response.data]))
    var fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', filename)
    document.body.appendChild(fileLink)
    fileLink.click()
  })
}

export { api, url, download, generateExcel, checkSlug }
