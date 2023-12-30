import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { searchReturnOrder } from './Modules/searchReturnOrder';
import { global } from './Modules/global';
export default createStore({
  state() {
    return {
      msalConfig: {
        auth: {
          clientId: 'dd6246b2-6e41-4c18-8ea9-24f338c6b46c',
          authority:
            'https://login.microsoftonline.com/0ccc3842-cffc-46df-8f30-782e969077e2',
        },
        redirectUri: "http://localhost:4200/",
        cache: {
          cacheLocation: 'localStorage',
        },
      },
      accessToken: ''
    };
  },
  mutations: {
    // Your mutations go here
    setAccessToken(state, token) {
      state.accessToken = token;
    }
  },
  actions: {
    // Your actions go here
  },
  modules: {
    searchReturnOrder,
    global
    // Your modules go here
  },
  plugins: [createPersistedState({
    paths: ['searchReturnOrder.searchOrders'],
  })],
});
