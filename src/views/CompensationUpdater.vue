<template>
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-4">Compensation Updater</h2>
      <div class="mb-4">
        <input type="file" class="border border-gray-300 p-2">
      </div>
      
      <table class="bg-white w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="py-2 px-4">Column 1</th>
            <th class="py-2 px-4">Column 2</th>
            <th class="py-2 px-4">Column 3</th>
            <th class="py-2 px-4">Column 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4">Data 1</td>
            <td class="py-2 px-4">Data 2</td>
            <td class="py-2 px-4">Data 3</td>
            <td class="py-2 px-4">Data 4</td>
          </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
      
      <div class="mt-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Update</button>
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Export</button>
      </div>
    </div>
  </template>
  
  <script setup>
  // Any script logic can go here if needed
  </script>
  