import { createStore } from 'vuex';

export default createStore({
  state: {
    client: null,
  },
  mutations: {
    setClient(state, client) {
      state.client = client;
    },
  },
  actions: {
    saveClient({ commit }, client) {
      commit('setClient', client);
    },
  },
});
