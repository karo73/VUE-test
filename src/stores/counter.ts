import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    countrySelected: null,
    citySelected: null
  }),
  actions: {
    increaseCount() {
      this.count++
    },
    decreaseCount() {
      this.count--
    }
  },
  getters: {
    oddOrEvent: (state) => (state.count % 2 === 0 ? 'event' : 'odd')
  }
  // hydrate(storeState, initialState) {}
})
