import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filter', {
  state: () => ({
    countryOptions: [],
    countrySelected: null,
    cityList: [],
    cityOptions: [],
    citySelected: null,
    serviceOptions: [],
    serviceSelected: null
  }),
  actions: {},
  getters: {}
})
