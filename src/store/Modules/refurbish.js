import { environment } from "../../environment"
import request from "../../utils/request"
import { LookupEnum } from "../../utils/lookup";
export const refurbish = {
    namespaced: true,
    state: {
        returnDeliveryDetails: null,
        receiveReturnDetails: null,
        stepName: "TechnicalCheck",
        lookupDetails: null,
        lookupDetailsOnOffTest: null,
        lookupDetailsTechnicalCheckResult: null,
        technicalCheckDetails: null
        // getOrderDetails: [],
    },
    mutations: {
        SET_LOOKUP_ENUM(state, { type, data }) {
            state.lookupDetails = {
                ...state.lookupDetails,
                [type]: data
            }
        },
        SET_TECHNICAL_CHECK(state, data) {
            state.technicalCheckDetails = data
        }
    },
    actions: {

        async fetchLookUpData({ commit, state }, { type, payload }) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/lookup/get-data`, { params: { lookupType: payload } });
                commit('SET_LOOKUP_ENUM', { type, data: response.data });

            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async saveRefurbish({ commit, state, dispatch }, newData) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/returnmask/refurbish`, { body: newData });
                commit('SET_TECHNICAL_CHECK', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
    }
}