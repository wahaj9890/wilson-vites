<template>
  <div class="bg-gray-100 flex p-8">
    <div class="max-w-md bg-white p-8 rounded shadow-md mr-8">
      <h2 class="text-2xl font-bold mb-4">Bulk Return Process</h2>
      <div class="flex items-center mb-4">
        <input type="checkbox" class="mr-2" />
        <span>Check this</span>
      </div>
      <div class="mb-4">
        <input type="file" class="border border-gray-300 p-2" />
      </div>
      <div class="mb-4">
        <p class="text-green-500">Process 0 out of 0</p>
        <p class="text-red-500">Passes: 0</p>
        <p class="text-red-500">Failed: 0</p>
      </div>
    </div>
  </div>
  <div>
    <table class="table-auto">
      <thead class="border-b-2 ">
        <tr>
          <th class="px-4 py-2">Column 1</th>
          <th class="px-4 py-2">Column 2</th>
          <th class="px-4 py-2">Column 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2">Data 1</td>
          <td class="px-4 py-2">Data 2</td>
          <td class="px-4 py-2">Data 3</td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>

    <div class="mt-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Process
      </button>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
      >
        Export
      </button>
    </div>
  </div>
</template>
  
  <script setup>
// Any script logic can go here if needed
</script>
  