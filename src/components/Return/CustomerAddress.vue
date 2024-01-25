<script>
import { ref, computed, onMounted, inject } from "vue";
import { useStore } from "vuex";
import { eventBus } from "../../utils/eventBus";
export default {
  name: "CustomerAddress",
  setup() {
    const store = useStore();
    const showCustomerAddress = ref(false);
    const showReturnInformation = ref(false);
    const showNewAddressTable = ref(false);
    const alternateFirstName = ref("");
    const alternateLastName = ref("");
    const alternateStreet = ref("");
    const alternatePostalCode = ref("");
    const alternateCity = ref("");
    const alternateCountry = ref("");
    const alternateAdditionalInfo = ref("");
    const alternateAddressForm = ref("");
    const toggleCustomerInformation = () => {
      showReturnInformation.value = !showReturnInformation.value;
    };
    const toggleCustomerAddress = () => {
      showCustomerAddress.value = !showCustomerAddress.value;
    };
    const deliveryAddress = computed(
      () => store.state.searchReturnOrder.orderItemsToReturn.deliveryAddress
    );
    const saveNewAddress = () => {
      alternateAddressForm.value = {
        firstname: alternateFirstName,
        lastname: alternateLastName,
        additionalDetails: alternateAdditionalInfo,
        // houseNumber: alternativeAddress.houseNumber,
        street: alternateStreet,
        postalCode: alternatePostalCode,
        // mobilePhoneNumber: alternativeAddress.mobilePhoneNumber,
        city: alternateCity,
        countryCode: deliveryAddress.value.countryName,
      };
      sessionStorage.setItem(
        "additionalAddress",
        JSON.stringify(alternateAddressForm.value)
      );
      showNewAddressTable.value = false;
    };
    const deleteAddress = () => {
      showNewAddressTable.value = false;
    };
    const callSubmitReturn = () => {
      eventBus.emit('submitReturn')
    };
    onMounted(() => {});
    return {
      deliveryAddress,
      showCustomerAddress,
      showReturnInformation,
      showNewAddressTable,
      alternateFirstName,
      alternateLastName,
      alternateStreet,
      alternatePostalCode,
      alternateCity,
      alternateCountry,
      alternateAdditionalInfo,
      alternateAddressForm,
      toggleCustomerInformation,
      toggleCustomerAddress,
      saveNewAddress,
      deleteAddress,
      callSubmitReturn
    };
  },
};
</script>
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
                <td class="p-2">
                  {{ deliveryAddress.firstName + deliveryAddress.lastName }}
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Street</td>
                <td class="p-2">{{ deliveryAddress.street }}</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Postal Code</td>
                <td class="p-2">{{ deliveryAddress.postalCode }}</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">City</td>
                <td class="p-2">{{ deliveryAddress.cityName }}</td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Country</td>
                <td class="p-2">{{ deliveryAddress.countryName }}</td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Addition Info.</td>
                <td class="p-2">{{ deliveryAddress.additionalDetails }}</td>
              </tr>
            </tbody>
          </table>
        </transition>
        <div v-if="showCustomerAddress" class="flex justify-end mt-2">
          <button
            @click="showNewAddressTable = true"
            class="py-2 px-4 bg-white border border-black rounded"
          >
            Add new Address
          </button>
        </div>

        <table
          v-if="showNewAddressTable"
          class="w-full table-auto border border-gray-300 border-separate border-slate-400 mt-2"
        >
          <tbody>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Alternative FirstName</td>
              <td class="p-2">
                <input
                  type="text"
                  v-model="alternateFirstName"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="First Name"
                />
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Alternative LastName</td>
              <td class="p-2">
                <input
                  type="text"
                  v-model="alternateLastName"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Last Name"
                />
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Alternative Street</td>
              <td class="p-2">
                <input
                  type="text"
                  v-model="alternateStreet"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Street"
                />
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Alternative Postal Code</td>
              <td class="p-2">
                <input
                  type="text"
                  v-model="alternatePostalCode"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Postal Code"
                />
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Alternative City</td>
              <td class="p-2">
                <input
                  type="text"
                  v-model="alternateCity"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="City"
                />
              </td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Alternative Country</td>
              <td class="p-2 font-bold">
                <select
                  v-model="alternateCountry"
                  class="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="option1">False</option>
                  <option value="option2">True</option>
                </select>
              </td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Addition Info.</td>
              <input
                type="text"
                v-model="alternateAdditionalInfo"
                class="w-full p-2 border border-gray-300 rounded"
                placeholder="City"
              />
            </tr>
          </tbody>
        </table>

        <div v-if="showNewAddressTable" class="flex justify-end space-x-4 mt-2">
          <button @click="saveNewAddress" class="py-2 px-4 bg-[#F3E43E] border">
            Save New Address
          </button>
          <button
            @click="deleteAddress"
            class="py-2 px-4 bg-white border border-black"
          >
            Delete
          </button>
        </div>

        <div class="flex space-x-4 mt-4">
          <button
            @click="callSubmitReturn"
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
