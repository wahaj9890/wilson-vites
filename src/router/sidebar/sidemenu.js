
export const sidemenu = {
    returns: {
        name: "returns",
        module: "Returns",
        header: "returns",
        icon: [],
        iconClass: ['fas fa-exchange-alt mr-2'],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "returns",
            tooltip: "Returns",
            class: [""]
        },
        children: [
            {
                name: "create-return",
                module: "CreateReturn",
                icon: [],
                routerLink: {
                    name: "CreateReturn",
                    tooltip: "Create Return",
                    class: [""],
                }
            }
        ]
    },
    technicalCheck: {
        name: "technicalCheck",
        module: "TechnicalCheck",
        hasSubModule: false,
        header: "technicalCheck",
        icon: [],
        iconClass: ['fas fa-shopping-bag mr-2'],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "technical-check",
            tooltip: "Technical Check",
            class: ["button-nav"]
        },
        children: [

        ]
    },
    repair: {
        name: "repair",
        module: "Repair",
        hasSubModule: false,
        header: "repair",
        icon: [""],
        iconClass: ["fas fa-tools mr-2"],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "repair",
            tooltip: "Repair",
            class: ["button-nav"]
        },
        children: [

        ]
    },
    refurbish: {
        name: "refurbish",
        module: "Refurbish",
        hasSubModule: false,
        header: "refurbish",
        icon: [""],
        iconClass: ["fas fa-sync mr-2"],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "refurbish",
            tooltip: "Refurbish",
            class: ["button-nav"]
        },
        children: [

        ]
    },
    returnInspection: {
        name: "returnInspection",
        module: "Return Inspection",
        hasSubModule: false,
        header: "returnInspection",
        icon: [],
        iconClass: ["fab fa-searchengin mr-2"],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "return-inspection",
            tooltip: "Return Inspection",
            class: ["button-nav"]
        },
        children: [

        ]
    },
    overview: {
        name: "overview",
        module: "Overview",
        hasSubModule: false,
        header: "overview",
        icon: [""],
        iconClass: ["fas fa-file-archive mr-2"],
        subIcon: [],
        subIconClass: [],
        routerLink: {
            name: "overview",
            tooltip: "Overview",
            class: ["button-nav"]
        },
        children: [

        ]
    },

}
