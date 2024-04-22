<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const showBankDetails = ref(false);
const nameOfAccountHolder = ref("");
const setIban = ref("");
const setSwifBc = ref("");
const nameOfBank = ref("");
const isCashOnDeliverys = ref(
  store.state.searchReturnOrder.getOrderDetails.isCashOnDelivery
);
console.log(isCashOnDeliverys)
const bankDetails = computed(
  () => store.state.searchReturnOrder.getOrderDetails.customerBankDetailsDto
);
const toggleBankDetails = () => {
  showBankDetails.value = !showBankDetails.value;
};
const bankInfoData = ref([
  {
    key: "accountHolderName",
    label: "Customer No.",
    value: bankDetails.value ? bankDetails.accountHolderName : "-",
  },
  {
    key: "bankName",
    label: "Customer No.",
    value: bankDetails.value ? bankDetails.bankName : "-",
  },
  {
    key: "ibaN_AccountNumber",
    label: "Customer No.",
    value: bankDetails.value ? bankDetails.ibaN_AccountNumber : "-",
  },
  {
    key: "swift_BIC",
    label: "Customer No.",
    value: bankDetails.value ? bankDetails.swift_BIC : "-",
  },
]);
onMounted(() => {
  // console.log(bankDetails);
});
</script>

<template>
  <div class="relative w-1/2" v-if="isCashOnDeliverys">
    <div
      @click="toggleBankDetails"
      class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
    >
      <span class="mr-2">BANK DETAILS</span>
      <i
        :class="['float-right fas', showBankDetails ? 'fa-minus' : 'fa-plus']"
      ></i>
    </div>
    <transition name="fade">
      <table
        v-if="showBankDetails"
        class="w-full table-auto border border-gray-300 border-separate border-slate-400"
      >
        <tbody>
          <tr class="bg-gray-200 text-black mb-2">
            <td class="p-2 font-bold">Name of Accound Holder:</td>
            <td v-if="bankDetails !== null">
              {{ bankDetails?.accountHolderName }}
            </td>
            <td class="p-2 font-bold" v-if="bankDetails == null">
              <input
                type="text"
                v-model="nameOfAccountHolder"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr class="bg-gray-100 text-black mb-2">
            <td class="p-2 font-bold">IBAN:</td>
            <td v-if="bankDetails !== null">
              {{ bankDetails?.ibaN_AccountNumber }}
            </td>
            <td class="p-2 font-bold" v-if="bankDetails == null">
              <input
                type="text"
                v-model="setIban"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr class="bg-gray-200 text-black mb-2">
            <td class="p-2 font-bold">SWIFT_BIC:</td>

            <td v-if="bankDetails !== null">{{ bankDetails?.swift_BIC }}</td>
            <td class="p-2 font-bold" v-if="bankDetails == null">
              <input
                type="text"
                v-model="setSwifBc"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
          <tr class="bg-gray-200 text-black mb-2">
            <td class="p-2 font-bold">NAME OF THE BANK:</td>
            <td v-if="bankDetails !== null">{{ bankDetails?.bankName }}</td>
            <td class="p-2 font-bold" v-if="bankDetails == null">
              <input
                type="text"
                v-model="nameOfBank"
                class="w-full p-2 border border-gray-300 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </transition>
    <button
      class="absolute bottom-0 right-0 py-2 px-4 bg-black text-white border border-gray-300 rounded"
    >
      Print Label
    </button>
  </div>
</template>