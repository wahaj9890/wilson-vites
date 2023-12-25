import axios from "axios"
export const searchReturnOrder = {
    // namespaced: true,
    state: {
        searchOrders: []
    },
    mutations: {
        SET_RETURN_ORDER(state, data) {
            state.searchOrders = data.data;
            console.log(state.searchOrders)

        },
    },
    actions: {
        async searchReturnAction({commit}, newData) {
            try {
                const response = await axios.post('../../public/searachReturn.json', newData);
                commit('SET_RETURN_ORDER', response.data);
            } catch (error) {
                // Handle error here
                console.error('Error posting data:', error);
            }
        },
    }
}