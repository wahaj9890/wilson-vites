import { environment } from "../../environment"
import request from "../../utils/request"
import { LookupEnum } from "../../utils/lookup";
export const technicalCheck = {
    namespaced: true,
    state: {
        returnDeliveryDetails: null,
        receiveReturnDetails: null,
        stepName: "TechnicalCheck",
        isStepAllowed: false,
        lookupDetails: null,
        lookupDetailsOnOffTest: null,
        lookupDetailsTechnicalCheckResult: null,
        technicalCheckDetails: null,
        maskDataReturnOrder: null,
        // getOrderDetails: [],
    },
    mutations: {
        SET_RETURN_DELIVERY_DETAILS(state, data) {
            state.returnDeliveryDetails = data.data;
        },
        SET_RECEIVE_RETURN_DETAILS(state, data) {
            state.receiveReturnDetails = data.data;
        },
        SET_STEP_ALLOWED(state, data) {
            state.isStepAllowed = data;
        },
        SET_LOOKUP_ENUM(state, { type, data }) {
            state.lookupDetails = {
                ...state.lookupDetails,
                [type]: data
            }
        },
        SET_MAST_DATA_RETURN_ORDER(state, data) {
            state.maskDataReturnOrder = data.data
        },
        SET_TECHNICAL_CHECK(state, data) {
            state.technicalCheckDetails = data.data
        }
    },
    actions: {
        async getReturnOrderIdFromDeliveryId({ commit, dispatch }, returnDeliveryId) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returnmask/get-return-order-id/${returnDeliveryId}`);
                commit('SET_RETURN_DELIVERY_DETAILS', response.data);
                let payload = {
                    returnOrderId: response.data.data
                }
                await dispatch("fetchReceiveReturnDetails", payload)
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async fetchReceiveReturnDetails({ commit, dispatch }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-receive-return-details`, { params: payload });
                commit('SET_RECEIVE_RETURN_DETAILS', response.data);
                await dispatch("isStepAllowed")

            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async isStepAllowed({ commit, dispatch, state },) {
            let returnOrderId = state.returnDeliveryDetails
            let lookupTypeOnOffTest = LookupEnum.OnOffTest
            let lookupTypeTechnicalCheckResult = LookupEnum.TechnicalCheckResult

            try {
                const response = await request.get(`${environment.apiUrl}/api/returnmask/${state.stepName}/${returnOrderId}/step-allowed`);
                commit('SET_STEP_ALLOWED', response.data);
                await dispatch("getMaskDataForReturnOrder", returnOrderId)
                if (state.isStepAllowed == true) {
                    await dispatch("fetchLookUpData", { type: "lookupTypeOnOffTest", payload: lookupTypeOnOffTest });
                    await dispatch("fetchLookUpData", { type: "lookupTypeTechnicalCheckResult", payload: lookupTypeTechnicalCheckResult });
                }
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async fetchLookUpData({ commit, state }, { type, payload }) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/lookup/get-data`, { params: { lookupType: payload } });
                commit('SET_LOOKUP_ENUM', { type, data: response.data });

            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async getMaskDataForReturnOrder({ commit, state },) {
            let returnOrderId = state.returnDeliveryDetails
            try {
                const response = await request.get(`${environment.apiUrl}/api/returnmask/get-all-masks-data/${returnOrderId}`);
                commit('SET_MAST_DATA_RETURN_ORDER', response.data);

            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async saveTechnicalCheck({ commit, state, dispatch }, newData) {
            try {
                const response = await request.post(`${environment.apiUrl}/api/returnmask/technical-check`, { body: newData });
                commit('SET_TECHNICAL_CHECK', response.data);
            } catch (error) {
                dispatch("notifications/showErrorToast", error.message, { root: true });

            }
        },
    }
}