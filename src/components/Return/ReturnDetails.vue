<template>
  <div class="p-8">
    <table class="w-full border border-gray-300">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2">Column 1</th>
          <th class="border border-gray-300 p-2">Column 2</th>
          <th class="border border-gray-300 p-2">Column 3</th>
          <th class="border border-gray-300 p-2">Column 4</th>
          <th class="border border-gray-300 p-2">Column 5</th>
          <th class="border border-gray-300 p-2">Column 6</th>
          <th class="border border-gray-300 p-2">Column 7</th>
          <th class="border border-gray-300 p-2">Column 8</th>
          <th class="border border-gray-300 p-2 pr-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td class="border border-gray-300 p-2">{{ item.col1 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col2 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col3 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col4 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col5 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col6 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col7 }}</td>
          <td class="border border-gray-300 p-2">{{ item.col8 }}</td>
          <td class="border border-gray-300 p-2">
            <div class="flex flex-col gap-1">
              <button class="bg-blue-500 text-white px-2 py-1">Create</button>
              <button class="bg-red-500 text-white px-2 py-1">Mange</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="p-8">
      <!-- Back to Search and History buttons -->
      <div
        class="flex items-center justify-between mb-4 bg-white-500 text-black p-3"
      >
        <button class="flex items-center space-x-1 text-black-500">
          <i class="fas fa-arrow-left"></i> Back to Search
        </button>
        <button
          class="flex items-center space-x-1 text-gray-500 bg-yellow-500 p-2 rounded"
        >
          History <i class="fas fa-cog"></i>
        </button>
      </div>

      <!-- Order Information title -->
      <div class="flex items-center justify-between mb-4 bg-gray-300 p-3">
        <h2 class="text-xl font-bold">Order Information</h2>
        <i class="fas fa-minus"></i>
      </div>

      <!-- Select all items title with checkbox -->
      <div class="flex items-center mb-4 bg-gray-300 p-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-500" />
        <h2 class="text-xl font-bold ml-3">Select all items</h2>
      </div>

      <!-- Cards -->
      <div class="flex flex-wrap gap-4">
        <!-- Card 1 -->
        <div
          class="flex justify-between w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 bg-gray-200"
        >
          <div>
            <h3 class="text-lg font-bold">10029658</h3>
            <p>Qty: 10</p>
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-500"
              />
              <p class="ml-3">Item Name</p>
            </div>

            <div class="flex items-center mt-2">
              <i class="fas fa-download mr-2 text-blue-500"></i>
              <span>Download Manual</span>
            </div>
          </div>
          <div class="flex justify-end">
            <img
              src="https://filmfare.wwmindia.com/content/2022/oct/salman-khan-new-look-from-kisi-ka-bhai-kisi-ki-jaan.jpg"
              alt="Product Image"
              class="w-12 h-12"
            />
          </div>
        </div>

        <div
          class="flex justify-between w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 bg-gray-200"
        >
          <div>
            <h3 class="text-lg font-bold">10029658</h3>
            <p>Qty: 10</p>
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-500"
              />
              <p class="ml-3">Item Name</p>
            </div>

            <div class="flex items-center mt-2">
              <i class="fas fa-download mr-2 text-blue-500"></i>
              <span>Download Manual</span>
            </div>
          </div>
          <div class="flex justify-end">
            <img
              src="https://filmfare.wwmindia.com/content/2022/oct/salman-khan-new-look-from-kisi-ka-bhai-kisi-ki-jaan.jpg"
              alt="Product Image"
              class="w-12 h-12"
            />
          </div>
        </div>
        <div
          class="flex justify-between w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 bg-gray-200"
        >
          <div>
            <h3 class="text-lg font-bold">10029658</h3>
            <p>Qty: 10</p>
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-500"
              />
              <p class="ml-3">Item Name</p>
            </div>

            <div class="flex items-center mt-2">
              <i class="fas fa-download mr-2 text-blue-500"></i>
              <span>Download Manual</span>
            </div>
          </div>
          <div class="flex justify-end">
            <img
              src="https://filmfare.wwmindia.com/content/2022/oct/salman-khan-new-look-from-kisi-ka-bhai-kisi-ki-jaan.jpg"
              alt="Product Image"
              class="w-12 h-12"
            />
          </div>
        </div>
        <div
          class="flex justify-between w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 p-4 bg-gray-200"
        >
          <div>
            <h3 class="text-lg font-bold">10029658</h3>
            <p>Qty: 10</p>
            <div class="flex items-center mb-2">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-500"
              />
              <p class="ml-3">Item Name</p>
            </div>

            <div class="flex items-center mt-2">
              <i class="fas fa-download mr-2 text-blue-500"></i>
              <a href="#" class="underline">Download Manual</a>
            </div>
          </div>
          <div class="flex justify-end">
            <img
              src="https://filmfare.wwmindia.com/content/2022/oct/salman-khan-new-look-from-kisi-ka-bhai-kisi-ki-jaan.jpg"
              alt="Product Image"
              class="w-12 h-12"
            />
          </div>
        </div>

        <!-- Repeat similar structure for Card 2, Card 3, and Card 4 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Dummy data for the table
      tableData: [
        {
          col1: "A1",
          col2: "B1",
          col3: "C1",
          col4: "D1",
          col5: "E1",
          col6: "F1",
          col7: "G1",
          col8: "H1",
        },
        {
          col1: "A2",
          col2: "B2",
          col3: "C2",
          col4: "D2",
          col5: "E2",
          col6: "F2",
          col7: "G2",
          col8: "H2",
        },
        {
          col1: "A3",
          col2: "B3",
          col3: "C3",
          col4: "D3",
          col5: "E3",
          col6: "F3",
          col7: "G3",
          col8: "H3",
        },
        // Add more rows as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
