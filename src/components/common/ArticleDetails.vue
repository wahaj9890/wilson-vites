
    
  <script setup>
import { onMounted, ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const showModal = ref(false);
const articleDetailsResponse = computed(
  () => store.state.reclamationHistory.articleDetails || null
);
const isLoading = ref(true);
const isArray = ref((arr) => Array.isArray(arr));
const props = defineProps({
  selectedArticleNumber: String,
  closeDialog: Function,
});
const returnColumns = ref([
  {
    key: "articleNumber",
    label: "Article No.",
  },
  {
    key: "articleDescription",
    label: "Article Description",
  },
  {
    key: "ean",
    label: "EAN",
  },
  {
    key: "width",
    label: "Width",
  },
  {
    key: "length",
    label: "Length",
  },
  {
    key: "height",
    label: "Height",
  },
  {
    key: "weightKg",
    label: "WeightKg",
  },
  {
    key: "packageContents",
    label: "Package Contents",
  },
  {
    key: "itemCharacteristics",
    label: "Item Characteristics",
  },
]);
const closeModal = () => {
  showModal.value = false;
  props.closeDialog();
};
const payload = props.selectedArticleNumber;
onMounted(async () => {
  await store
    .dispatch("reclamationHistory/getArticleDetails", payload)
    .then(() => {});
  // You can trigger the modal opening here if needed
});
</script>
    
<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-gray-900 bg-opacity-50"
  >
    <transition name="fade">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl flex">
        <div class="w-1/2">
          <table
            v-if="articleDetailsResponse"
            class="w-96 table-auto border border-gray-300 border-separate border-slate-400"
           >
            <tbody>
              <tr
                v-for="(column, index) in returnColumns"
                :key="index"
                class="bg-gray-200 text-black mb-2"
              >
                <td class="p-2 font-bold">
                  {{ column.label }}
                </td>
                <td class="p-2">
                  <template v-if="isArray(articleDetailsResponse[column.key])">
                    <ul  class="list-disc pl-4">
                      <li
                        v-for="item in articleDetailsResponse[column.key]"
                        :key="item"
                      >
                        {{ item.contentText }}
                      </li>
                    </ul>
                  </template>
                  <template v-else>
                    {{
                      articleDetailsResponse &&
                      articleDetailsResponse[column.key] !== undefined
                        ? articleDetailsResponse[column.key]
                        : "-"
                    }}
                  </template>

                  <!-- {{
                    articleDetailsResponse &&
                    articleDetailsResponse[column.key] !== undefined
                      ? articleDetailsResponse[column.key]
                      : "-"
                  }} -->
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else-if="isLoading">Loading data...</p>
          <button
            @click="closeModal"
            class="mt-4 p-3 w-full text-center text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md focus:outline-none"
          >
            Close
          </button>
        </div>

        <div
          v-if="articleDetailsResponse"
          class="w-1/2 flex justify-center items-center"
        >
          <img
            :src="articleDetailsResponse?.value?.imageUrl"
            alt="Image"
            class="max-w-full h-auto"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

  <style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
  