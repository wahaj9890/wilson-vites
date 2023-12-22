export default [
    {
        path: "/returns",
        name: "returns",
        component: () => import("../../views/SideBar/ReturnScreen.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },
    {
        path: "/technical-check",
        name: "technical-check",
        component: () => import("../../views/SideBar/TechnicalCheck.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },
    {
        path: "/repair",
        name: "repair",
        component: () => import("../../views/SideBar/Repair.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },
    {
        path: "/refurbish",
        name: "refurbish",
        component: () => import("../../views/SideBar/Refurbish.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },
    {
        path: "/return-inspection",
        name: "return-inspection",
        component: () => import("../../views/SideBar/RetrunInspection.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },
    {
        path: "/overview",
        name: "overview",
        component: () => import("../../views/SideBar/Overview.vue"),
        // meta: {
        //     isChild: false,
        //     title: "Returns",
        // }
    },


]
