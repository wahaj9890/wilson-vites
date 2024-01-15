<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed top-0 z-10 left-0 h-full bg-[#66CEE8] text-white p-4"
      :class="{
        'w-48 transition-all duration-1000 ease-in-out ': isOpen,
        'w-0': !isOpen,
      }"
    >
      <div class="cursor-pointer absolute top-4 right-4" @click="closeSidebar">
        <i class="fas fa-times text-2xl text-black"></i>
      </div>

      <div class="mt-12">
        <div v-for="(menu, key) in sidemenu">
          <router-link
            :to="{ name: menu.routerLink.name }"
            class="flex items-center mb-9"
          >
            <i :class="[menu.iconClass]"></i>

            <span class="text-black font-bold underline">{{
              menu.module
            }}</span>
          </router-link>
        </div>

        <div class="flex items-end mt-auto">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <div class="mt-auto cursor-pointer" @click="logout">
              <i class="fas fa-sign-out-alt text-2xl mr-2"></i>
              <span class="font-bold text-black underline mb-2">Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sidemenu } from "../../router/sidebar/sidemenu";
import LoginScreen from "../../views/Login/LoginScreen.vue";
import { useStore } from "vuex";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      temp: LoginScreen.methods.signOut,
      isSidebarOpen: false,
      sidemenu: sidemenu,
      store: useStore(),
    };
  },
  props: {
    isOpen: Boolean,
  },
  computed: {
    ...mapState({
      isAuthenticatedUser: (state) => state.global.authenticatedUser,
    }),
  },
  mounted() {},
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
