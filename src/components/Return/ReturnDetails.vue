<template>
  <div class="pt-2">
    <table class="w-full border border-gray-300">
      <thead>
        <tr>
          <th
            v-for="(column, index) in returnColumns"
            :key="column.key"
            :class="[
              'border border-gray-300 p-2 text-left',
              'bg-gray-100',
              index % 2 === 0 ? 'bg-[#F0F0F0]' : '',
              index % 2 !== 0 ? 'bg-[#F7F7F7]' : '',
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <h3 v-if="searchOrders?.length === 0">No data</h3>
      <tbody v-else>
        <tr
          v-for="(item, index) in searchOrders"
          :key="index"
          :class="['bg-white hover:bg-gray-50']"
        >
          <td
            v-for="(column, index) in returnColumns"
            :key="column.key"
            :class="[
              'border border-gray-300 p-2',
              index % 2 === 0 ? 'bg-[#F0F0F0]' : '',
              index % 2 !== 0 ? 'bg-[#F7F7F7]' : '',
            ]"
          >
            {{ formatValue(item[column.key]) }}
          </td>
          <div class="flex flex-col gap-1">
            <button
              class="bg-[#F3E43E] text-black font-semibold px-2 py-1"
              @click="navigateToCreateReturn(item.orderId)"
            >
              Create
            </button>
            <button
              v-tooltip="'This is a tooltip'"
              class="bg-[#FFFFFF] text-black border px-2 py-1"
              @click="navigateToCreateReturn(item.orderId, true)"
            >
              Manage
            </button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { formatValue } from "../../utils/globalMethods";
export default {
  name: "ReturnDetails",
  props: [""],
  setup(props) {
    const router = useRouter();
    const apiData = ref([]);
    const store = useStore();
    const searchOrders = computed(
      () => store.state.searchReturnOrder.searchOrders
    );
    const isAuthenticatedUser = computed(
      () => store.state.global.authenticatedUser
    );

    const returnColumns = ref([
      {
        key: "customerNumber",
        label: "Customer No.",
      },
      {
        key: "invoiceNumber",
        label: "Invoice No.",
      },
      {
        key: "orderDate",
        label: "Order Date",
      },
      {
        key: "returnCreation",
        label: "Return Creation",
      },
      {
        key: "currency",
        label: "Currency",
      },
      {
        key: "expiryDate",
        label: "Expiration Date",
      },
      {
        key: "status",
        label: "Status",
      },
      {
        key: "download",
        label: "Download",
      },
    ]);
    const returnData = ref([
      // {
      //   id: 1,
      //   customerNo: "12345679",
      //   invoiceNo: "321654784",
      //   orderDate: "2022-03-12",
      //   returnCreation: "2022-02-20",
      //   currency: "EUR",
      //   expirationDate: "2024-05-09",
      //   status: "Approved",
      //   download: "None",
      // },
      // {
      //   id: 2,
      //   customerNo: "12345679",
      //   invoiceNo: "321654784",
      //   orderDate: "2022-03-12",
      //   returnCreation: "2022-02-20",
      //   currency: "EUR",
      //   expirationDate: "2024-05-09",
      //   status: "Approved",
      //   download: "None",
      // },
      // {
      //   id: 3,
      //   customerNo: "12345679",
      //   invoiceNo: "321654784",
      //   orderDate: "2022-03-12",
      //   returnCreation: "2022-02-20",
      //   currency: "EUR",
      //   expirationDate: "2024-05-09",
      //   status: "Approved",
      //   download: "None",
      // },
    ]);

    function navigateToCreateReturn(orderId, isManageReturn) {
      router.push({
        name: "create-return",
        query: { orderId, isManageReturn },
      });
    }

    store.watch(
      () => store.state.searchReturnOrder.searchOrders,
      (newData) => {
        apiData.value = newData;
      }
    );
    return {
      returnColumns,
      returnData,
      apiData,
      searchOrders,
      isAuthenticatedUser,
      navigateToCreateReturn,
      formatValue,
    };
  },
};
</script>

<style scoped></style>
