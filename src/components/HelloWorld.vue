<script setup>
import { ref } from "vue";
import { SfButton } from "@storefront-ui/vue";
import { SfLoaderCircular } from '@storefront-ui/vue';
defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="bg-midnight text-tahiti">Test</div>
  <div class="bg-emerald-200" w-full>Test2</div>
  <SfButton class="w-full"> Hello </SfButton>
  <div class="flex gap-4 flex-wrap">
    <SfLoaderCircular class="!text-cyan-700" size="2xl" />
    <SfLoaderCircular size="2xl" />
    <SfLoaderCircular class="!ring-yellow-200" size="2xl" />
  </div>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
