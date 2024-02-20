import i18n from "../i18ns/i18n"

export const fields = [
    {
        id: "orderNumber",
        type: "text",
        name: 'order-number',
        label: i18n.global.t("pages.returnPage.fields.order_number"),
        placeholder: i18n.global.t("pages.returnPage.fields.order_number"),
        model: "orderNumber",
    },
    {
        id: "customerNumber",
        type: "text",
        name: 'customer-number',
        label: i18n.global.t("pages.returnPage.fields.customer_number"),
        placeholder: i18n.global.t("pages.returnPage.fields.customer_number"),
        model: "customerNumber",
    },
    {
        id: "invoiceNumber",
        type: "text",
        name: 'invoice-number',
        label: i18n.global.t("pages.returnPage.fields.invoice_number"),
        placeholder: i18n.global.t("pages.returnPage.fields.invoice_number"),
        model: "invoiceNumber",
    },
    {
        id: "customerReferenceNumber",
        type: "text",
        name: 'customer-reference-number',
        label: i18n.global.t("pages.returnPage.fields.customerReference_number"),
        placeholder: i18n.global.t("pages.returnPage.fields.customerReference_number"),
        model: "customerReferenceNumber",
    },
    {
        id: "trackingNumber",
        type: "text",
        name: 'tracking-number',
        label: i18n.global.t("pages.returnPage.fields.tracking_number"),
        placeholder: i18n.global.t("pages.returnPage.fields.tracking_number"),
        model: "trackingNumber",
    }

]



