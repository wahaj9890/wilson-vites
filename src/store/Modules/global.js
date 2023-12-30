import axios from "axios"
export const global = {
    // namespaced: true,
    state: {
        globalSearch: {},
        // orderItemsToReturn: [],
        // getOrderDetails: [],
    },
    mutations: {
        SET_GLOBAL_SEARCH(state, data) {
            state.globalSearch = data;
        },
    },
    actions: {
        storeData({ commit }, payload) {
            commit('SET_RETURN_ORDER', payload);
        },

    }
}