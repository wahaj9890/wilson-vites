<template>
  <div class="grid grid-cols-12 gap-4 items-center">
    <!-- Title -->
    <div class="col-span-12 mt-4">
      <p class="text-lg font-semibold">Search Return Delivery Number</p>
    </div>

    <!-- Search Bar -->
    <div class="col-span-12 flex items-center space-x-4">
      <!-- Search Input -->
      <div class="relative flex-grow">
        <input
          type="text"
          v-model="deliveryNumber"
          placeholder="Search..."
          class="w-full py-2 px-4 border border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m-1 0a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Search Button -->
      <button
        class="bg-[#F3E43E] py-2 px-12 text-black"
        @click="searchByDeliveryNumber"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "SearchReturn",
  setup() {
    const store = useStore();
    const deliveryNumber = ref("");

    const searchByDeliveryNumber = () => {};
    return {
      deliveryNumber,
      searchByDeliveryNumber,
    };
  },
};
</script>
