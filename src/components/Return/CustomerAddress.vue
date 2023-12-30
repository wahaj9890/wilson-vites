<template>
  <div>
    <div class="flex space-x-8 p-8">
      <div class="relative w-1/2">
        <div
          @click="toggleCustomerAddress"
          class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
        >
          <span class="mr-2">CUSTOMER ADDRESS</span>
          <i
            :class="[
              'float-right fas',
              showCustomerAddress ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </div>
        <transition name="fade">
          <table
            v-if="showCustomerAddress"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Name</td>
                <td class="p-2">Wqahaj baba</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Street</td>
                <td class="p-2">near airptor road</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Postal Code</td>
                <td class="p-2">1000177454</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">City</td>
                <td class="p-2">Ned</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Country</td>
                <td class="p-2">Ind</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Addition Info.</td>
                <td class="p-2">-</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Article No.</td>
                <td><button>Add new Address</button></td>
              </tr>

              <!-- Add more rows for other fields as needed -->
            </tbody>
          </table>
        </transition>
        <div class="flex space-x-4 mt-4">
          <button
            class="py-2 px-4 bg-yellow-500 border border-gray-300 rounded"
          >
            Save
          </button>
          <button class="py-2 px-4 bg-white border border-gray-300 rounded">
            Cancel
          </button>
        </div>
      </div>

      <div class="relative w-1/2">
        <div
          @click="toggleCustomerInformation"
          class="bg-[#DDDDDD] cursor-pointer text-black font-bold py-2 px-4 mb-4"
        >
          <span class="mr-2">RETURN INFORMATION</span>
          <i
            :class="[
              'float-right fas',
              showReturnInformation ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
          <!-- <span class="text-2xl float-right">+</span> -->
        </div>
        <transition name="fade">
          <table
            v-if="showReturnInformation"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Technical Check Result:</td>
                <td class="p-2 font-bold">
                  <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <!-- Add more options as needed -->
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Technician Comments:</td>
                <td class="p-2 font-bold">
                  <!-- Input box here (replace this with your Vue.js input component) -->
                  <input
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Estimation Condition:</td>
                <td class="p-2 font-bold">
                  <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <!-- Add more options as needed -->
                  </select>
                </td>
              </tr>
              <!-- Add more rows for other fields as needed -->
            </tbody>
          </table>
        </transition>
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
import { ref, computed } from "vue";
export default {
  name: "CustomerAddress",
  setup() {
    const showCustomerAddress = ref(false);
    const showReturnInformation = ref(false);
    const toggleCustomerInformation = () => {
      showReturnInformation.value = !showReturnInformation.value;
    };
    const toggleCustomerAddress = () => {
      showCustomerAddress.value = !showCustomerAddress.value;
    };
    return {
      showCustomerAddress,
      showReturnInformation,
      toggleCustomerInformation,
      toggleCustomerAddress,
    };
  },
};
</script>
