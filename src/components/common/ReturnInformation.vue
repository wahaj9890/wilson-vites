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
      <!-- <table
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
      </table> -->

      <table
        v-if="showReturnInfo"
        class="w-full table-auto border border-gray-300 border-separate border-slate-400"
      >
        <thead>
          <th
            v-for="column in informationDetailsCols"
            :key="column.key"
            class="px-4 py-2"
          >
            {{ column.label }}
          </th>
        </thead>
        <tbody>
          <tr v-for="(row, index) in receiveReturnDetails" :key="index">
            <td
              v-for="column in informationDetailsCols"
              :key="column.key"
              class="border px-4 py-2"
            >
              {{ getNestedValue(row, column.key) }}
              <!-- {{ row[column.key] }} -->
            </td>
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
import { useStore } from "vuex";

export default {
  name: "ReturnInformation",
  setup() {
    const store = useStore();
    const showReturnInfo = ref(true);
    const informationDetailsCols = ref([
      {
        key: "customerNumber",
        label: "Customer No.",
      },
      {
        key: "orderId",
        label: "Order No.",
      },
      {
        key: "articleNumber",
        label: "Article No.",
      },
      {
        key: "price",
        label: "Price",
      },
      {
        key: "returnReason",
        label: "Return Reason",
      },
      {
        key: "createdOn",
        label: "Created ON",
      },
      {
        key: "returnOrderId",
        label: "Return Order No.",
      },
      {
        key: "returnCompensation",
        label: "Compensation",
      },
      {
        key: "rma",
        label: "RMA",
      },
      {
        key: "createdBy",
        label: "Created By",
      },
      {
        key: "registrationDate",
        label: "Date Registered",
      },
      {
        key: "isCoolingOff",
        label: "In cooling of",
      },
      {
        key: "condition",
        label: "Condition",
      },
    ]);
    const receiveReturnDetails = computed(
      () => store.state.technicalCheck.receiveReturnDetails || {}
    );
    const getNestedValue = (obj, key) => {
      // debugger;
      // Split the key by dots and traverse the object to get the nested value
      const keys = key.split(".");
      let nestedValue = obj;

      for (const k of keys) {
        // Check if the nestedValue is null or undefined
        if (nestedValue === null || nestedValue === undefined) {
          return "-";
        }

        nestedValue = nestedValue[k];
      }

      return nestedValue !== null && nestedValue !== undefined
        ? nestedValue
        : "-";
    };

    const toggleReturnInformation = () => {
      showReturnInfo.value = !showReturnInfo.value;
    };
    onMounted(() => {
      console.log(receiveReturnDetails.value);
      store.watch(
        () => store.state.technicalCheck.receiveReturnDetails,
        (newData) => {
          // debugger
          receiveReturnDetails.value = newData;
        }
      );
      console.log(receiveReturnDetails.value);
    });
    // store.watch(
    //   () => store.state.technicalCheck.receiveReturnDetails,
    //   (newData) => {
    //     receiveReturnDetails.value = newData;
    //   }
    // );
    return {
      showReturnInfo,
      informationDetailsCols,
      receiveReturnDetails,
      toggleReturnInformation,
      getNestedValue,
    };
  },
};
</script>
