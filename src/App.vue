<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import HeaderMenu from "./components/Header/HeaderMenu.vue";
import SideBar from "./components/Navbar/SideBar.vue"
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <HeaderMenu />
  <SideBar />
  <!-- <LoginScreen /> -->
  <router-view />
</template>

<style scoped></style>
