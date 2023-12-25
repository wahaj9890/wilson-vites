<template>
  <div>
    <div class="flex space-x-8 p-8">
      <div class="relative w-1/2">
        <div class="bg-gray-200 text-black font-bold py-2 px-4 mb-4">
          <span class="mr-2">CUSTOMER INFORMATION</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <table
          class="w-full table-auto border border-gray-300 border-separate border-slate-400"
        >
          <tbody>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">First Name</td>
              <td class="p-2">Wahaj</td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Last Name</td>
              <td class="p-2">Uddin</td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Email Address</td>
              <td class="p-2">test@gmail.com</td>
            </tr>
            <tr class="bg-gray-100 text-black mb-2">
              <td class="p-2 font-bold">Alternate Email</td>
              <td class="p-2">test@gmail.com</td>
            </tr>
            <tr class="bg-gray-200 text-black mb-2">
              <td class="p-2 font-bold">Telephone No.</td>
              <td class="p-2">12103213</td>
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
      </div>

      <div class="relative w-1/2">
        <div class="bg-gray-200 text-black font-bold py-2 px-4 mb-4">
          <span class="mr-2">COMPENSATION</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <table
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
              <td class="p-2 font-bold">Customer No.</td>
              <td class="p-2">1177454</td>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerInformation",
};
</script>
