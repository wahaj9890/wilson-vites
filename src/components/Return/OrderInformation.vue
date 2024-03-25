
<template>
  <div>
    <div class="p-8">
      <div
        class="flex items-center justify-between mb-4 bg-white-500 text-black p-3"
      >
        <button
          class="flex items-center space-x-1 text-black-500"
          @click="backToSearch"
        >
          <i class="fas fa-arrow-left mr-3"></i> Back to Search
        </button>

        <div class="flex items-center space-x-4">
          <button
            class="flex items-center space-x-1 text-gray-500 bg-[#F3E43E] p-2 rounded"
            @click="showH"
          >
            Reclamation History
          </button>

          <span>
            <i class="fas fa-cog"></i>
          </span>
        </div>
      </div>

      <div
        class="flex items-center justify-between mb-4 bg-[#DDDDDD] cursor-pointer p-3"
        @click="toggleCardVisibility"
      >
        <h2 class="text-xl font-bold">Order Information</h2>
        <i :class="['fas', cardVisible ? 'fa-minus' : 'fa-plus']"></i>
      </div>

      <div class="flex items-center mb-4 bg-[#DDDDDD] p-3" v-if="cardVisible">
        <input
          type="checkbox"
          class="form-checkbox h-5 w-5 text-blue-500"
          v-model="selectAllCheckBox"
          @click="selectAllItemsToReturn"
        />
        <h2 class="text-xl ml-3">Select all items</h2>
      </div>
      <div
        v-if="showSpinner && cardVisible"
        class="flex items-center justify-center"
      >
        <div
          class="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-violet-500"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      <transition name="fade">
        <div v-if="cardVisible" class="grid grid-cols-4 gap-4">
          <div
            :class="[
              'flex justify-between p-4',
              index % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-[#DDDDDD]',
            ]"
            v-for="(orderItem, index) in combinedOrderItems"
            :key="orderItem.articleNumber"
            @click="openSidebar(orderItem.articleNumber)"
          >
            <div>
              <h3 class="text-lg font-bold">{{ orderItem.articleNumber }}</h3>
              <p v-if="orderItem.quantity">Qty: {{ orderItem.quantity }}</p>
              <div class="flex items-center mb-2">
                <input
                  v-model="checkBoxSelected[index]"
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-blue-500"
                  :disabled="orderItem.isKittingMaster || orderItem.isSetMaster"
                  @change="checkBoxChanged(index, $event, orderItem)"
                />
                <p v-if="orderItem.articleDescription" class="ml-2 truncate">
                  {{ orderItem.articleDescription }}
                </p>
              </div>
              <div
                class="flex items-center mt-2"
                v-if="orderItem.source == 'returnOrderItems'"
              >
                <!-- <img :src="fileIcon" alt="file Icon" /> -->

                <!-- <span class="underline ml-2"> Download Manual</span> --> 
                <div
                  class="bg-yellow-300 flex items-center justify-center w-4 h-4 mr-2 cursor-pointer"
                >
                  <img :src="edits" alt="Edit Icon" />
                </div>

                <div
                  class="flex items-center justify-center w-4 h-4 cursor-pointer"
                >
                <img :src="files" alt="file Icon" />

                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <img alt="Product Image" class="w-24 h-24" />
            </div>
          </div>
        </div>
      </transition>
      <!-- <ViewArticleDetails
        v-if="isSidebarOpen"
        :selectedArticleNumber="selectedArticleNumber"
        :isSidebarOpen="isSidebarOpen"
        @closeed="closeSidebar"
      /> -->
      <ReclamationHistory
        v-if="showReclamationHistory"
        :closeDialog="closeDialog"
        :returnOrderId="returnOrderId"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { eventBus } from "../../utils/eventBus";
import ViewArticleDetails from "../common/ViewArticleDetails.vue";
import ReclamationHistory from "../common/ReclamationHistory.vue";
import edit from "../../assets/images/edit.svg";
import file from "../../assets/images/file.svg";
export default {
  name: "OrderInformation",
  components: {
    ViewArticleDetails,
    ReclamationHistory,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const cardVisible = ref(true);
    const checkBoxChecked = ref(false);
    const specificReasonSelected = ref(false);
    const selectAllCheckBox = ref(false);
    const edits = ref(edit);
    const files = ref(file);
    const route = useRoute();
    const returnOrderId = route.query.orderId;

    const isSidebarOpen = ref(false);
    const showReclamationHistory = ref(false);
    const selectedArticleNumber = ref("");
    // const orderInformation = computed(
    //   () => store.state.searchReturnOrder.orderItemsToReturn.orderItems || {}
    // );
    
    const orderInformation = ref([]);
    const returnOrderItems = ref([]);

    // const combinedOrderItems = computed(() => {
    //   const combinedItems = [
    //     ...orderInformation.value,
    //     ...returnOrderItems.value,
    //   ];
    //   return combinedItems;
    // });
    const combinedOrderItems = computed(() => {
      const combinedItems = [
        ...orderInformation.value.map((item) => ({
          ...item,
          source: "orderInformation",
        })),
        ...returnOrderItems.value.map((item) => ({
          ...item,
          source: "returnOrderItems",
        })),
      ];
      return combinedItems;
    });
    const showSpinner = computed(
      () => store.state.searchReturnOrder.showSpinner
    );
    const checkBoxSelected = ref([]);
    const payload = {
      referenceNumber: returnOrderId,
      orderItemId: "",
      culture: localStorage.getItem("userPreferredLanguage"),
    };
    const managePayload = {
      appRoleId: JSON.parse(localStorage.getItem("currentUser"))?.role?.id,
      orderId: returnOrderId,
    };
    const toggleCardVisibility = () => {
      cardVisible.value = !cardVisible.value;
    };
    const openSidebar = (articleNumber) => {
      isSidebarOpen.value = true;
      selectedArticleNumber.value = articleNumber;
    };

    const closeSidebar = () => {
      eventBus.emit("temp", {});
      isSidebarOpen.value = false;
      selectedArticleNumber.value = "";
    };
    const handleCreate = () => {
      console.log("Child has been created.");
    };
    let allSelectedIndex = [];
    const checkBoxChanged = (index, event, orderItem) => {
      if (event.target.checked) {
        allSelectedIndex.push(index);
      } else {
        const indexToRemove = allSelectedIndex.indexOf(index);
        if (indexToRemove !== -1) {
          allSelectedIndex.splice(indexToRemove, 1);
        }
      }
      checkBoxChecked.value = checkBoxSelected.value[index];
      eventBus.emit("specificReasonSelectedChanged", {
        value: specificReasonSelected.value,
        checked: checkBoxChecked.value,
        index: allSelectedIndex,
        orderItem,
      });
    };

    function backToSearch() {
      router.push("/returns");
    }
    const showH = () => {
      showReclamationHistory.value = !showReclamationHistory.value;
    };
    const closeDialog = () => {
      showReclamationHistory.value = false;
    };
    const selectAllItemsToReturn = () => {
      // checkBoxSelected.value = orderInformation.value.map((item,index) => !selectAllCheckBox.value);
      // allSelectedIndex.push(index)
      checkBoxSelected.value = orderInformation.value.map((item, index) => {
        const isSelected = !selectAllCheckBox.value;
        if (isSelected && !allSelectedIndex.includes(index)) {
          allSelectedIndex.push(index);
        } else if (!isSelected) {
          const indexToRemove = allSelectedIndex.indexOf(index);
          if (indexToRemove !== -1) {
            allSelectedIndex.splice(indexToRemove, 1);
          }
        }
        return isSelected;
      });
      eventBus.emit("specificReasonSelectedChanged", {
        value: specificReasonSelected.value,
        index: allSelectedIndex,
        orderItem: null, // No specific order item for the "Select all items" case
      });
    };
    onMounted(async () => {
      await store.dispatch("searchReturnOrder/getOrdersToReturn", payload);
      await store.dispatch("mergeReturns/manageReturnAction", managePayload);

      // orderInformation.value =
      //   store.state.searchReturnOrder.orderItemsToReturn.orderItems;
      orderInformation.value =
        store.state.searchReturnOrder.orderItemsToReturn.orderItems || [];
      returnOrderItems.value = store.state.mergeReturns.manageReturns || [];
    });
    return {
      orderInformation,
      combinedOrderItems,
      returnOrderItems,
      checkBoxSelected,
      checkBoxChecked,
      cardVisible,
      specificReasonSelected,
      isSidebarOpen,
      selectedArticleNumber,
      showReclamationHistory,
      returnOrderId,
      showSpinner,
      selectAllCheckBox,
      edits,
      files,
      openSidebar,
      closeSidebar,
      checkBoxChanged,
      backToSearch,
      toggleCardVisibility,
      handleCreate,
      showH,
      closeDialog,
      selectAllItemsToReturn,
    };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
