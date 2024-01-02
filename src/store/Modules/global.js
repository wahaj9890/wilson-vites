import axios from "axios"
import request from "../../utils/request"
import { environment } from "../../environment";
export const global = {
    // namespaced: true,
    state: {
        globalSearch: {},
        authenticatedUser: false,
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
        async fetchRegistrationReasons({ commit }, { payload, keys }) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-registration-reasons`, { params: payload });
                const responseData = (response.data.data);
                localStorage.setItem(keys, JSON.stringify(responseData))
                // commit('SET_RETURN_ORDER', response.data);
            } catch (error) {
                console.error('Error while fetch data:', error);
            }
        }
    }
}