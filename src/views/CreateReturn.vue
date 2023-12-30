<template>
  <div>
    <OrderInformation />
    <CustomerInformation />
    <CustomerAddress />
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import OrderInformation from "../components/Return/OrderInformation.vue";
import CustomerInformation from "../components/Return/CustomerInformation.vue";
import CustomerAddress from "../components/Return/CustomerAddress.vue";
export default {
  name: "CreateReturn",
  components: {
    OrderInformation,
    CustomerInformation,
    CustomerAddress,
  },

  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("getOrdersToReturn");
      store.dispatch("getOrderDetailsAction");
    });

    return {};
  },
};
</script>
