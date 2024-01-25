import { environment } from "../../environment"
import request from "../../utils/request"
export const searchReturnOrder = {
    namespaced: true,
    state: {
        searchOrders: [],
        globalSearch: '',
        orderItemsToReturn: {},
        getOrderDetails: [],
        userPreferredLang: localStorage.getItem('userPreferredLanguage'),
        getCompensation: [],
        setCarriersRec4po: [],
        variableRefund: "",
        acceptedOffer: null,
        createReturnResponse: "",
        showSpinner: ""
    },
    mutations: {
        SET_RETURN_ORDER(state, data) {
            state.searchOrders = data.data;
        },
        SET_ORDER_ITEM_TO_RETURN(state, data) {

            state.orderItemsToReturn = data.data;
        },
        SET_ORDER_DETAILS(state, data) {
            const { orders, ...rest } = data.data;

            state.getOrderDetails = {
                ...rest,
                orders: orders.map(item => {
                    const expiryDate = item.coolingOffExpirationDate
                        ? new Date(item.coolingOffExpirationDate)
                        : new Date(item.orderDate);

                    expiryDate.setDate(expiryDate.getDate() + (item.expiryDays || 0));

                    return { ...item, expiryDate };
                })
            };
        },
        SEARCH_RETURN_ORDER(state, data) {
            state.globalSearch = data
        },
        SET_COMPENSATION(state, data) {
            state.getCompensation = data.data
        },
        SET_CARRIER_RECAPO(state, data) {
            state.setCarriersRec4po = data
        },
        SET_VARIABLE_REFUND(state, data) {
            state.variableRefund = data
        },
        SET_ACCEPT_OFFER_DISCOUNT(state, data) {
            state.acceptedOffer = data
        },
        SET_CREATE_RETURN(state, data) {
            console.log(data)
            state.createReturnResponse = data
        },
        SET_SHOW_SPINNER(state, data) {
            state.showSpinner = data
        }
    },
    actions: {
        storeData({ commit }, payload) {
            commit('SEARCH_RETURN_ORDER', payload);
        },
        async searchReturnAction({ commit, state }, newData) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/orders/search-orders?culture=${state.userPreferredLang}`, { body: newData });
                commit('SET_RETURN_ORDER', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async getOrdersToReturn({ commit }, payload) {
            try {
                commit('SET_SHOW_SPINNER', true)
                const response = await request.get(`${environment.apiUrl}/api/returns/get-orders-items-to-returns`, { params: payload });
                commit('SET_ORDER_ITEM_TO_RETURN', response.data);
                commit('SET_SHOW_SPINNER', false)

            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async getOrderDetailsAction({ commit, state }) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/orders/get-orders-details?culture=${state.userPreferredLang}`, { body: state.globalSearch });
                commit('SET_ORDER_DETAILS', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async fetchCompensation({ commit, state }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-compensations?culture=${state.userPreferredLang}`, { params: payload });
                commit('SET_COMPENSATION', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async fetchReturnCarriersRec4po({ commit, state, dispatch }, payload) {
            try {
                const response = await request.post(`${environment.apiRec4poUrl}/order/cost`, payload);
                commit('SET_CARRIER_RECAPO', response.data);

            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async checkVariableRefund({ commit }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/variablerefund/refund-rate`, { params: payload });
                commit('SET_VARIABLE_REFUND', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async onUserAcceptedOffer({ commit, state }, payload) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/variablerefund/apply`, { body: payload });
                commit('SET_ACCEPT_OFFER_DISCOUNT', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
        async createReturn({ commit, state, dispatch }, payload) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/returns/create-returns`, { body: payload });
                commit('SET_CREATE_RETURN', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });
            }
        },

    }
}