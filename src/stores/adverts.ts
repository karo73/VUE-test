import { defineStore } from 'pinia'

export const useAdvertsStore = defineStore('adverts', {
  state: () => ({
    list: [],
    filteredList: [],
    backRoute: 'adverts'
  }),
  actions: {},
  getters: {}
})
