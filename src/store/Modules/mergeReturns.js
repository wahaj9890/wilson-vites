import { environment } from "../../environment";
import request from "../../utils/request";
export const mergeReturns = {
  namespaced: true,
  state: {
    globalSearch: "",
    showSpinner: "",
    shipmentFee: null,
    manageReturns: [],
    editReturnOrderList: [],
    userPreferredLang: localStorage.getItem("userPreferredLanguage"),
  },
  mutations: {
    SET_EDIT_RETURN_ORDER(state, data) {
      state.editReturnOrder = data;
      console.log(state.editReturnOrder);
    },
    SET_MANAGE_ORDER(state, data) {
      state.manageReturns = data.data;
    },
    SET_SHIPMENT_FEE(state, data) {
      console.log(data)
      state.shipmentFee = data;
    },
  },
  actions: {
    storeData({ commit }, payload) {
      commit("SEARCH_RETURN_ORDER", payload);
    },
    async manageReturnAction({ commit, state }, newData) {
      try {
        const response = await request.post(
          `${environment.apiUrl}/api/returns/search-returns?culture=${state.userPreferredLang}`,
          { body: newData }
        );
        commit("SET_MANAGE_ORDER", response.data);
      } catch (error) {
        dispatch("notifications/showErrorToast", error.message, { root: true });
      }
    },
    async editReturnOrder({ commit }, payload) {
      try {
        const response = await request.get(
          `${environment.apiUrl}/api/returns/get-receive-return-details`,
          { params: payload }
        );
        commit("SET_EDIT_RETURN_ORDER", response.data.data);
      } catch (error) {
        dispatch("notifications/showErrorToast", error.message, { root: true });
      }
    },
    async getReturnShipmentFee({ commit }, payload) {
      try {
        const response = await request.get(
          `${environment.apiUrl}/api/return-shipment-fee`,
          { params: payload }
        );
        commit("SET_SHIPMENT_FEE", response.data);
      } catch (error) {
        dispatch("notifications/showErrorToast", error.message, { root: true });
      }
    },
  },
};
