<template>
  <div>
    <SearchReturn />
    <div class="flex space-x-8 py-8">
      <ReturnInformation />

      <!-- Second table -->
      <div class="relative w-1/2">
        <div
          @click="toggleReturnInspection"
          class="bg-[#DDDDDD] text-black cursor-pointer font-bold py-2 px-4 mb-4"
        >
          <span class="mr-2">CREATE RETURN INSPECTION</span>
          <i
            :class="[
              'float-right fas',
              showReturnInspection ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </div>
        <table
          v-if="showReturnInspection"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
        >
          <tbody>
            <tr
              v-for="(item, index) in returnInspectionCols"
              :key="index"
              :class="[
                ' text-black mb-2',
                index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-[#F7F7F7]',
              ]"
            >
              <td class="p-2 font-bold w-1/4">{{ item.label }}</td>
              <td v-if="returnInspectionResults">{{ returnInspectionResults[item.key] }}</td>
            </tr>
          </tbody>
          <!-- <tbody>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold"></td>
              <td class="p-2 font-bold">
                <select class="w-full p-2 border border-gray-300 rounded">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Technician Comments:</td>
              <td class="p-2 font-bold">
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                />
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Estimation Condition:</td>
              <td class="p-2 font-bold">
                <select class="w-full p-2 border border-gray-300 rounded">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </td>
            </tr>
          </tbody> -->
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import SearchReturn from "../common/SearchReturn.vue";
import ReturnInformation from "../common/ReturnInformation.vue";
export default {
  name: "ReturnInspectionDetails",
  components: {
    SearchReturn,
    ReturnInformation,
  },
  setup() {
    const store = useStore();
    const showReturnInspection = ref(true);
    const toggleReturnInspection = () => {
      showReturnInspection.value = !showReturnInspection.value;
    };
    const returnInspectionCols = ref([
      { key: "returnOrderId", label: "Return Order Id" },
      {
        key: "returnInspectionCompensation",
        label: "Trigger Final Compensation",
      },
      { key: "createdBy", label: "Created By" },
      { key: "createdOn", label: "Date Inspection" },
      { key: "createdOn", label: "Owner Number" },
      { key: "returnInspectionConditionCode", label: "Condition Code" },
      { key: "returnInspectionAction", label: "Follow-up action stock transfer" },
      { key: "userComment", label: "Comments" },
      // Add more columns as needed
    ]);
    store.watch(
      () => store.state.technicalCheck.returnDeliveryDetails,
      (newData) => {
        if (newData) {
          let payload = {
            returnOrderId: newData,
          };
          store.dispatch("returnInspection/getReturnInspectionData", payload);
        }
      }
    );
    const returnInspectionResults = computed(() => {
      return store.state.returnInspection.returnInspectionDetails;
    });
    onMounted(() => {});
    return {
      returnInspectionCols,
      showReturnInspection,
      returnInspectionResults,
      toggleReturnInspection,
    };
  },
};
</script>
