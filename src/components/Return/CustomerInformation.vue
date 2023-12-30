<template>
  <div>
    <div class="flex space-x-8 p-8">
      <div class="relative w-1/2">
        <div
          @click="toggleCustomerInformation"
          class="bg-gray-200 text-black font-bold py-2 px-4 mb-4 cursor-pointer"
        >
          <span class="mr-2">CUSTOMER INFORMATION</span>
          <i
            :class="[
              'float-right fas',
              showCustomerInformation ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </div>
        <transition name="fade">
          <table
            v-if="showCustomerInformation"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">First Name</td>
                <!-- <td class="p-2">{{ formatValue(customerDetails.firstName) }}</td> -->
                <td class="p-2">temp</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Last Name</td>
                <td class="p-2">gsdfg</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Email Address</td>
                <!-- <td class="p-2">{{ customerDetails.emailAddress }}</td> -->
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Alternate Email</td>
                <td class="p-2">test@gmail.com</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Telephone No.</td>
                <!-- <td class="p-2">{{ customerDetails.mobilePhoneNumber }}</td> -->
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Alternate No.</td>
                <td class="p-2">1000177454</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Invoice No.</td>
                <td class="p-2">1000177454</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Article No.</td>
                <td class="p-2">1000177454</td>
              </tr>
              <!-- Add more rows for other fields as needed -->
            </tbody>
          </table>
        </transition>
      </div>

      <div class="relative w-1/2">
        <div
          @click="toggleCompensation"
          class="bg-gray-200 text-black font-bold py-2 px-4 mb-4 cursor-pointer"
        >
          <span class="mr-2">COMPENSATION</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <transition name="fade">
          <table
            v-if="showCompensation"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Consequetional Damage</td>
                <td class="p-2 font-bold">
                  <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">False</option>
                    <option value="option2">True</option>
                    <!-- Add more options as needed -->
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return Reason</td>
                <td class="p-2 font-bold">
                  <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">False</option>
                    <option value="option2">True</option>
                    <!-- Add more options as needed -->
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Compensation</td>
                <td class="p-2 font-bold">
                  <!-- Dropdown here (replace this with your Vue.js dropdown component) -->
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">False</option>
                    <option value="option2">True</option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return Reason</td>
                <td class="p-2 font-bold">
                  <select class="w-full p-2 border border-gray-300 rounded">
                    <option value="option1">False</option>
                    <option value="option2">True</option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Customer No.</td>
                <td class="p-2">1177454</td>
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
            </tbody>
          </table>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  name: "CustomerInformation",
  setup() {
    const store = useStore();
    const showCustomerInformation = ref(false);
    const showCompensation = ref(false);
    const customerDetails = ref(
      store.state.searchReturnOrder.getOrderDetails.customer
    );
    const formatValue = (value) => value || "-";

    const toggleCompensation = () => {
      showCompensation.value = !showCompensation.value;
    };
    const toggleCustomerInformation = () => {
      showCustomerInformation.value = !showCustomerInformation.value;
    };
    // onMounted(() => {
    //   store.dispatch("getOrderDetailsAction");
    // });
    return {
      customerDetails,
      formatValue,
      toggleCustomerInformation,
      toggleCompensation,
      showCustomerInformation,
      showCompensation,
    };
  },
};
</script>
