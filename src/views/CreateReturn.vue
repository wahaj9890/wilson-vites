<template>
  <div>
    <OrderInformation />
    <CustomerInformation />
    <CustomerAddress />
  </div>
</template>

<script>
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
};
</script>
