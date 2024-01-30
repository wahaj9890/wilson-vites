import { environment } from "../../environment"
import request from "../../utils/request"
export const mergeReturns = {
    namespaced: true,
    state: {
        globalSearch: '',
        showSpinner: ""
    },
    mutations: {
        SEARCH_RETURN_ORDER(state, data) {
            state.globalSearch = data
        },
        SET_SHOW_SPINNER(state, data) {
            state.showSpinner = data
        }
    },
    actions: {
        storeData({ commit }, payload) {
            commit('SEARCH_RETURN_ORDER', payload);
        },
        // async searchReturnAction({ commit, state }, newData) {
        //     try {
        //         const response = await request.post(`${environment.apiUrl}/api/orders/search-orders?culture=${state.userPreferredLang}`, { body: newData });
        //         commit('SET_RETURN_ORDER', response.data);
        //     } catch (error) {
        //         dispatch("notifications/showErrorToast", error.message, { root: true });

        //     }
        // },
        // async getOrdersToReturn({ commit }, payload) {
        //     try {
        //         commit('SET_SHOW_SPINNER', true)
        //         const response = await request.get(`${environment.apiUrl}/api/returns/get-orders-items-to-returns`, { params: payload });
        //         commit('SET_ORDER_ITEM_TO_RETURN', response.data);
        //         commit('SET_SHOW_SPINNER', false)

        //     } catch (error) {
        //         dispatch("notifications/showErrorToast", error.message, { root: true });

        //     }
        // },

    }
}