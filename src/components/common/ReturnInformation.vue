<template>
  <div class="relative w-1/2">
    <div
      @click="toggleReturnInformation"
      class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
    >
      <span class="mr-2">RETURN INFORMATION</span>
      <i
        :class="['float-right fas', showReturnInfo ? 'fa-minus' : 'fa-plus']"
      ></i>

      <!-- <span class="text-2xl float-right">+</span> -->
    </div>
    <transition name="fade">
      <table
        v-if="showReturnInfo"
        class="w-full table-auto border border-gray-300 border-separate border-slate-400"
      >
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
    </transition>
    <div class="flex space-x-4 mt-4">
      <button class="py-2 px-8 bg-[#F3E43E]">Save</button>
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
    const showReturnInfo = ref(true);
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

    const toggleReturnInformation = () => {
      showReturnInfo.value = !showReturnInfo.value;
    };
    return { showReturnInfo, informationDetails, toggleReturnInformation };
  },
};
</script>
