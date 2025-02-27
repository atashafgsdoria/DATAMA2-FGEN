import { createStore } from 'vuex';

export default createStore({
  state: {
    client: null
  },
  mutations: {
    SET_CLIENT(state, client) {
      state.client = client;
    }
  },
  actions: {
    saveClient({ commit }, client) {
      commit('SET_CLIENT', client);
    }
  },
  getters: {
    getClient: (state) => state.client
  }
});
