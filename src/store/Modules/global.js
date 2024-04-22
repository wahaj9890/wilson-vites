import axios from "axios"
import request from "../../utils/request"
import { environment } from "../../environment";
export const global = {
    namespaced: true,
    state: {
        authenticatedUser: false,
        discountReject: "",
        userPreferredLang: localStorage.getItem('userPreferredLanguage'),

        // orderItemsToReturn: [],
        // getOrderDetails: [],
    },
    mutations: {
        SET_GLOBAL_SEARCH(state, data) {
            state.globalSearch = data;
        },
        CLEAR_ALL_STATE(state) {
            const isAuthenticated = JSON.parse(localStorage.getItem('currentUser'))?.contactLogin?.token;
            if (isAuthenticated) {
                state.authenticatedUser = true;
            } else {
                state.authenticatedUser = false

            }
        },
        SET_DISCOUNT_REJECT(state, payload) {
            state.discountReject = payload;
        },
    },
    actions: {

        async fetchRegistrationReasons({ commit,state }, { payload, keys }) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-registration-reasons?culture=${state.userPreferredLang}`, { params: payload });
                const responseData = (response.data.data);
                localStorage.setItem(keys, JSON.stringify(responseData))
            } catch (error) {
                console.error('Error while fetch data:', error);
            }
        },

        clearAllState({ commit }) {
            commit("CLEAR_ALL_STATE")
        }
    }
}