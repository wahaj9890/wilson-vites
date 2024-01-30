import { environment } from "../../environment"
import request from "../../utils/request"
export const technicalCheck = {
    namespaced: true,
    state: {
        returnDeliveryDetails: null,
        receiveReturnDetails: null,
        // getOrderDetails: [],
    },
    mutations: {
        SET_RETURN_DELIVERY_DETAILS(state, data) {
            state.returnDeliveryDetails = data.data;
        },
        SET_RECEIVE_RETURN_DETAILS(state, data) {
            state.receiveReturnDetails = data.data;
            console.log(state.receiveReturnDetails)
        },
        // SET_ORDER_DETAILS(state, data) {
        //     state.getOrderDetails = data.data;
        // }
    },
    actions: {
        async getReturnOrderIdFromDeliveryId({ commit,dispatch }, returnDeliveryId) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returnmask/get-return-order-id/${returnDeliveryId}`);
                commit('SET_RETURN_DELIVERY_DETAILS', response.data);
                let payload = {
                    returnOrderId:response.data.data
                }
                await dispatch("fetchReceiveReturnDetails", payload)
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        async fetchReceiveReturnDetails({ commit }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-receive-return-details`, { params:payload});
                commit('SET_RECEIVE_RETURN_DETAILS', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        // async getOrderDetailsAction({ commit }, newData) {
        //     try {
        //         const response = await axios.post('../../public/getOrderDetails.json', newData);
        //         commit('SET_ORDER_DETAILS', response.data);
        //     } catch (error) {
        //         console.error('Error posting data:', error);
        //     }
        // },
    }
}