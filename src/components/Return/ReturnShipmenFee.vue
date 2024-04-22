<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const showReturnShipmentFee = ref(true);
const toggleReturnShipmenFee = () => {
  showReturnShipmentFee.value = !showReturnShipmentFee.value;
};
const shipmentFee = computed(() => store.state.mergeReturns.shipmentFee);

onMounted(() => {});
</script>

<template>
  <div class="relative w-1/2" v-if="shipmentFee">
    <div
      @click="toggleReturnShipmenFee"
      class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
    >
      <span class="mr-2">RETURN SHIPMENT FEE</span>
      <i
        :class="[
          'float-right fas',
          showReturnShipmentFee ? 'fa-minus' : 'fa-plus',
        ]"
      ></i>
    </div>
    <transition name="fade">
      <div v-if="showReturnShipmentFee">
        <p class="mb-2">
          Item 14121 cis eligible for a charge for return of
          {{ shipmentFee.returnShipmentFee }}€.
        </p>
        <p class="mb-2">
          Please notify customers this amount will be deducted from their refund
        </p>
        <div class="flex">
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2 rounded"
          >
            Accept
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>