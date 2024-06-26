import { environment } from "../../environment"
import request from "../../utils/request"
export const reclamationHistory = {
    namespaced: true,
    state: {
        reclamationHistoryDetails: null,
        articleDetails :null,

    },
    mutations: {
        SET_RECLAMATION_HISTORY(state, data) {
            state.reclamationHistoryDetails = data.data;
        },
        SET_ARTICLE_DETAILS(state, data) {
            state.articleDetails = data.data;
        },
    },
    actions: {
        async getReclamationHistory({ commit }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/returns/get-return-history`, { params: payload });
                commit('SET_RECLAMATION_HISTORY', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },

        async getArticleDetails({ commit }, payload) {
            try {
                const response = await request.get(`${environment.apiUrl}/api/material/${payload}/details`);
                commit('SET_ARTICLE_DETAILS', response.data);
            } catch (error) {
                console.error('Error posting data:', error);
            }
        },

    }
}