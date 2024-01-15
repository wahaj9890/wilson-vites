<template>
  <div>
    <div class="flex space-x-8 p-8">
      <div class="relative w-1/2">
        <div
          @click="toggleCustomerInformation"
          class="bg-gray-200 text-black font-bold py-2 px-4 mb-4 cursor-pointer"
        >
          <span class="mr-2">CUSTOMER INFORMATION</span>
          <i
            :class="[
              'float-right fas',
              showCustomerInformation ? 'fa-minus' : 'fa-plus',
            ]"
          ></i>
        </div>
        <transition name="fade">
          <table
            v-if="showCustomerInformation"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">First Name</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.firstName) }}
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Last Name</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.lastName) }}
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Email Address</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.emailAddress) }}
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Alternate Email</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.alternateEmailAddress) }}
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Telephone No.</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.mobilePhoneNumber) }}
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Alternate No.</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.alternateMobilePhoneNumber) }}
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Invoice No.</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.invoiceNumber) }}
                </td>
              </tr>
              <tr class="bg-gray-100 text-black mb-2">
                <td class="p-2 font-bold">Article No.</td>
                <td class="p-2">
                  {{ formatValue(customerDetails?.articleNo) }}
                </td>
              </tr>
              <!-- Add more rows for other fields as needed -->
            </tbody>
          </table>
        </transition>
      </div>

      <div class="relative w-1/2">
        <div
          @click="toggleCompensation"
          class="bg-gray-200 text-black font-bold py-2 px-4 mb-4 cursor-pointer"
        >
          <span class="mr-2">COMPENSATION</span>
          <span class="text-2xl float-right">+</span>
        </div>
        <transition name="fade">
          <table
            v-if="showCompensation"
            class="w-full table-auto border border-gray-300 border-separate border-slate-400"
          >
            <tbody>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Consequential Damage</td>
                <td class="p-2 font-bold">
                  <select
                    v-model="setConsequentialDamage"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                    @change="onConsequentialDamageChanged($event.target.value)"
                  >
                    <option value=""></option>
                    <option
                      v-for="(damage, i) in consequentialDamage"
                      :key="damage.key"
                      :value="damage.key"
                    >
                      {{ damage.value }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return Reason</td>
                <td class="p-2 font-bold">
                  <select
                    v-model="selectedReturnReason"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                    @change="onReturnRegistrationReasonChanged($event)"
                  >
                    <option value="" disabled>Select an option</option>
                    <option
                      v-for="reason in returnRegistrationReason"
                      :key="reason.returnReasonId"
                      :value="reason.returnReasonId"
                    >
                      {{ reason.returnRegistrationValue }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Compensation</td>
                <td class="p-2 font-bold">
                  <select
                    v-model="selectedCompensation"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                  >
                    <option value=""></option>
                    <option
                      v-for="compensation in compensationsDetails"
                      :key="compensation.id"
                      :value="compensation.id"
                    >
                      {{ compensation.title }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Article No.</td>
                <td class="p-2 font-bold">
                  <input
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return shipment Needed</td>
                <td class="p-2 font-bold">
                  <select
                    v-model="selectedReturnShipment"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                    @change="onShipmentChange"
                  >
                    <option
                      v-for="fee in returnShipmentNeeded"
                      :key="fee.value"
                      :disabled="
                        selectedReturnReason.value === 23 ||
                        selectedReturnReason.value === 24 ||
                        selectedReturnReason.value === 25
                      "
                    >
                      {{ fee.viewValue }}
                    </option>
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Carrier</td>
                <td class="p-2 font-bold">
                  <!-- :disabled="selectedReturnShipment !== true" -->
                  <select
                    v-model="selectedCarrier"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                    @change="onCarrierChange"
                  >
                    
                  </select>
                </td>
              </tr>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Pick Up</td>
                <td class="p-2 font-bold">
                  <select
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select>
                </td>
              </tr>

              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return User Description</td>
                <td class="p-2 font-bold">
                  <input
                    type="text"
                    class="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from "vue";
import {
  applicationRoles,
  applicationRolesString,
} from "../../utils/applicationRoles";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import {
  rec4poCarrierListToMap,
  warehouseMapping,
} from "../../utils/warehouseAndCarriers";
export default {
  name: "CustomerInformation",
  setup(props) {
    const store = useStore();
    const route = useRoute();

    const showCustomerInformation = ref(true);
    const showCompensation = ref(true);
    const setConsequentialDamage = ref("");
    const selectedReturnReason = ref("");
    const selectedReturnShipment = ref("");
    const selectedCompensation = ref("");
    const selectedCarrier = ref("");
    const customerBankDetailsDisabled = ref(true);
    const isCashOnDelivery = ref(true);
    const isRec4poFetched = ref(false);
    const pickupCarrierSelected = ref(false);
    var pickupMinDate = ref("");
    const expiryDate = ref("");
    const returnShipmentFee = ref(0);
    const hasReturnShipmentFeeRec4po = ref(false);
    const carriersList = ref([
      {
        companyName: "",
        id: "",
        longName: "",
        shipmentCost: "",
        shortName: "",
      },
    ]);
    // const returnFormGroup = ref({
    //   orderNumber: props.order.orderId,
    //   alternateEmailTelephone: {
    //     emailAddress: null,
    //     telephoneNumber: null,
    //   },
    //   bankDetailsGroup: {
    //     accountHolderName:
    //       props.customerBankDetails?.accountHolderName ??
    //       props.customerFullName ??
    //       null,
    //     IBAN_AccountNumber:
    //       props.customerBankDetails?.ibaN_AccountNumber ?? null,
    //     SWIFT_BIC: props.customerBankDetails?.swift_BIC ?? null,
    //     BankName: props.customerBankDetails?.bankName ?? null,
    //     BankCode: props.customerBankDetails?.bankCode ?? null,
    //     OrderId: props.order.id,
    //     CustomerId: props.order.customerId,
    //     Currency: props.order.currency,
    //   },
    // });
    const consequentialDamage = ref(
      JSON.parse(localStorage.getItem("consequentialDamage"))
    );
    const currentUserValue = ref(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    const returnRegistrationReason = ref([]);
    var val = "";
    const returnShipmentNeeded = ref([
      { value: false, viewValue: "false", selected: true },
      { value: true, viewValue: "true" },
    ]);
    const customerDetails = computed(
      () => store.state.searchReturnOrder.getOrderDetails.customer || {}
    );
    const orderItemsToReturnDetails = computed(
      () => store.state.searchReturnOrder.orderItemsToReturn
    );
    const compensationsDetails = computed(
      () => store.state.searchReturnOrder.getCompensation || []
    );
    let orders = ref([]);
    var group = ref([]);
    const formatValue = (value) => value || "-";

    // const orderItemId = ref("");
    const wayOfDistribution = ref(null);
    const returnOrderId = route.query.orderId;

    const returnsFormArray = ref([]);
    const dataSourceOrder = ref([]);
    const pickupCarriersList = new Set();

    const disableShipmentNeeded = (group) => {
      var appRoleId = currentUserValue?.value?.role?.id;

      if (
        appRoleId === applicationRoles.WarehouseStaffHoppegarten.toString() ||
        appRoleId === applicationRoles.WarehouseStaffKaLi.toString() ||
        appRoleId === applicationRoles.WarehouseStaffSK.toString()
      ) {
        group.shipmentNeeded.value = false;
      }
    };

    const toggleCompensation = () => {
      showCompensation.value = !showCompensation.value;
    };
    const toggleCustomerInformation = () => {
      showCustomerInformation.value = !showCustomerInformation.value;
    };
    const onConsequentialDamageChanged = (key) => {
      val = key === "1" ? "true" : "false";
      const coolingOffString = orders.value.toString();
      setReturnRegistrationReason(val, coolingOffString);
    };

    const setReturnRegistrationReason = (val, coolingOffString) => {
      returnRegistrationReason.value = JSON.parse(
        localStorage.getItem(
          `ReturnReasonsScene_Damage_${val}_coolingOff_${coolingOffString}`
        )
      );
    };

    const onReturnRegistrationReasonChanged = (event) => {
      if (!customerBankDetailsDisabled && isCashOnDelivery) {
        // this.enableCustomerBankDetailsValidation(event.source.value);
      }

      if (selectedReturnReason.value == 6) {
        // formGroup.controls.articleReceivedSKU.setValidators(
        //   Validators.required
        // );
      } else {
        // formGroup.controls.articleReceivedSKU.setValue(null);
        // formGroup.controls.articleReceivedSKU.clearValidators();
      }

      if (selectedReturnReason.value == 9) {
        if (
          currentUserValue?.value?.role?.id ===
          applicationRoles.CSAgent.toString()
        ) {
          // formGroup.controls.shipmentNeeded.setValue(false);
          // formGroup.controls.shipmentNeeded.disable();
          // this.setShipmentAndCarrierValidity(false, formGroup);
        }
      } else {
        // formGroup.controls.shipmentNeeded.setValue(false);
        // formGroup.controls.shipmentNeeded.enable();
        // this.setShipmentAndCarrierValidity(null, formGroup);
      }

      // formGroup.controls.articleReceivedSKU.updateValueAndValidity();
      // formGroup.controls.compensationId.reset();
      let coolingOff =
        !orderItemsToReturnDetails?.value?.isReturnPeriodExpired?.toString();
      setReturnCompensation(currentUserValue?.value?.role?.id, val, coolingOff);
    };

    const setReturnCompensation = (
      appRoleId,
      consequentialDamage,
      coolingOff
    ) => {
      let payload = { appRoleId, consequentialDamage, coolingOff };
      store.dispatch("searchReturnOrder/fetchCompensation", payload);
    };
    const onShipmentChange = () => {
      if (selectedReturnShipment.value === "true") {
        getReturnCarriersFromRec4po(group);
      }
      if (
        selectedReturnShipment.value === "true" ||
        selectedReturnShipment.value === "false"
      ) {
        setShipmentAndCarrierValidity(selectedReturnShipment.value, group);
      }
      setCarrierPickupDate();
    };

    const getReturnCarriersFromRec4po = (group) => {
      const item = group.value.packages;
      const customerCountry =
        orderItemsToReturnDetails.value.deliveryAddress.countryName;
      const matchedMapping = warehouseMapping.find(
        (mapping) => mapping.customerCountry === customerCountry
      );
      const destinationWarehouse = matchedMapping
        ? matchedMapping.allowedWarehouseId
        : undefined;

      const requiredServiceIds = {
        serviceName: "return",
        id: 1,
      };
      let carriers = group.value.carriers;
      let currentItem = group;

      if (!currentItem.isRec4poFetched) {
        const wareHouseIdForSK = 3;
        const wareHouseForWilson =
          destinationWarehouse === 2 ? wareHouseIdForSK : destinationWarehouse;

        group.wareHouseId = wareHouseForWilson;
        const payload = {
          destinationCountry: customerCountry,
          postalCode:
            orderItemsToReturnDetails.value.deliveryAddress.postalCode,
          packages: [
            {
              size: {
                length: item.length,
                width: item.width,
                height: item.height,
              },
              volume: item.volume,
              weight: item.weight,
              value: item.value,
            },
          ],
          allowedWarehouseIds: [destinationWarehouse],
          requiredServiceIds: [requiredServiceIds.id],
        };
        store
          .dispatch("searchReturnOrder/fetchReturnCarriersRec4po", payload)
          .then(() => {
            var data = store.state.searchReturnOrder.setCarriersRec4po;
            if (data) {
              currentItem.isRec4poFetched = true;
              isRec4poFetched.value = true;
              const numberOfCurrentCarriers = carriers.length;
              carriers.splice(0, numberOfCurrentCarriers);

              const carriersFromRec4po = data.carriers;
              const orderCosts = data.orderCosts;
              const userCountry = customerCountry;
              const countryGroupCH_GB = ["CH", "GB"];
              const countryGroupCEE6 = ["SK", "SI", "RO", "HU", "HR", "BG"];

              const carrierDefault = {
                id: 0,
                shortName: "Default",
                longName: "Default",
                companyName: "Default",
                displayName: "Default (0 €)",
                shipmentCost: 0,
              };
              const carrierReturnByCustomer = {
                id: 0,
                shortName: "Return By Customer",
                longName: "Return By Customer",
                companyName: "Return By Customer",
                displayName: "Return By Customer (0 €)",
                shipmentCost: 0,
              };

              const rec4poCarriers = Object.keys(carriersFromRec4po).map(
                (key) => {
                  const carrier = data.carriers[key];
                  const carrierId = carrier.id;
                  const orderCost = orderCosts.find(
                    (cost) => cost.carrierId === carrierId
                  );

                  const carrierNameMap = rec4poCarrierListToMap.find(
                    (carrier) => carrier.id === carrierId
                  );
                  const shipmentFee = (
                    orderCost.shipmentCosts[0].totalCost / 1000
                  ).toFixed(2);

                  return {
                    id: parseInt(key),
                    shortName: carrierNameMap.shortName,
                    longName: carrier.name,
                    companyName: carrier.name,
                    displayName:
                      carrierNameMap.displayName + " (" + shipmentFee + " €)",
                    shipmentCost: shipmentFee,
                  };
                }
              );

              if (countryGroupCH_GB.includes(userCountry)) {
                carriers.unshift(carrierDefault);
              } else if (countryGroupCEE6.includes(userCountry)) {
                carriers.unshift(carrierReturnByCustomer);
              }
              carriers.push(...Object.values(rec4poCarriers));

              carriersList.value = carriers;

              carriers.sort(
                (a, b) =>
                  parseFloat(a.shipmentCost) - parseFloat(b.shipmentCost)
              );

              hasReturnShipmentFeeRec4po.value = true;
            }
          });
      }
    };

    const setShipmentAndCarrierValidity = (shipmentNeeded, group) => {
      if (shipmentNeeded === "false" || shipmentNeeded == null) {
        console.log(group.value.carriers);
        group.value.carriers = null;
        console.log(group.value.carriers);
      } else {
        // carrier required
        // formGroup.controls.carrier.setValidators(Validators.required);
      }
    };
    const setCarrierPickupDate = () => {
      console.log(group);
      let returns = [group.value];
      if (returns) {
        for (let returnObj of returns) {
          if (pickupCarriersList.has(returnObj.carrier)) {
            pickupCarrierSelected.value = true;
            break;
          } else {
            pickupCarrierSelected.value = false;
          }
        }
      }
      console.log(pickupCarrierSelected);
    };
    const onCarrierChange = () => {
      const selectedCarrier = selectedCarrier.value;
      const selectedCarrierObj = carriersList.find(
        (carrier) => carrier.shortName === selectedCarrier
      );
      if (isRec4poFetched) {
        returnShipmentFee.value = selectedCarrierObj.shipmentCost;
      } else {
        // Sent the Value as 5 if we have no response from Rec4po
        returnShipmentFee.value = 5;
      }

      if (selectedCarrier.value !== undefined) {
        setCarrierPickupDate();
      }
    };
    const buildForm = async () => {
      const payload = {
        referenceNumber: returnOrderId,
        orderItemId: "",
        culture: localStorage.getItem("userPreferredLanguage"),
      };
      await store.dispatch("searchReturnOrder/getOrdersToReturn", payload);
      orderItemsToReturnDetails.value =
        store.state.searchReturnOrder.orderItemsToReturn;
      if (orderItemsToReturnDetails?.value) {
        wayOfDistribution.value =
          orderItemsToReturnDetails?.value?.wayOfDistribution;

        orderItemsToReturnDetails?.value?.orderItems?.forEach((item) => {
          const unitPriceGrossLocalCurrency = 0;
          const fallbackValue = 1;
          const itemValue =
            unitPriceGrossLocalCurrency === 0
              ? fallbackValue
              : unitPriceGrossLocalCurrency;

          group.value = {
            articleNumber: item.articleNumber,
            orderItemId: item.orderItemId,
            quantity: 1,
            conditionCode: item.conditionCode,
            outboundTrackingNumber: item.outboundTrackingNumber,
            articleDescription: item.articleDescription,
            returnReasonId: null,
            compensationId: null,
            returnUserDescription: null,
            carrier: null,
            consequentialDamage: null,
            articleReceivedSKU: null,
            shipmentNeeded: false,
            carriers: item.carriers,
            isKittingItem: item.isKittingItem,
            isKittingMaster: item.isKittingMaster,
            isSetItem: item.isSetItem,
            isSetMaster: item.isSetMaster,
            formattedArticleNumber: item.formattedArticleNumber,
            returnShipmentFee: returnShipmentFee.value,
            currency: orderItemsToReturnDetails?.value?.currency,
            packages: {
              length: parseFloat(item.length).toFixed(0),
              width: parseFloat(item.width).toFixed(0),
              height: parseFloat(item.height).toFixed(0),
              volume: parseFloat(item.volume).toFixed(0),
              weight: parseFloat(item.weightGross).toFixed(0),
              value: itemValue,
            },
          };
          if (returnOrderId != null) {
            group.returnUserDescription = true;
          }

          if (item.isKittingMaster || item.isSetMaster) {
            // Assuming this.returnsFormArray is a reactive array
            returnsFormArray.value.push({ ...group, disabled: true });
          } else {
            returnsFormArray.value.push(group);
          }
          disableShipmentNeeded(group);

          item.carriers
            .filter((x) => x.isPickup)
            .forEach((x) => pickupCarriersList.add(x.shortName));
        });
      }
      // Assuming this.dataSourceOrder is a reactive data property
      dataSourceOrder.value = returnsFormArray.value;

      // if (this.customerBankDetails !== null) {
      //   this.customerBankDetailsFormGroup.disabled = true;
      // }
    };
    onMounted(async () => {
      let tomorrow = new Date();
      tomorrow.setDate(new Date().getDate() + 1);
      pickupMinDate = tomorrow;
      // expiryDate =
      //   store.state.searchReturnOrder.getOrderDetails.orders[0].expiryDate;
      // if (!customerBankDetailsForm.value.disabled && isCashOnDelivery.value) {
      //   const ibanAccountNumberInput =
      //     customerBankDetailsForm.value.IBAN_AccountNumber;

      //   ibanAccountNumberInput.addEventListener(
      //     "input",
      //     debounce((event) => {
      //       const accountNumber = event.target.value;

      //       if (
      //         (props.order.bankDetailType === "IBAN" &&
      //           accountNumber.length > 13) ||
      //         accountNumber.length > 4
      //       ) {
      //         returnOrderService
      //           .fetchBBGBankAccounts(accountNumber)
      //           .then((result) => {
      //             if (result !== false) {
      //               // Handle account existence error:
      //               // - Add required validator
      //               // - Clear input
      //               // - Display error message
      //             }
      //           });
      //       }
      //     }, 500)
      //   );
      // }
      await store.dispatch("searchReturnOrder/getOrderDetailsAction");
      customerDetails.value =
        store.state.searchReturnOrder.getOrderDetails.customer;
      orders.value =
        store.state.searchReturnOrder.getOrderDetails.orders[0].coolingOff;
      buildForm();
    });

    return {
      customerDetails,
      consequentialDamage,
      selectedReturnReason,
      showCustomerInformation,
      showCompensation,
      returnShipmentNeeded,
      returnRegistrationReason,
      setConsequentialDamage,
      orders,
      currentUserValue,
      customerBankDetailsDisabled,
      isCashOnDelivery,
      orderItemsToReturnDetails,
      compensationsDetails,
      selectedCompensation,
      selectedReturnShipment,
      hasReturnShipmentFeeRec4po,
      pickupCarrierSelected,
      // returnFormGroup,
      carriersList,
      pickupMinDate,
      expiryDate,
      returnShipmentFee,
      selectedCarrier,
      formatValue,
      toggleCustomerInformation,
      toggleCompensation,
      onConsequentialDamageChanged,
      setReturnRegistrationReason,
      onReturnRegistrationReasonChanged,
      setReturnCompensation,
      onShipmentChange,
      setCarrierPickupDate,
      onCarrierChange,
    };
  },
};
</script>
