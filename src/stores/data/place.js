import { api } from '@/helpers/api'
import { defineStore } from 'pinia'

export const placeStore = defineStore('placeStore', () => {
  const getRegions = async (params) => {
    return await api({
      url: 'v1/regions',
      params
    })
  }

  const getDistricts = async (params) => {
    return await api({
      url: 'v1/districts',
      params
    })
  }

  return {
    getRegions,
    getDistricts
  }
})
