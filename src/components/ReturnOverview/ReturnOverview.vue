<template>
  <div class="overview-details">
    <!-- Order By Dropdown -->
    <div class="flex justify-end mb-4">
      <label for="orderBy" class="mr-2">Order By:</label>
      <select v-model="orderBy" id="orderBy" class="border p-2 rounded">
        <option value="column1">Column 1</option>
        <option value="column2">Column 2</option>
        <!-- Add more options as needed -->
      </select>
    </div>

    <!-- Table -->
    <table class="w-full table-auto border border-gray-300">
      <thead>
        <tr
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-200': index % 2 !== 0,
          }"
        >
          <th class="p-2">Column 1</th>
          <th class="p-2">Column 2</th>
          <th class="p-2">Column 3</th>
          <th class="p-2">Column 4</th>
          <th class="p-2">Column 5</th>
          <th class="p-2">Column 6</th>
          <th class="p-2">Column 7</th>
          <th class="p-2">Column 8</th>
          <th class="p-2">Column 9</th>
        </tr>
      </thead>
      <tbody>
        <!-- Sample Data Rows -->
        <tr
          v-for="(rowData, index) in tableData"
          :key="index"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-gray-200': index % 2 !== 0,
          }"
        >
          <td class="p-2">{{ rowData.column1 }}</td>
          <td class="p-2">{{ rowData.column2 }}</td>
          <td class="p-2">{{ rowData.column3 }}</td>
          <td class="p-2">{{ rowData.column4 }}</td>
          <td class="p-2">{{ rowData.column5 }}</td>
          <td class="p-2">{{ rowData.column6 }}</td>
          <td class="p-2">{{ rowData.column7 }}</td>
          <td class="p-2">{{ rowData.column8 }}</td>
          <td class="p-2">{{ rowData.column9 }}</td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ReturnOverview",
  data() {
    return {
      orderBy: "column1", // Initial order by value
      tableData: [
        {
          column1: "Data 1",
          column2: "Data 2",
          column3: "Data 3",
          column4: "Data 4",
          /* ... */ column9: "Data 9",
        },
        {
          column1: "Data 1",
          column2: "Data 2",
          column3: "Data 3",
          column4: "Data 4",
          /* ... */ column9: "Data 9",
        },
        {
          column1: "Data 1",
          column2: "Data 2",
          column3: "Data 3",
          column4: "Data 4",
          /* ... */ column9: "Data 9",
        },

        // Add more rows as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
