<template>
  <div class="pt-2">
    <table class="w-full border border-gray-300 ">
      <thead>
        <tr>
          <th
            v-for="(column, index) in returnColumns"
            :key="column.key"
            :class="[
              'border border-gray-300 p-2 text-left',
              'bg-gray-100' /* Base background color */,
              index % 2 === 0 ? 'bg-[#F0F0F0]' : '' /* Even rows */,
              index % 2 !== 0 ? 'bg-[#F7F7F7]' : '' /* Odd rows */,
            ]"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in returnData"
          :key="item.key"
          :class="['bg-white hover:bg-gray-50']"
        >
          <td
            v-for="(column, index) in returnColumns"
            :key="column.key"
            :class="[
              'border border-gray-300 p-2',
              index % 2 === 0 ? 'bg-[#F0F0F0]' : '' /* Even rows */,
              index % 2 !== 0 ? 'bg-[#F7F7F7]' : '' /* Odd rows */,
            ]"
          >
            {{ item[column.key] }}
          </td>
          <div class="flex flex-col gap-1">
            <button
              class="bg-[#F3E43E] text-black font-semibold px-2 py-1"
              @click="navigateToCreateReturn"
            >
              Create
            </button>
            <button class="bg-[#FFFFFF] text-black border px-2 py-1 ">Manage</button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "ReturnDetails",
  props: [""],
  setup(props) {
    const router = useRouter();
    const returnColumns = ref([
      {
        key: "customerNo",
        label: "Customer No.",
      },
      {
        key: "invoiceNo",
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
        key: "expirationDate",
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
      {
        id: 1,
        customerNo: "12345679",
        invoiceNo: "321654784",
        orderDate: "2022-03-12",
        returnCreation: "2022-02-20",
        currency: "EUR",
        expirationDate: "2024-05-09",
        status: "Approved",
        download: "None",
      },
      {
        id: 2,
        customerNo: "12345679",
        invoiceNo: "321654784",
        orderDate: "2022-03-12",
        returnCreation: "2022-02-20",
        currency: "EUR",
        expirationDate: "2024-05-09",
        status: "Approved",
        download: "None",
      },
      {
        id: 3,
        customerNo: "12345679",
        invoiceNo: "321654784",
        orderDate: "2022-03-12",
        returnCreation: "2022-02-20",
        currency: "EUR",
        expirationDate: "2024-05-09",
        status: "Approved",
        download: "None",
      },
    ]);
    onMounted(() => {});

    function navigateToCreateReturn() {
      router.push("/returns/create-return");
    }
    return { returnColumns, returnData, navigateToCreateReturn };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
