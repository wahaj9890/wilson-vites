<template>
  <div>
    <SearchReturn />
    <div class="flex space-x-8 py-8">
      <ReturnInformation />
      <div class="relative w-1/2">
        <div
          class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
          @click="toggleTechnicalCheck"
        >
          <span class="mr-2">{{
            isStepAllowed ? "CREATE TECHNICAL CHECK" : "TECHNICAL CHECK SUMMARY"
          }}</span>
          <i
            :class="[
              'float-right fas',
              showTechnicalCheck ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </div>
        <table
          v-if="showTechnicalCheck && isStepAllowed"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
        >
          <tbody v-if="technicalCheckResults">
            <tr class="bg-[#F0F0F0] text-black mb-2">
              <td class="p-2 font-bold">Technical Check Result:</td>
              <td class="p-2 font-bold">
                <select
                  class="w-full p-2 border border-gray-300 cursor-pointer rounded"
                  v-model="selectedTechnicalResult"
                >
                  <option value=""></option>
                  <option
                    v-for="(result, i) in technicalCheckResults"
                    :key="result.id"
                    :value="result.id"
                  >
                    {{ result.value }}
                  </option>
                </select>
              </td>
            </tr>
            <tr class="bg-[#F7F7F7] text-black mb-2">
              <td class="p-2 font-bold">Technician Comments:</td>
              <td class="p-2 font-bold">
                <input
                  type="text"
                  v-model="technicianComments"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </td>
            </tr>
            <tr class="bg-[#F0F0F0] text-black mb-2">
              <td class="p-2 font-bold">Estimation Condition:</td>
              <td class="p-2 font-bold">
                <select
                  class="w-full p-2 border border-gray-300 rounded"
                  v-model="selectedEstCondition"
                >
                  <option value=""></option>
                  <option
                    v-for="(estimation, i) in estimationConditions"
                    :key="estimation.key"
                    :value="estimation.key"
                  >
                    {{ estimation.value }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          v-if="showTechnicalCheck && !isStepAllowed"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
         >
          <tbody>
            <tr
              v-for="(item, index) in returnTechnicalCheckCols"
              :key="index"
              :class="[
                ' text-black mb-2',
                index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-[#F7F7F7]',
              ]"
            >
              <td class="p-2 font-bold w-1/4">{{ item.label }}</td>

              <td v-if="maskTechnicalResult">
                {{ maskTechnicalResult[item.key] }}
              </td>
            </tr>
          </tbody>
        </table>
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
import { ref, computed, onMounted, toRaw } from "vue";
import { useStore } from "vuex";
import { eventBus } from "../../utils/eventBus";
import SearchReturn from "../common/SearchReturn.vue";
import ReturnInformation from "../common/ReturnInformation.vue";

export default {
  name: "SearchTechnicalCheck",
  components: { SearchReturn, ReturnInformation },
  setup() {
    const store = useStore();
    const selectedEstCondition = ref(null);
    const technicianComments = ref(null);
    const selectedTechnicalResult = ref(null);
    const isCompleted = ref(false);
    const showTechnicalCheck = ref(true);
    const returnTechnicalCheckCols = ref([
      { key: "technicalCheckResultValue", label: "Technical Check" },
      {
        key: "estimatedCondition",
        label: "Estimation Condition",
      },
      { key: "technicianComments", label: "Technician Comments" },
      { key: "createdOn", label: "Created On" },
      { key: "createdBy", label: "Created By" },
    ]);
    const receiveReturnDetails = computed(() => {
      return store.state.technicalCheck.receiveReturnDetails;
    });
    const isStepAllowed = computed(() => {
      return store.state.technicalCheck.isStepAllowed;
    });
    const maskTechnicalResult = computed(() => {
      return store.state.technicalCheck?.maskDataReturnOrder
        ?.maskTechnicalCheck;
    });
    const technicalCheckResults = computed(() => {
      return store.state.technicalCheck?.lookupDetails
        ?.lookupTypeTechnicalCheckResult?.data;
    });
    const estimationConditions = ref([
      { key: "A", value: "A" },
      { key: "B", value: "B" },
      { key: "C", value: "C" },
      { key: "D", value: "D" },
      { key: "OGP", value: "OGP" },
    ]);
    const toggleTechnicalCheck = () => {
      showTechnicalCheck.value = !showTechnicalCheck.value;
    };
    const submitTechnicalCheck = async () => {
      isCompleted.value = true;
      const payload = {
        returnOrderId: receiveReturnDetails.value.id,
        estimatedCondition: selectedEstCondition.value,
        technicianComments: technicianComments.value,
        technicalCheckResultId: selectedTechnicalResult.value,
        isCompleted: isCompleted.value,
      };
      await store.dispatch("technicalCheck/saveTechnicalCheck", payload);
      // notification have to call here
    };

    onMounted(() => {});
    eventBus.on("submitTechnicalCheck", () => {
      submitTechnicalCheck();
    });
    return {
      showTechnicalCheck,
      technicalCheckResults,
      estimationConditions,
      selectedTechnicalResult,
      technicianComments,
      selectedEstCondition,
      isCompleted,
      isStepAllowed,
      returnTechnicalCheckCols,
      maskTechnicalResult,
      toggleTechnicalCheck,
      submitTechnicalCheck,
    };
  },
};
</script>
