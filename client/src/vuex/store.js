import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  getters: {
    getCounter(state) {
      return state.counter;
    },
  },
  mutations: {
    addCounter(state) {
      state.counter += 1;
    },
    subCounter(state) {
      state.counter -= 1;
    },
    setNum(state, num) {
      state.counter = num;
    },
  },
  actions: {
    upCounter({ commit }, payload) {
      setTimeout(() => {
        commit('setNum', payload.by);
      }, payload.duration);
    },
  },
});

