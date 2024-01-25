<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="closed">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl"
            >
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-gray-900"
                    >
                      Reclamation History
                    </DialogTitle>
                    <div class="mt-2">
                      <table class="w-full">
                        <thead>
                          <th
                            v-for="column in reclamationHistoryColumns"
                            :key="column.key"
                            class="px-4 py-2"
                          >
                            {{ column.label }}
                          </th>
                        </thead>
                        <tbody class="max-h-96 overflow-y-auto">
                          <tr
                            v-for="(
                              row, index
                            ) in formattedReclamationHistoryRows"
                            :key="index"
                          >
                            <td
                              v-for="column in reclamationHistoryColumns"
                              :key="column.key"
                              class="border px-4 py-2"
                            >
                              <!-- {{ formatValue(row[column.key]) }} -->
                              {{
                                row[column.key] !== null &&
                                row[column.key] !== undefined
                                  ? row[column.key]
                                  : "-"
                              }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click="closed"
                  ref="cancelButtonRef"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
export default {
  name: "ReclamationHistory",
  props: {
    closeDialog: Function,
    returnOrderId: String,
  },
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
  setup(props) {
    const store = useStore();

    const open = ref(true);
    const reclamationHistoryDetails = computed(
      () => store.state.reclamationHistory.reclamationHistoryDetails || null
    );
    const reclamationHistoryColumns = ref([
      { key: "articleNumber", label: "Article Number" },
      { key: "returnUserDescription", label: "Return User Description" },
      { key: "carrier", label: "Carrier" },
      { key: "createdDate", label: "Date Register" },
      // Add more columns as needed
    ]);
    const reclamationHistoryRows = ref([
      {
        id: 1,
        articleNumber: 1,
        returnUserDescription: "",
        carrier: "Carrier A",
        createdDate: "2023-03-21T06:21:18.495280",
      },
    ]);
    const closed = () => {
      open.value = false;
      props.closeDialog();
    };
    const payload = {
      referenceNumber: props.returnOrderId,
    };
    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    // const formatValue = (value) => {
    //   value || "-";
    // };

    onMounted(async () => {
      await store
        .dispatch("reclamationHistory/getReclamationHistory", payload)
        .then(() => {});
    });
    const formattedReclamationHistoryRows = computed(() => {
      return reclamationHistoryDetails?.value?.map((row) => ({
        ...row,
        createdDate: formatDate(row.createdDate),
      }));
    });

    return {
      open,
      reclamationHistoryColumns,
      reclamationHistoryRows,
      reclamationHistoryDetails,
      formattedReclamationHistoryRows,
      formatDate,
      closed,
      // formatValue,
    };
  },
};
</script>

<style scoped>
/* Your styles go here */
</style>
