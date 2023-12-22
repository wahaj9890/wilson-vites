<template>
  <div>
    <SearchReturn />
    <div class="flex space-x-8 py-8">
      <ReturnInformation />

      <!-- Second table -->
      <div class="relative w-1/2">
        <div class="bg-gray-200 text-black font-bold py-2 px-4 mb-4">
          <span class="mr-2">CREATE TECHNICAL CHECK</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <table
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
import SearchReturn from "../common/SearchReturn.vue";
import ReturnInformation from "../common/ReturnInformation.vue";
export default {
  name: "RefurbishReturn",
  components: {
    SearchReturn,
    ReturnInformation,
  },
};
</script>
