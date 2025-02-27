import { createStore } from 'vuex';

export default createStore({
  state: {
    client: {}, // ✅ Ensure this exists
  },
  mutations: {
    setClient(state, client) {
      state.client = client;
    }
  },
  actions: {
    saveClient({ commit }, client) {
      commit('setClient', client);
    }
  }
});
