<!-- <template>
  <div>
    <div class="flex items-center space-x-4">
    
      <div class="flex flex-col">
        <label for="input1" class="text-sm text-gray-600 mb-1"
          >ORDER NUMBER</label
        >
        <div class="relative">
          <input
            id="input1"
            type="text"
            placeholder="Enter text"
            class="w-64 px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
          
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="input1" class="text-sm text-gray-600 mb-1"
          >CUSTOMER NUMBER</label
        >
        <div class="relative">
          <input
            id="input1"
            type="text"
            placeholder="Enter text"
            class="w-64 px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
           
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="input1" class="text-sm text-gray-600 mb-1"
          >INVOICE NUMBER</label
        >
        <div class="relative">
          <input
            id="input1"
            type="text"
            placeholder="Enter text"
            class="w-64 px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
           
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <label for="input1" class="text-sm text-gray-600 mb-1"
          >CUSTOMER REFERENCE NUMBER
        </label>
        <div class="relative">
          <input
            id="input1"
            type="text"
            placeholder="Enter text"
            class="w-64 px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
           
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      

   
      <div class="flex flex-col">
        <label for="input5" class="text-sm text-gray-600 mb-1"
          >TRACKING NUMBER</label
        >
        <div class="relative">
          <input
            id="input5"
            type="text"
            placeholder="Enter text"
            class="w-64 px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
           
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      
      <button class="bg-yellow-500 w-64 px-4 py-2 mt-5 text-white">
        Search
      </button>
    </div>
    <div class="flex items-center space-x-4  mt-4">
     
      <label for="orderBy" class="text-sm text-gray-600 mb-1">Order By</label>

      
      <div class="relative">
        <select
          id="orderBy"
          class="w-64 px-3 py-2 border border-gray-300"
        >
          
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
          
          <i class="fas fa-chevron-down text-gray-500"></i>
        </div>
      </div>
    </div>
  </div>
</template> -->
<template>
  <div>
    <p class="font-bold underline md:hidden">Welcome in Wilson</p>
    <p class="font-bold mt-4 text-2xl">Search for</p>
    <div class="md:flex items-center space-x-4 pt-2">
      <!-- Input Box 1 -->
      <div class="mb-4 md:w-1/4">
        <label for="orderNumber" class="uppercase text-sm text-gray-600 mb-1"
          >order number</label
        >
        <div class="relative">
          <input
            id="orderNumber"
            type="text"
            v-model="orderNumber"
            placeholder="Order number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label for="customerNumber" class="uppercase text-sm text-gray-600 mb-1"
          >customer number</label
        >
        <div class="relative">
          <input
            id="customerNumber"
            type="text"
            v-model="customerNumber"
            placeholder="Customer number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <!-- Search Icon for Input 1 -->
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label for="invoiceNumber" class="uppercase text-sm text-gray-600 mb-1"
          >invoice number</label
        >
        <div class="relative">
          <input
            id="invoiceNumber"
            type="text"
            v-model="invoiceNumber"
            placeholder="Invoice number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <!-- Search Icon for Input 1 -->
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>
      <div class="mb-4 md:w-1/4">
        <label
          for="customerReferenceNumber"
          class="uppercase text-sm text-gray-600 mb-1"
          >customer reference number</label
        >
        <div class="relative">
          <input
            id="customerReferenceNumber"
            type="text"
            v-model="customerReferenceNumber"
            placeholder="Customer reference ..."
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <!-- Search Icon for Input 1 -->
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <div class="mb-4 md:w-1/4">
        <label for="trackingNumber" class="uppercase text-sm text-gray-600 mb-1"
          >tracking number</label
        >
        <div class="relative">
          <input
            id="trackingNumber"
            type="text"
            v-model="trackingNumber"
            placeholder="Tracking number"
            class="w-full px-3 py-2 border border-gray-300"
          />
          <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
            <!-- Search Icon for Input 5 -->
            <i class="fas fa-search text-gray-500"></i>
          </div>
        </div>
      </div>

      <button
        class="bg-[#F3E43E] w-full md:w-auto px-12 py-2 text-black font-semibold"
        @click="searchOrder"
      >
        Search
      </button>
    </div>
    <!-- Dropdown Label and Dropdown -->
    <div class="mb-4 md:flex items-center justify-end space-x-4">
      <label for="orderBy" class="text-sm text-black font-bold mb-1"
        >Order By:</label
      >
      <div class="relative">
        <select
          id="orderBy"
          class="w-full md:w-auto pl-7 pr-2 py-2 border border-gray-300"
        >
          <!-- Add options for the dropdown as needed -->
          <option value="option1">Latest date</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <!-- <div class="absolute top-1/2 right-3 transform -translate-y-1/2">
          <i class="fas fa-chevron-down text-gray-500"></i>
        </div> -->
      </div>
    </div>
    <ReturnDetails  />
  </div>
</template>

<script>
// import { httpGet, httpPost } from "../../utils/request";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ReturnDetails from "../Return/ReturnDetails.vue";
export default {
  name: "ReturnSearch",
  components: {
    ReturnDetails,
  },
  setup() {
    const store = useStore();

    const orderNumber = ref("");
    const invoiceNumber = ref("");
    const customerNumber = ref("");
    const customerReferenceNumber = ref("");
    const trackingNumber = ref("");
    const orderDetailsParams = ref({});

    function searchOrder() {
      const payload = {
        orderId: orderNumber.value,
        customerNumber: customerNumber.value,
        invoiceNumber: invoiceNumber.value,
        customerReferenceNumber: customerReferenceNumber.value,
        orderTrackingNumber: trackingNumber.value,
      };
      store.dispatch("searchReturnAction",  payload );
      store.dispatch("storeData", payload);
    }
    return {
      searchOrder,
      orderNumber,
      customerNumber,
      customerReferenceNumber,
      invoiceNumber,
      trackingNumber,
    };
  },
};
</script>
