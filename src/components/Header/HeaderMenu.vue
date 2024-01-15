<template>
  <header class="headerBgColor p-4 flex justify-between items-center">
    <!-- Left side with hamburger icon and title -->
    <div class="flex items-center">
      <button @click="toggleSidebar" class="text-white mr-4">
        <!-- <i class="fas fa-bars text-2xl w-5 h-6"></i> -->
        <svg
          width="32"
          height="26"
          viewBox="0 0 32 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.0781 3.01562H0.421875C0.309987 3.01562 0.202681 2.97118 0.123564 2.89206C0.0444474 2.81294 0 2.70564 0 2.59375L0 0.90625C0 0.794362 0.0444474 0.687056 0.123564 0.60794C0.202681 0.528823 0.309987 0.484375 0.421875 0.484375H31.0781C31.19 0.484375 31.2973 0.528823 31.3764 0.60794C31.4556 0.687056 31.5 0.794362 31.5 0.90625V2.59375C31.5 2.70564 31.4556 2.81294 31.3764 2.89206C31.2973 2.97118 31.19 3.01562 31.0781 3.01562ZM31.0781 14.2656H0.421875C0.309987 14.2656 0.202681 14.2212 0.123564 14.1421C0.0444474 14.0629 0 13.9556 0 13.8438L0 12.1562C0 12.0444 0.0444474 11.9371 0.123564 11.8579C0.202681 11.7788 0.309987 11.7344 0.421875 11.7344H31.0781C31.19 11.7344 31.2973 11.7788 31.3764 11.8579C31.4556 11.9371 31.5 12.0444 31.5 12.1562V13.8438C31.5 13.9556 31.4556 14.0629 31.3764 14.1421C31.2973 14.2212 31.19 14.2656 31.0781 14.2656ZM31.0781 25.5156H0.421875C0.309987 25.5156 0.202681 25.4712 0.123564 25.3921C0.0444474 25.3129 0 25.2056 0 25.0938L0 23.4062C0 23.2944 0.0444474 23.1871 0.123564 23.1079C0.202681 23.0288 0.309987 22.9844 0.421875 22.9844H31.0781C31.19 22.9844 31.2973 23.0288 31.3764 23.1079C31.4556 23.1871 31.5 23.2944 31.5 23.4062V25.0938C31.5 25.2056 31.4556 25.3129 31.3764 25.3921C31.2973 25.4712 31.19 25.5156 31.0781 25.5156Z"
            fill="white"
          />
        </svg>
      </button>
      <span class="text-white text-lg font-bold md:text-xl sm:text-center"
        >BBG</span
      >
    </div>

    <!-- Right side with welcome message -->
    <div class="hidden md:block">
      <p class="text-white">{{ $t("login.wilson.welcome") }}</p>
    </div>
  </header>

  <SideBar :isOpen="isSidebarOpen" @close="closeSidebar" />
</template>

<script>
import SideBar from "../Navbar/SideBar.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "HeaderMenu",
  data() {
    return {
      isSidebarOpen: false,
      token: JSON.parse(localStorage.getItem("currentUser"))?.contactLogin
        ?.token,
    };
  },
  components: {
    SideBar,
  },
  computed: {
    ...mapState({
      isAuthenticatedUser: (state) => state.global.authenticatedUser,
    }),
  },
  methods: {
    toggleSidebar() {
      if (this.isAuthenticatedUser) {
        this.isSidebarOpen = !this.isSidebarOpen;
      }
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
