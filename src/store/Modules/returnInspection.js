import { environment } from "../../environment"
import request from "../../utils/request"
import { LookupEnum } from "../../utils/lookup";
export const returnInspection = {
    namespaced: true,
    state: {
        returnInspectionDetails: null,
        receiveReturnDetails: null,
        stepName: "TechnicalCheck",

    },
    mutations: {
        SET_RETURN_INSPECTION_DATA(state, { type, data }) {
            state.returnInspectionDetails = data
        }
    },
    SET_TECHNICAL_CHECK(state, data) {
        state.technicalCheckDetails = data
    },

    actions: {
        async getReturnInspectionData({ commit, state },returnOrderId) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returnmask/get-inspection`, { params: returnOrderId });
                commit('SET_RETURN_INSPECTION_DATA', response.data);

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