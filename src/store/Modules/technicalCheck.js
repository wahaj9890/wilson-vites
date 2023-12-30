import axios from "axios"
import { environment } from "../../environment"
export const searchReturnOrder = {
    // namespaced: true,
    state: {
        orderReturnInfo: [],
        // orderItemsToReturn: [],
        // getOrderDetails: [],
    },
    mutations: {
        SET_ORDER_RETURN_INFO(state, data) {
            state.orderReturnInfo = data.data;
        },
        // SET_ORDER_ITEM_TO_RETURN(state, data) {
        //     state.orderItemsToReturn = data.data;
        //     // console.log(state.orderItemsToReturn)
        // },
        // SET_ORDER_DETAILS(state, data) {
        //     state.getOrderDetails = data.data;
        // }
    },
    actions: {
        async getReturnOrderInfo({ commit }, newData) {
            try {
                const response = await axios.get("https://wilson-api-dev01d-featuretest2.azurewebsites.net/api/orders/search-orders?culture=en-GB", newData);
                // const response = await axios.post("../../../public/searachReturn.json", newData);
                commit('SET_RETURN_ORDER', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },
        // async getOrdersToReturn({ commit },) {
        //     try {
        //         const response = await axios.get('../../public/getReturnOrder.json');
        //         commit('SET_ORDER_ITEM_TO_RETURN', response.data);
        //     } catch (error) {
        //         console.error('Error posting data:', error);
        //     }
        // },
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