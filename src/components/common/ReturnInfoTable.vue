<template>
  <tbody>
    <tr
      v-for="(item, index) in informationDetailsCols"
      :key="index"
      :class="[
        ' text-black mb-2',
        index % 2 === 0 ? 'bg-[#F0F0F0]' : 'bg-[#F7F7F7]',
      ]"
    >
      <td class="p-2 font-bold w-1/4">{{ item.label }}</td>
      <td class="p-2">{{ item.value }}</td>
      <template v-if="item.key === 'rma' && item.value == 'True'">
          <!-- <span class="text-green-500">Success Icon</span> -->
        </template>
        <!-- Add info icon if rma is false (0) -->
        <template v-if="item.key === 'rma' && item.value == 'False'">
          <!-- <span class="text-red-500">Info Icon</span> -->
        </template>
    </tr>
  </tbody>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "ReturnInfoTable",
  props: {
    receiveReturnDetails: Object,
  },
  setup(props) {
    const {
      customer: { customerNumber },
      orderId,
      articleNumber,
      price,
      returnReason,
      createdOn,
      returnOrderId,
      returnCompensation,
      orderedMaterial: { rma },
      createdBy,
      registrationDate,
      isCoolingOff,
      condition,
    } = props.receiveReturnDetails;
    const informationDetailsCols = ref([
      {
        key: "customerNumber",
        label: "Customer No.",
        value: customerNumber ? customerNumber : "-",
      },
      {
        key: "orderId",
        label: "Order No.",
        value: orderId ? orderId : "-",
      },
      {
        key: "articleNumber",
        label: "Article No.",
        value: articleNumber ? articleNumber : "-",
      },
      {
        key: "price",
        label: "Price",
        value: price ? price : "-",
      },
      {
        key: "returnReason",
        label: "Return Reason",
        value: returnReason ? returnReason : "-",
      },
      {
        key: "createdOn",
        label: "Created ON",
        value: createdOn ? createdOn : "-",
      },
      {
        key: "returnOrderId",
        label: "Return Order No.",
        value: returnOrderId ? returnOrderId : "-",
      },
      {
        key: "returnCompensation",
        label: "Compensation",
        value: returnCompensation ? returnCompensation : "-",
      },
      {
        key: "rma",
        label: "RMA",
        // value: rma ? rma : "-",
        value: rma == 1 ? "True" : rma == 0 ? "False" : "-",
      },
      {
        key: "createdBy",
        label: "Created By",
        value: createdBy ? createdBy : "-",
      },
      {
        key: "registrationDate",
        label: "Date Registered",
        value: registrationDate ? registrationDate : "-",
      },
      {
        key: "isCoolingOff",
        label: "In cooling of",
        value: isCoolingOff ? isCoolingOff : "-",
      },
      {
        key: "condition",
        label: "Condition",
        value: condition ? condition : "-",
      },
    ]);
    onMounted(() => {});

    return {
      informationDetailsCols,
    };
  },
};
</script>
