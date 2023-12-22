<template>
  <div class="px-5">
    <ReturnSearch />
    <ReturnDetails />
  </div>
</template>

<script>
import ReturnSearch from "../../components/Return/ReturnSearch.vue";
import ReturnDetails from "../../components/Return/ReturnDetails.vue";
export default {
  name: "ReturnScreen",
  components: {
    ReturnSearch,
    ReturnDetails
  },
};
</script>
