<template>
  <header class="bg-[#00aed8] p-4 flex justify-between items-center">
    <div class="flex items-center">
      <button v-if="isAuthenticatedUser" @click="toggleSidebar" class="text-white mr-4">
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
        ><svg
          width="130"
          height="44"
          viewBox="0 0 130 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1292_38109)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.7 31.25C22.7 29.05 20.5 26.75 18.1 24.55C14.5 26.75 10.8 28.45 8.6 29.45V35.85H17.5C20 35.95 22.7 34.05 22.7 31.25ZM8.6 8.75V20.85C13 18.55 20.5 14.95 20.5 11.35C20.5 9.65 19.3 8.75 17.3 8.75H8.6ZM31.5 31.25C31.5 37.85 25.4 43.25 17.6 43.25H0V1.35H17.9C25.6 1.35 29.2 5.95 29.2 11.15C29.2 14.25 27.3 17.15 24.6 19.65C27.8 22.45 31.5 26.25 31.5 31.25ZM58.5 31.25C58.5 29.05 56.3 26.75 53.9 24.55C50.3 26.75 46.6 28.45 44.4 29.45V35.85H53.3C55.8 35.95 58.5 34.05 58.5 31.25ZM44.4 8.75V20.85C48.8 18.55 56.3 14.95 56.3 11.35C56.3 9.65 55.1 8.75 53.1 8.75H44.4ZM67.2 31.25C67.2 37.85 61.1 43.25 53.3 43.25H35.8V1.35H53.7C61.4 1.35 65 5.95 65 11.15C65 14.25 63.1 17.15 60.4 19.65C63.5 22.45 67.2 26.25 67.2 31.25ZM85.3 19.85H102.4V43.25H87C77.7 43.25 71.6 37.75 71.6 28.75V15.25C71.5 6.25 77.6 0.75 87 0.75C96.4 0.75 102.4 6.25 102.4 15.25H93.8C93.8 10.55 91.4 8.15 87 8.15C82.6 8.15 80.2 10.55 80.2 15.25V28.85C80.2 33.55 82.6 35.95 87 35.95H93.8V27.35H85.4V19.85H85.3ZM120.9 10.05C122.6 9.45 125.2 8.45 125.2 6.95C125.2 6.05 124.8 5.45 123.4 5.45H120.9V10.05ZM123.8 9.25L126.1 12.55H125.4L123.2 9.55C122.3 9.95 121.4 10.35 120.7 10.55V12.55H120.1V4.85H123.2C124.9 4.85 125.6 5.75 125.6 6.85C125.7 7.75 124.9 8.55 123.8 9.25ZM129.4 8.65C129.4 5.05 126.4 1.95 122.7 1.95C119.1 1.95 116 4.95 116 8.65C116 12.25 119 15.35 122.7 15.35C126.4 15.35 129.4 12.25 129.4 8.65ZM130 8.65C130 12.65 126.7 15.95 122.7 15.95C118.7 15.95 115.4 12.65 115.4 8.65C115.4 4.65 118.7 1.35 122.7 1.35C126.7 1.35 130 4.65 130 8.65Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_1292_38109">
              <rect
                width="130"
                height="42.5"
                fill="white"
                transform="translate(0 0.75)"
              />
            </clipPath>
          </defs>
        </svg>
      </span>
    </div>
    <!-- <div class="hidden md:block flex justify-center items-center"> -->
    <div class="flex justify-center items-center">
      <!-- <p class="text-white mainHeading">{{ $t("login.wilson.welcome") }}</p> -->

      <span class="mr-2" v-html="icon || '<span></span>'"></span>

      <p class="text-white mainHeading">{{ headerMessage }}</p>
    </div>
  </header>

  <SideBar :isOpen="isSidebarOpen" @close="closeSidebar" />
</template>

<script>
import SideBar from "../Navbar/SideBar.vue";
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "HeaderMenu",
  data() {
    return {
      isSidebarOpen: false,
      icon: "",
      headerMessage: "",
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
  mounted() {},
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
  watch: {
    $route(to, from) {
      this.headerMessage = to.meta.name || "Welcome in Wilson";
      this.icon = to.meta.icon;
    },
  },
};
</script>

<style scoped></style>
