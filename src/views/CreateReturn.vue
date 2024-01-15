<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
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

  setup(props) {
    const store = useStore();
    const route = useRoute();
    const returnOrderId = route.query;
    onMounted(async () => {
    });

    return { returnOrderId };
  },
};
</script>
<template>
  <div>
    <OrderInformation />
    <CustomerInformation />
    <CustomerAddress />
  </div>
</template>
