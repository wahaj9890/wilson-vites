<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed top-0 z-10 left-0 h-full bg-[#B3E7F3] text-white p-4"
      :class="{
        'w-56 transition-all duration-1000 ease-in-out h-screen': isOpen,
        'w-0 h-0': !isOpen,
      }"
    >
      <div class="cursor-pointer absolute top-4 right-4" @click="closeSidebar">
        <i class="fas fa-times text-2xl text-black"></i>
      </div>

      <div class="mt-12">
        <template v-if="isC2RStaff">
          <div :id="key" v-for="(menu, key) in sidebarMenu" :key="key">
            <router-link
              :to="{ name: menu.routerLink.name }"
              class="flex items-center mb-9"
            >
              <!-- <i :class="[menu.iconClass]"></i> -->
              <div class="mr-2" v-html="menu.icon"></div>
              <span class="text-black font-bold underline">{{
                menu.module
              }}</span>
            </router-link>
          </div>
        </template>
        <template v-else>
          <div :id="key" v-for="(menu, key) in sidebarMenu" :key="key">
            <router-link
              :to="{ name: menu.routerLink.name }"
              class="flex items-center mb-9"
            >
              <!-- <i :class="[menu.iconClass]"></i> -->
              <div class="mr-2" v-html="menu.icon"></div>
              <span class="text-black font-bold underline">{{
                menu.module
              }}</span>
            </router-link>
          </div>
        </template>
        <div class="flex items-end mt-auto">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <div class="mt-auto cursor-pointer flex" @click="logout">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="1" fill="#273944" />
                <path
                  d="M9.32782 19.5H6.37484C4.51164 19.5 3 17.8763 3 15.875V8.625C3 6.6237 4.51164 5 6.37484 5H9.32782C9.55984 5 9.74967 5.20391 9.74967 5.45313V6.96354C9.74967 7.21276 9.55984 7.41667 9.32782 7.41667H6.37484C5.7526 7.41667 5.24989 7.95664 5.24989 8.625V15.875C5.24989 16.5434 5.7526 17.0833 6.37484 17.0833H9.32782C9.55984 17.0833 9.74967 17.2872 9.74967 17.5365V19.0469C9.74967 19.2961 9.55984 19.5 9.32782 19.5ZM13.4725 8.05482L16.2005 10.7396H9.46843C9.00088 10.7396 8.62473 11.1436 8.62473 11.6458V12.8542C8.62473 13.3564 9.00088 13.7604 9.46843 13.7604H16.2005L13.4725 16.4452C13.1175 16.7926 13.1069 17.3892 13.4444 17.7555L14.2143 18.5824C14.5412 18.9336 15.0756 18.9374 15.406 18.5862L20.7495 12.8919C21.0835 12.537 21.0835 11.9592 20.7495 11.6043L15.4096 5.91758C15.0791 5.56641 14.5483 5.56641 14.2178 5.92135L13.4479 6.74831C13.1069 7.11081 13.121 7.70742 13.4725 8.05482V8.05482Z"
                  fill="white"
                />
              </svg>

              <!-- <i class="fas fa-sign-out-alt text-2xl mr-2"></i> -->
              <div class="font-bold text-black underline ml-2 mb-2">
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sidemenu } from "../../router/sidebar/sidemenu";
import { bulkmenu } from "../../router/sidebar/bulkrturnmenus";
import LoginScreen from "../../views/Login/LoginScreen.vue";
import { useStore } from "vuex";
import { mapState } from "vuex";
// import { watch } from "vue";
export default {
  data() {
    return {
      temp: LoginScreen.methods.signOut,
      isSidebarOpen: false,
      sidemenu: sidemenu,
      bulkmenu: bulkmenu,
      store: useStore(),
      currentUserRole: localStorage.getItem("currentUserRole"),
    };
  },
  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapState({
      isAuthenticatedUser: (state) => state.global.authenticatedUser,
    }),

    isC2RStaff() {
      return localStorage.getItem("currentUserRole") === "C2R_Staff";
    },
    sidebarMenu() {
      return this.isC2RStaff ? bulkmenu : sidemenu;
    },
  },
  mounted() {
    console.log(this.isC2RStaff);
  },
  methods: {
    closeSidebar() {
      this.$emit("close");
    },
    logout() {
      this.temp();
    },
  },
};
</script>

<style scoped>
/* Add transition styles for smooth opening and closing */
.w-sidebar {
  /* width: 20%; */
  transition: width 2s;
  transition-timing-function: ease-in;
  /* transition: width 2s ease-in-out; */
}
.sideBarBg {
  background-color: #b3e7f3;
}
</style>
