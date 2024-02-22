<template>
  <div>
    <p class="font-bold underline md:hidden">
      {{ $t("login.wilson.welcome") }}
    </p>
    <p class="font-bold mt-4 text-2xl primaryHeading">
      {{ $t("pages.returnsPage.fields.searchFor") }}
    </p>
    <div class="md:flex items-center space-x-4 pt-2">
      <div v-for="field in fieldsCol" class="mb-4 md:w-1/4">
        <label
          for="orderNumber"
          class="uppercase colsHeaders text-sm text-gray-600 mb-1"
          >{{ field.label }}</label
        >
        <div class="relative">
          <input
            :type="field.type"
            :name="field.name"
            v-model="searchReturnPayload[field.model]"
            :placeholder="field.placeholder"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <!-- <div class="mb-4 md:w-1/4">
        <label
          for="orderNumber"
          class="uppercase colsHeaders text-sm text-gray-600 mb-1"
          >{{ $t("return.orderNumber") }}</label
        >
        <div class="relative">
          <input
            id="orderNumber"
            type="text"
            v-model="orderNumber"
            placeholder="Order number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label
          for="customerNumber"
          class="uppercase text-sm text-gray-600 mb-1"
          >{{ $t("return.customerNumber") }}</label
        >
        <div class="relative">
          <input
            id="customerNumber"
            type="text"
            v-model="customerNumber"
            placeholder="Customer number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label
          for="invoiceNumber"
          class="uppercase text-sm text-gray-600 mb-1"
          >{{ $t("return.invoiceNumber") }}</label
        >
        <div class="relative">
          <input
            id="invoiceNumber"
            type="text"
            v-model="invoiceNumber"
            placeholder="Invoice number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label
          for="customerReferenceNumber"
          class="uppercase text-sm text-gray-600 mb-1"
          >{{ $t("return.customerReferenceNumber") }}</label
        >
        <div class="relative">
          <input
            id="customerReferenceNumber"
            type="text"
            v-model="customerReferenceNumber"
            placeholder="Customer reference ..."
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div> 
      </div>

      <div class="mb-4 md:w-1/4">
        <label
          for="trackingNumber"
          class="uppercase text-sm text-gray-600 mb-1"
          >{{ $t("return.trackingNumber") }}</label
        >
        <div class="relative">
          <input
            id="trackingNumber"
            type="text"
            v-model="trackingNumber"
            placeholder="Tracking number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>-->

      <button
        class="bg-[#F3E43E] w-full md:w-auto px-12 py-2 font-sans text-black font-semibold"
        @click="searchOrder"
      >
        {{ $t("return.search") }}
      </button>
    </div>
    <div class="mb-4 md:flex items-center justify-end space-x-4">
      <label for="orderBy" class="text-sm text-black font-bold mb-1"
        >{{ $t("return.orderBy") }}:</label
      >
      <div class="relative">
        <select
          id="orderBy"
          class="w-full md:w-auto pl-7 pr-2 py-2 border border-gray-300"
        >
          <option value="option1">Latest date</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <!-- <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
          <i class="fas fa-chevron-down text-gray-500"></i>
        </div> -->
      </div>
    </div>
    <ReturnDetails />
  </div>
</template>

<script>
// import { httpGet, httpPost } from "../../utils/request";
import { ref, computed, onMounted, reactive } from "vue";
import i18n from "../../i18ns/i18n";
import { useStore } from "vuex";
import ReturnDetails from "../Return/ReturnDetails.vue";
import { fields } from "../../utils/fieldNames";

export default {
  name: "ReturnSearch",
  components: {
    ReturnDetails,
  },
  setup() {
    const store = useStore();
    const fieldsCol = ref(fields);
    const orderNumber = ref("");
    const invoiceNumber = ref("");

    const searchReturnPayload = reactive({
      orderNumber: "",
      customerNumber: "",
      invoiceNumber: "",
      customerReferenceNumber: "",
      trackingNumber: "",
    });
    // const returnsFields = ref(
    //   JSON.parse(i18n.global.t("fields").replace(/'/g, '"'))
    // );
    // const returnsFields = ref(JSON.parse(i18n.global.t("fields")));
    const customerNumber = ref("");
    const customerReferenceNumber = ref("");
    const trackingNumber = ref("");
    const orderDetailsParams = ref({});
    const globalSearch = computed(() => {
      return store.state.searchReturnOrder.globalSearch;
    });
    let payload;
    function searchOrder() {
      payload = {
        orderId: searchReturnPayload.orderNumber,
        customerNumber: searchReturnPayload.customerNumber,
        invoiceNumber: searchReturnPayload.invoiceNumber,
        customerReferenceNumber: searchReturnPayload.customerReferenceNumber,
        orderTrackingNumber: searchReturnPayload.trackingNumber,
        firstName: "",
        lastName: "",
      };
      store.dispatch("searchReturnOrder/searchReturnAction", payload);
      store.dispatch("searchReturnOrder/storeData", payload);
    }
    onMounted(() => {
      if (!!globalSearch) {
        store.dispatch(
          "searchReturnOrder/searchReturnAction",
          globalSearch.value
        );
      }
    });
    return {
      searchOrder,
      orderNumber,
      fieldsCol,
      searchReturnPayload,
      // temp,
      // returnsFields,
      customerNumber,
      customerReferenceNumber,
      invoiceNumber,
      trackingNumber,
    };
  },
};
</script>
