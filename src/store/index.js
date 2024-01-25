import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from 'secure-ls';
import { searchReturnOrder } from './Modules/searchReturnOrder';
import { global } from './Modules/global';
import { reclamationHistory } from './Modules/reclamationHistory';
import { notifications } from './Modules/notifications'

const secureLs = new SecureLS({ isCompression: false });
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
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    clearModuleStates(state) {
      Object.keys(state).forEach((moduleName) => {
        const moduleState = state[moduleName];
        console.log(moduleState);
        Object.keys(moduleState).forEach((key) => {
          moduleState[key] = null;
        });
      });
    },
  },
  actions: {
  },
  modules: {
    searchReturnOrder,
    global,
    notifications,
    reclamationHistory
  },
  plugins: [
    createPersistedState({
      key: "vuex",
      paths: [
        'global.authenticatedUser',
        'searchReturnOrder.globalSearch'
        // Add other paths as needed
      ],
      // getState: (key,) => {
      //   // console.log(state);
      //   // Use secure-ls for decryption
      //   return secureLs.get(key, { isEncoded: false });
      // },
      // setState: (key, state) => {
      //   // Use secure-ls for encryption
      //   secureLs.set(key, state, { isEncoded: false });
      // },
      // getState: (key) => {
      //   const encryptedData = localStorage.getItem(key);
      //   if (!encryptedData) return null;

      //   // Use secure-ls for decryption
      //   return secureLs.decrypt(encryptedData);
      // },
      // setState: (key, state) => {
      //   // Use secure-ls for encryption
      //   const encryptedData = secureLs.encrypt(state);
      //   localStorage.setItem(key, encryptedData);
      // },
    }),
  ],


});
// plugins: [createPersistedState({
//   key: "searchOrders", paths: ['searchReturnOrder.searchOrders'],
// })],
// // plugins: [createPersistedState({
// //   key: "globalSearch", paths: ['searchReturnOrder.globalSearch'],
// // })],
// plugins: [createPersistedState({
//   key: "authenticatedUser", paths: ['global.authenticatedUser'],
// })],