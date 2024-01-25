<!-- Sidebar.vue -->

<template>
  <transition name="slide">
    <div
      v-if="isSidebarOpen"
      class="sidebar bg-white w-64 h-full fixed top-0 left-0 overflow-y-auto shadow-md"
    >
      <div class="p-4">
        <p class="text-lg font-semibold">
          Article Number: {{ selectedArticleNumber }}
        </p>
        <button
          @click="closeSidebar()"
          class="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted } from "vue";
import { eventBus } from "../../utils/eventBus";
export default {
  name: "ViewArticleDetails",
  props: {
    isSidebarOpen: Boolean,
    selectedArticleNumber: String,
    // closeSidebar: Function,
  },
  setup(props) {
    const closeSidebar = () => {
        debugger
      eventBus.on("closeed");
    };
    onMounted(() => {
    //   eventBus.on("close", closeSidebar);
      console.log(eventBus)
    });
    return {
      closeSidebar,
    };
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
