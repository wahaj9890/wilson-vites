<template>
  <div class="relative w-1/2">
    <div class="bg-gray-200 text-black font-bold py-2 px-4 mb-4">
      <span class="mr-2">RETURN INFORMATION</span>
      <span class="text-2xl float-right">+</span>
    </div>
    <table
      class="w-full table-auto border border-gray-300 border-separate border-slate-400"
    >
      <tbody>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Customer No.</td>
          <td class="p-2">1177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Order No.</td>
          <td class="p-2">12103213</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Customer No.</td>
          <td class="p-2">1177454</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Order No.</td>
          <td class="p-2">12103213</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-200 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <tr class="bg-gray-100 text-black mb-2">
          <td class="p-2 font-bold">Article No.</td>
          <td class="p-2">1000177454</td>
        </tr>
        <!-- Add more rows for other fields as needed -->
      </tbody>
    </table>
    <div class="flex space-x-4 mt-4">
      <button class="py-2 px-4 bg-yellow-500 border border-gray-300 rounded">
        Save
      </button>
      <button class="py-2 px-4 bg-white border border-gray-300 rounded">
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
export default { name: "ReturnInformation" };
</script>
