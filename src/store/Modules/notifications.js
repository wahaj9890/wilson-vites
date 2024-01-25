import { createApp } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';

export const notifications = {
    namespaced: true,
    state: {

        toast: useToast(),
        store: useStore(),
    },
    mutations: {},
    actions: {
        showSuccessToast({ state, commit }, message) {
            state.toast.success(message);
        },
        showErrorToast({ state }, message) {
            console.log(message);
            state.toast.error(message);
        },
    }
}

