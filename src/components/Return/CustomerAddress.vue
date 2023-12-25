<template>
  <div>
    <div class="flex space-x-8 p-8">
      <div class="relative w-1/2">
        <div class="bg-[#DDDDDD] text-black font-bold py-2 px-4 mb-4">
          <span class="mr-2">CUSTOMER ADDRESS</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <table
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
        <div class="bg-[#DDDDDD] text-black font-bold py-2 px-4 mb-4">
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
export default {
  name: "CustomerAddress",
};
</script>
