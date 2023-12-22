<template>
  <header class="headerBgColor p-4 flex justify-between items-center">
    <!-- Left side with hamburger icon and title -->
    <div class="flex items-center">
      <button @click="toggleSidebar" class="text-white mr-4">
        <i class="fas fa-bars text-2xl w-5 h-6"></i>
      </button>
      <span class="text-white text-lg font-bold md:text-xl sm:text-center"
        >BBG</span
      >
    </div>

    <!-- Right side with welcome message -->
    <div class="hidden md:block">
      <p class="text-white">{{ welcomeTitle }}</p>
    </div>
  </header>

  <SideBar :isOpen="isSidebarOpen" @close="closeSidebar" />
</template>

<script>
import SideBar from "../Navbar/SideBar.vue";
export default {
  name: "HeaderMenu",
  data() {
    return {
      isSidebarOpen: false,
      welcomeTitle: "Welcome in Wilson",
    };
  },
  components: {
    SideBar,
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
};
</script>

<style scoped>
.headerBgColor {
  background-color: #00aed8;
}
</style>
