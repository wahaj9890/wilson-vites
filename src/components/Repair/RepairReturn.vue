<template>
  <div>
    <SearchReturn />
    <div class="flex space-x-8 py-8">
      <ReturnInformation />

      <!-- Second table -->
      <div class="relative w-1/2">
        <div
          class="bg-gray-200 text-black cursor-pointer font-bold py-2 px-4 mb-4"
          @click="toggleRepair"
        >
          <span class="mr-2">CREATE REPAIR</span>
          <i
            :class="['float-right fas', showRepair ? 'fa-minus' : 'fa-plus']"
          ></i>
        </div>
        <table
          v-if="showRepair"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
        >
          <tbody>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Repair Result</td>
              <td class="p-2 font-bold">
                <select
                  v-model="selectedRepairResult"
                  class="w-full p-2 border cursor-pointer border-gray-300 rounded"
                >
                  <option value=""></option>
                  <option
                    v-for="(result, i) in repairResults"
                    :key="result.id"
                    :value="result.id"
                  >
                    {{ result.value }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Repair Comments</td>
              <td class="p-2 font-bold">
                <input
                  type="text"
                  v-model="repairComments"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Estimation Condition</td>
              <td class="p-2 font-bold">
                <select
                  v-model="repairEstimationCondition"
                  class="w-full p-2 cursor-pointer border border-gray-300 rounded"
                >
                  <option value=""></option>
                  <option
                    v-for="(result, i) in repairEstimationResults"
                    :key="result.key"
                    :value="result.key"
                  >
                    {{ result.value }}
                  </option>
                </select>
              </td>
            </tr>
            <!-- Add more rows for other fields as needed -->
          </tbody>
        </table>
        <button @click="saveRepair">Save</button>
        <button
          class="absolute bottom-0 right-0 py-2 px-4 bg-black text-white border border-gray-300 rounded"
        >
          Print Label
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import SearchReturn from "../common/SearchReturn.vue";
import ReturnInformation from "../common/ReturnInformation.vue";
import { LookupEnum } from "../../utils/lookup";
export default {
  name: "RepairReturn",
  components: {
    SearchReturn,
    ReturnInformation,
  },
  setup() {
    const store = useStore();
    const showRepair = ref(true);
    const isCompleted = ref(false);
    const repairEstimationCondition = ref(null);
    const selectedRepairResult = ref(null);
    const repairComments = ref(null);
    const repairEstimationResults = ref([
      { key: "notRepaired", value: "Not Repaired" },
      { key: "successfulRepair", value: "Successful Repair" },
      { key: "wrongItem", value: "Wrong Item" },
    ]);
    const receiveReturnDetails = computed(() => {
      return store.state.technicalCheck.receiveReturnDetails;
    });
    const repairResults = computed(() => {
      return store.state.repair?.lookupDetails?.lookupTypeRepairResult?.data;
    });
    const toggleRepair = () => {
      showRepair.value = !showRepair.value;
    };
    const saveRepair = () => {
      isCompleted.value = true;
      const payload = {
        returnOrderId: receiveReturnDetails.value.id,
        estimatedCondition: repairEstimationCondition.value,
        repairComments: repairComments.value,
        repairResultId: selectedRepairResult.value,
        isCompleted: isCompleted.value,
      };
      store.dispatch("repair/saveRepair", payload);
    };
    onMounted(async () => {
      let lookupTypeOnOffTest = LookupEnum.OnOffTest;
      let lookupTypeRepairResult = LookupEnum.RepairResult;
      await store.dispatch("repair/fetchLookUpData", {
        type: "lookupTypeOnOffTest",
        payload: lookupTypeOnOffTest,
      });
      await store.dispatch("repair/fetchLookUpData", {
        type: "lookupTypeRepairResult",
        payload: lookupTypeRepairResult,
      });
    });

    return {
      repairResults,
      showRepair,
      repairEstimationResults,
      repairComments,
      isCompleted,
      selectedRepairResult,
      receiveReturnDetails,
      repairEstimationCondition,
      toggleRepair,
      saveRepair,
    };
  },
};
</script>
