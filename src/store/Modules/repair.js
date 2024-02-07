import { environment } from "../../environment"
import request from "../../utils/request"
import { LookupEnum } from "../../utils/lookup";
export const repair = {
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
        SET_RETURN_DELIVERY_DETAILS(state, data) {
            state.returnDeliveryDetails = data.data;
        },
        SET_RECEIVE_RETURN_DETAILS(state, data) {
            state.receiveReturnDetails = data.data;
        },
        SET_STEP_NAME(state, data) {
            state.stepName = data;
        },
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
        // async getReturnOrderIdFromDeliveryId({ commit, dispatch }, returnDeliveryId) {
        //     try {
        //         const response = await request.get(`${environment.apiUrl}/api/returnmask/get-return-order-id/${returnDeliveryId}`);
        //         commit('SET_RETURN_DELIVERY_DETAILS', response.data);
        //         let payload = {
        //             returnOrderId: response.data.data
        //         }
        //         await dispatch("fetchReceiveReturnDetails", payload)
        //     } catch (error) {
        //         console.error('Error posting data:', error);
        //     }
        // },
        // async fetchReceiveReturnDetails({ commit, dispatch }, payload) {
        //     try {
        //         const response = await request.get(`${environment.apiUrl}/api/returns/get-receive-return-details`, { params: payload });
        //         commit('SET_RECEIVE_RETURN_DETAILS', response.data);
        //         await dispatch("isStepAllowed")

        //     } catch (error) {
        //         console.error('Error posting data:', error);
        //     }
        // },
        async fetchLookUpData({ commit, state }, { type, payload }) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/lookup/get-data`, { params: { lookupType: payload } });
                commit('SET_LOOKUP_ENUM', { type, data: response.data });

            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async saveRepair({ commit, state,dispatch }, newData) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/returnmask/repair`, { body: newData });
                commit('SET_TECHNICAL_CHECK', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
    }
}