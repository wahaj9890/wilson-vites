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
        <ReturnInfoTable
          v-if="receiveReturnDetails"
          :receiveReturnDetails="receiveReturnDetails"
        />
        <div v-else>No Data</div>
      </table>
    </transition>
    <div class="flex space-x-4 mt-4">
      <button class="py-2 px-8 bg-[#F3E43E]" @click="callTechnicalCheck">
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
import { useStore } from "vuex";
import { eventBus } from "../../utils/eventBus";
import ReturnInfoTable from "./ReturnInfoTable.vue";

export default {
  name: "ReturnInformation",
  components: {
    ReturnInfoTable,
  },
  setup() {
    const store = useStore();
    const showReturnInfo = ref(true);
    const receiveReturnDetails = computed(
      () => store.state.technicalCheck.receiveReturnDetails
    );

    const toggleReturnInformation = () => {
      showReturnInfo.value = !showReturnInfo.value;
    };
    const callTechnicalCheck = () => {
      eventBus.emit("submitTechnicalCheck");
    };
    onMounted(() => {});

    return {
      showReturnInfo,
      receiveReturnDetails,
      toggleReturnInformation,
      callTechnicalCheck,
    };
  },
};
</script>
