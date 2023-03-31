import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    currentUserId: 2
  }),
  actions: {},
  getters: {}
})
