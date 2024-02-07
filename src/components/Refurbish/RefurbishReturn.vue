<template>
  <div>
    <SearchReturn />
    <div class="flex space-x-8 py-8">
      <ReturnInformation />

      <!-- Second table -->
      <div class="relative w-1/2">
        <div
          class="bg-gray-200 text-black font-bold cursor-pointer py-2 px-4 mb-4"
          @click="toggleRefurbish"
        >
          <span class="mr-2">CREATE REFURBISH</span>
          <i
            :class="['float-right fas', showRefurbish ? 'fa-minus' : 'fa-plus']"
          ></i>
        </div>
        <table
          v-if="showRefurbish"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
        >
          <tbody>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">On-Off Test</td>
              <td class="p-2 font-bold">
                <select
                  v-model="selectedOnOffTest"
                  class="w-full p-2 border border-gray-300 cursor-pointer rounded"
                >
                  <option
                    v-for="(result, i) in onOffTestResult"
                    :key="result.id"
                    :value="result.id"
                  >
                    {{ result.value }}
                  </option>
                  <!-- Add more options as needed -->
                </select>
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Refurbish Results</td>
              <td class="p-2 font-bold">
                <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                <select
                  v-model="selectedRefurbishResult"
                  class="w-full p-2 border border-gray-300 cursor-pointer rounded"
                >
                  <option
                    v-for="(result, i) in refurbishResults"
                    :key="result.id"
                    :value="result.id"
                  >
                    {{ result.value }}
                  </option>
                  <!-- Add more options as needed -->
                </select>
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Refurbish Comments</td>
              <td class="p-2 font-bold">
                <!-- Input box here (replace this with your Vue.js input component) -->
                <input
                  type="text"
                  v-model="selectedRefurbishComments"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </td>
            </tr>

            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Estimation Condition</td>
              <td class="p-2 font-bold">
                <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                <select
                  v-model="selectedEstimationCondition"
                  class="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <!-- Add more options as needed -->
                </select>
              </td>
            </tr>
            <!-- Add more rows for other fields as needed -->
          </tbody>
        </table>
        <button @click="saveRefurbish">Save</button>
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import SearchReturn from "../common/SearchReturn.vue";
import ReturnInformation from "../common/ReturnInformation.vue";
import { LookupEnum } from "../../utils/lookup";

export default {
  name: "RefurbishReturn",
  components: {
    SearchReturn,
    ReturnInformation,
  },
  setup() {
    const store = useStore();
    const showRefurbish = ref(true);
    const isCompleted = ref(true);
    const selectedOnOffTest = ref(null);
    const selectedRefurbishResult = ref(null);
    const selectedRefurbishComments = ref(null);
    const selectedEstimationCondition = ref(null);
    const toggleRefurbish = () => {
      showRefurbish.value = !showRefurbish.value;
    };
    const receiveReturnDetails = computed(() => {
      return store.state.technicalCheck.receiveReturnDetails;
    });
    const onOffTestResult = computed(() => {
      return store.state.refurbish?.lookupDetails?.lookupTypeOnOffTest?.data;
    });
    const refurbishResults = computed(() => {
      return store.state.refurbish?.lookupDetails?.lookupTypeRefurbishResult
        ?.data;
    });

    const saveRefurbish = () => {
      isCompleted.value = true;
      const payload = {
        returnOrderId: receiveReturnDetails.value.id,
        onOffTestId: selectedOnOffTest.value,
        refurbishResultId: selectedRefurbishResult.value,
        estimatedCondition: selectedEstimationCondition.value,
        refurbishComments: selectedRefurbishComments.value,
        isCompleted: isCompleted.value,
      };
      store.dispatch("refurbish/saveRefurbish", payload);
    };
    onMounted(async () => {
      let lookupTypeOnOffTest = LookupEnum.OnOffTest;
      let lookupTypeRefurbishResult = LookupEnum.RefurbishResult;
      await store.dispatch("refurbish/fetchLookUpData", {
        type: "lookupTypeOnOffTest",
        payload: lookupTypeOnOffTest,
      });
      await store.dispatch("refurbish/fetchLookUpData", {
        type: "lookupTypeRefurbishResult",
        payload: lookupTypeRefurbishResult,
      });
    });
    return {
      showRefurbish,
      refurbishResults,
      onOffTestResult,
      selectedOnOffTest,
      selectedRefurbishResult,
      selectedRefurbishComments,
      selectedEstimationCondition,
      receiveReturnDetails,
      toggleRefurbish,
      saveRefurbish,
    };
  },
};
</script>
