<template>
  <div class="relative w-1/2">
    <div class="bg-[#DDDDDD] text-black font-bold py-2 px-4 mb-4">
      <span class="mr-2">RETURN INFORMATION</span>
      <span class="text-2xl float-right">+</span>
    </div>
    <table
      class="w-full table-auto border border-gray-300 border-separate border-slate-400"
    >
      <!-- <tbody>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Customer No.</td>
          <td class="p-2">1177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Order No.</td>
          <td class="p-2">12103213</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Customer No.</td>
          <td class="p-2">1177454</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Order No.</td>
          <td class="p-2">12103213</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
      </tbody> -->
      <tbody>
        <tr
          v-for="(item, index) in informationDetails"
          :key="index"
          :class="[
            ' text-black mb-2',
            index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-[#F7F7F7]',
          ]"
        >
          <td class="p-2 font-bold w-1/4">{{ item.label }}</td>
          <td class="p-2">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex space-x-4 mt-4">
      <button class="py-2 px-8 bg-[#F3E43E]">
        Save
      </button>
      <button class="py-2 px-8 bg-white text-black border border-black">
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, computed } from "vue";
export default {
  name: "ReturnInformation",
  setup() {
    const informationDetails = ref([
      {
        label: "Customer No.",
        value: "12346789",
      },
      {
        label: "Order No.",
        value: "12346789",
      },
      {
        label: "Article No.",
        value: "12346789",
      },
      {
        label: "Price",
        value: "12346789",
      },
      {
        label: "Return Reason",
        value: "12346789",
      },
      {
        label: "Created ON",
        value: "12346789",
      },
      {
        label: "Return Order No.",
        value: "12346789",
      },
      {
        label: "Compensation",
        value: "12346789",
      },
      {
        label: "RMA",
        value: "12346789",
      },
      {
        label: "Created By",
        value: "12346789",
      },
      {
        label: "Date Registered",
        value: "12346789",
      },
      {
        label: "In cooling of",
        value: "-",
      },
      {
        label: "Condition",
        value: "-",
      },
    ]);

    return { informationDetails };
  },
};
</script>
