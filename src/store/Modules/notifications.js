import { createApp } from 'vue';
import { useToast } from 'vue-toastification';

export const notifications = {
    namespaced: true,

    state: {},
    mutations: {},
    actions: {
        showToast({ commit }, { message, type }) {
            console.log(message,type);
        const app = createApp({});

            const toast = useToast({
                position: 'top-right',
                timeout: 3000,
            });

            app.component('Toast', toast);
            const vm = app.mount(document.createElement('div'));

            vm.$toast[type](message);
        }
    }
}


// const actions = {
//     showToast({ commit }, { message, type }) {
//         const app = createApp({});
//         const toast = useToast({
//             position: 'top-right',
//             timeout: 3000,
//         });

//         app.component('Toast', toast);
//         const vm = app.mount(document.createElement('div'));

//         vm.$toast[type](message);
//     },
// };

// export default {
//     state,
//     mutations,
//     actions,
// };
