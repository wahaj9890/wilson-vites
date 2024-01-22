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
                    @change="onCompensationChange"
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
                  <!-- :key="selectedReturnShipment" -->
                  <select
                    :disabled="!selectedReturnShipment"
                    v-model="selectedCarrier"
                    class="w-full p-2 border border-gray-300 rounded cursor-pointer"
                    @change="onCarrierChange"
                  >
                    <option
                      v-for="carrier in group.carriers"
                      :value="carrier.shortName"
                      :key="carrier.shortName"
                    >
                      {{ carrier.displayName }}
                    </option>
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
              <button
                class="bg-green-500 font-bold text-white py-2 px-4 my-2 rounded"
                @click="success"
              >
                Show success
              </button>
              <tr class="bg-gray-200 text-black mb-2">
                <td class="p-2 font-bold">Return User Description</td>
                <td class="p-2 font-bold">
                  <input
                    type="text"
                    v-model="userDescription"
                    class="w-full p-2 border border-gray-300 rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </transition>
      </div>
    </div>
    <button @click="submitReturn">Return</button>
    <CommonDialog v-if="variableRefundDialog" />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch, nextTick } from "vue";
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
import { eventBus } from "../../utils/eventBus";
import CommonDialog from "../common/CommonDialog.vue";
import { useToast } from "vue-toastification";
export default {
  name: "CustomerInformation",
  components: {
    CommonDialog,
  },
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const toast = useToast();
    const success = () => toast.success("You did it! 🎉");

    const showCustomerInformation = ref(true);
    const showCompensation = ref(true);
    const setConsequentialDamage = ref("");
    const userDescription = ref("");
    const selectedReturnReason = ref("");
    const selectedReturnShipment = ref(false);
    const selectedCompensation = ref("");
    const selectedCarrier = ref("");
    const currencyCode = ref("");
    const customerBankDetailsDisabled = ref(true);
    const isCashOnDelivery = ref(false);
    const isRec4poFetched = ref(false);
    const maxDiscountReject = ref(null);
    const pickupCarrierSelected = ref(false);
    const specificReasonSelected = ref(false);
    const variableRefundDialog = ref(false);
    const isReturnShipmentFeeValidated = ref(false);
    const valueInFigures = ref("");
    const valueInPercentage = ref("");
    const appRoleId = ref("");
    const isCheckBoxChecked = ref(false);
    const customerBankDetailsFormGroupDisabled = ref(false);
    var pickupMinDate = ref("");
    const expiryDate = ref("");
    const selectedCheckBox = ref("");
    const returnShipmentFee = ref(0);
    const wayOfDistribution = ref("");
    const variableRefund = ref("");
    const selection = ref([]);
    const hasReturnShipmentFeeRec4po = ref(false);
    const isDiscountRejected = computed(
      () => store.state.global.discountReject
    );
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
    //   // orderNumber: props.order.orderId,
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
    //     // OrderId: props.order.id,
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
    const dere = computed(() => store.state.global.discountReject);
    const orderItemsToReturnDetails = computed(
      () => store.state.searchReturnOrder.orderItemsToReturn
    );
    const compensationsDetails = computed(
      () => store.state.searchReturnOrder.getCompensation || []
    );
    let orders = ref([]);
    const group = ref([]);
    const formatValue = (value) => value || "-";

    // const orderItemId = ref("");
    const returnOrderId = route.query.orderId;

    const returnsFormArray = ref([]);
    const dataSourceOrder = ref([]);
    const pickupCarriersList = new Set();

    const disableShipmentNeeded = (group) => {
      appRoleId.value = currentUserValue?.value?.role?.id;

      if (
        appRoleId.value ===
          applicationRoles.WarehouseStaffHoppegarten.toString() ||
        appRoleId.value === applicationRoles.WarehouseStaffKaLi.toString() ||
        appRoleId.value === applicationRoles.WarehouseStaffSK.toString()
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
      group.value.consequentialDamage = setConsequentialDamage.value;
      const formGroup = returnsFormArray.value.at(isCheckBoxChecked.value);
      let val = formGroup.value.consequentialDamage == "1" ? "true" : "false";
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

    const onCompensationChange = () => {
      group.value.compensationId = selectedCompensation.value;
    };

    const onReturnRegistrationReasonChanged = (event) => {
      group.value.returnReasonId = selectedReturnReason.value;
      const formGroup = returnsFormArray.value.at(isCheckBoxChecked);
      if (
        event.target.value !== undefined &&
        !customerBankDetailsDisabled &&
        isCashOnDelivery
      ) {
        enableCustomerBankDetailsValidation(event.target.value);
      }

      if (event.target.value !== undefined && selectedReturnReason.value == 6) {
        // formGroup.controls.articleReceivedSKU.setValidators(
        //   Validators.required
        // );
      } else {
        // formGroup.controls.articleReceivedSKU.setValue(null);
        // formGroup.controls.articleReceivedSKU.clearValidators();
      }
      if (event.target.value !== undefined && selectedReturnReason.value == 9) {
        if (appRoleId.value === applicationRoles.CSAgent.toString()) {
          formGroup.value.shipmentNeeded = false;
          // we need to disable
          // formGroup.controls.shipmentNeeded.disable();
          setShipmentAndCarrierValidity(false, formGroup);
        }
      } else {
        formGroup.value.shipmentNeeded = false;
        // we need to enable
        // formGroup.controls.shipmentNeeded.enable();
        setShipmentAndCarrierValidity(null, formGroup);
      }

      // formGroup.controls.articleReceivedSKU.updateValueAndValidity();
      // formGroup.controls.compensationId.reset();
      let val = formGroup.value.consequentialDamage == "1" ? "true" : "false";

      let coolingOff =
        !orderItemsToReturnDetails?.value?.isReturnPeriodExpired?.toString();
      setReturnCompensation(appRoleId.value, val, coolingOff);
    };

    const enableCustomerBankDetailsValidation = (returnReason) => {
      var reasonFound = false;

      if (returnReason != 9) {
        // this.enableCustomerBankDetailsValidatorsInternal();
        reasonFound = true;
      }
      if (reasonFound == false) {
        if (this.selection.selected.length > 0) {
          let returns = this.selection.selected.map((x) => {
            return x.value;
          });

          returns.forEach((element) => {
            if (element.returnReasonId != 9) {
              reasonFound = true;
              this.enableCustomerBankDetailsValidatorsInternal();
              return;
            }
          });
        }
      }
      if (reasonFound == false) {
        this.clearCustomerBankDetailsValidators();
      }
    };

    const setReturnCompensation = (
      appRoleId,
      consequentialDamage,
      coolingOff
    ) => {
      let payload = { appRoleId, consequentialDamage, coolingOff };
      store.dispatch("searchReturnOrder/fetchCompensation", payload);
      toast.success("You did it! 🎉")
    };
    const onShipmentChange = () => {
      group.value.shipmentNeeded = Boolean(selectedReturnShipment.value);
      console.log(group.value.shipmentNeeded);
      console.log(typeof group.value.shipmentNeeded);
      const formGroup = returnsFormArray.value.at(selectedCheckBox);
      if (selectedReturnShipment.value === "true") {
        formGroup.isRec4poFetched = false;
        getReturnCarriersFromRec4po(formGroup);
      }
      if (
        selectedReturnShipment.value === "true" ||
        selectedReturnShipment.value === "false"
      ) {
        setShipmentAndCarrierValidity(selectedReturnShipment.value, formGroup);
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

        group.value.wareHouseId = wareHouseForWilson;
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
      // need to work on this
      if (shipmentNeeded === "false" || shipmentNeeded == null) {
        selectedReturnShipment.value = false;
        // console.log(group.value.carriers);
        // group.value.carriers = null;
        // console.log(group.value.carriers);
      } else {
        // carrier required
        // formGroup.controls.carrier.setValidators(Validators.required);
      }
    };
    const setCarrierPickupDate = () => {
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
    };
    const onCarrierChange = () => {
      const getSelectedCarrier = selectedCarrier.value;
      group.value.carrier = getSelectedCarrier;
      const selectedCarrierObj = carriersList.value.find(
        (carrier) => carrier.shortName === getSelectedCarrier
      );
      if (isRec4poFetched) {
        returnShipmentFee.value = selectedCarrierObj.shipmentCost;
      } else {
        // Sent the Value as 5 if we have no response from Rec4po
        returnShipmentFee.value = 5;
      }

      if (getSelectedCarrier.value !== undefined) {
        setCarrierPickupDate();
      }
    };
    const handleCheckBoxChange = ({ value, index, orderItem, checked }) => {
      selectedCheckBox.value = index;
      specificReasonSelected.value = value;
      isCheckBoxChecked.value = checked;
      let returns = group.value;

      if (isCashOnDelivery && !customerBankDetailsFormGroupDisabled) {
        if (returns.returnReasonId != null && returns.returnReasonId != 9) {
          specificReasonSelected.value = true;
          return;
        }

        if (!specificReasonSelected) {
          // this.clearCustomerBankDetailsValidators();
        } else {
          // this.enableCustomerBankDetailsValidatorsInternal();
        }
      }
      checkForVariableRefund(returns);
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
          returnsFormArray.value.push(group);

          item.carriers
            .filter((x) => x.isPickup)
            .forEach((x) => pickupCarriersList.add(x.shortName));
        });
      }
      // Assuming this.dataSourceOrder is a reactive data property
      dataSourceOrder.value = returnsFormArray.value;

      // if (this.customerBankDetails !== null) {
      //   this.customerBankDetailsFormGroupDisabled = true;
      // }
    };
    const checkForVariableRefund = (returns) => {
      currencyCode.value =
        store.state.searchReturnOrder.getOrderDetails.orders[0].currency;
      const countryCode =
        orderItemsToReturnDetails.value.deliveryAddress.countryName;
      const wayOfDistributionReturn = wayOfDistribution.value;
      const sku = returns.formattedArticleNumber;
      const orderItemId = returns.orderItemId;
      const item =
        store.state.searchReturnOrder.getOrderDetails.orders[0].orderItems.filter(
          (sItem) => sItem.orderItemId === orderItemId
        );
      const unitPrice = item[0].unitPriceGrossLocalCurrency;
      const orderItemQuantity = item[0].quantity;
      let payload = {
        sku,
        orderItemId,
        countryCode,
        wayOfDistributionReturn,
      };
      store
        .dispatch("searchReturnOrder/checkVariableRefund", payload)
        .then(() => {
          variableRefund.value = store.state.searchReturnOrder.variableRefund;
          if (
            variableRefund.value.isVariabeRefundApplied === false &&
            variableRefund.value.value !== 0
          ) {
            const percentage = variableRefund.value.value;
            const calculateOfferPrice =
              (unitPrice * percentage) / 100 / orderItemQuantity;
            valueInFigures.value = Math.trunc(calculateOfferPrice);
            valueInPercentage.value = percentage;
            if (appRoleId.value === "1" && isCheckBoxChecked.value) {
              openVariableRefundDialog(orderItemId, returns);
            }
          }
        });
    };
    const openVariableRefundDialog = (orderItemId, returns) => {
      const refundValue = valueInFigures.value;
      const comment = "customer accepted variable refund";
      const commentOnReject = "customer rejected variable refund";
      variableRefundDialog.value = true;
      store.watch(
        () => store.state.global.discountReject,
        (newData) => {
          isDiscountRejected.value = newData;
          if (isDiscountRejected.value === true) {
            const formGroupItems = returnsFormArray.value;
            const selectedItemIndex = formGroupItems.findIndex((item) => {
              return item.value.articleNumber === returns.articleNumber;
            });
            const formGroup = returnsFormArray.value.at(selectedItemIndex);
            const val =
              formGroup.consequentialDamage === "1" ? "true" : "false";
            const coolingOff = String(
              !store.state.searchReturnOrder.getOrderDetails.orders[0]
                .isReturnPeriodExpired
            );
            setReturnCompensation(appRoleId.value, val, coolingOff);
            group.value.returnUserDescription = comment;
            group.value.compensationId = 4;

            let payload = {
              orderItemId,
              refundAccepted: true,
              refund: refundValue,
              description: commentOnReject,
            };
            store.dispatch("searchReturnOrder/onUserAcceptedOffer", payload);
            variableRefundDialog.value = false;
          } else if (isDiscountRejected.value === false) {
            let payload = {
              orderItemId,
              refundAccepted: false,
              refund: refundValue,
              description: commentOnReject,
            };
            store.dispatch("searchReturnOrder/onUserAcceptedOffer", payload);
            variableRefundDialog.value = false;
          } else {
            isCheckBoxChecked.value = false;
          }
        }
      );
    };
    const validateReturnShipmentFee = () => {
      const orderItems =
        store.state.searchReturnOrder.getOrderDetails.orders[0].orderItems;
      const selectedItems = [group.value];
      const articleNumberToPriceMap = {};
      orderItems.forEach((item) => {
        articleNumberToPriceMap[item.articleNumber] =
          item.unitPriceGrossLocalCurrency;
      });

      selectedItems.forEach((item) => {
        const unitPriceGrossLocalCurrency =
          articleNumberToPriceMap[item.articleNumber];

        if (unitPriceGrossLocalCurrency !== undefined) {
          item.unitPriceGrossLocalCurrency = unitPriceGrossLocalCurrency;
          item.unitPrice = unitPriceGrossLocalCurrency / item.quantity;
        }
      });
      const validCompensationId = [1];
      const validateCompensationId = selectedItems.some((i) =>
        validCompensationId.includes(i.compensationId)
      );
      const validReturnReasons = [2, 4, 10];
      const isReturnReasonValid = selectedItems.some((i) =>
        validReturnReasons.includes(i.returnReasonId)
      );
      if (isReturnReasonValid && validateCompensationId) {
        const priceLimitToCharge = 50;
        function shouldChargeForReturn(selectedItems) {
          const itemsOver50 = selectedItems.filter(
            (item) => item.unitPrice >= priceLimitToCharge
          );
          if (itemsOver50.length === 0) {
            return false;
          } else if (itemsOver50.length > 1) {
            return false;
          } else {
            return true;
          }
        }
        function getItemWithPriceOver50(selectedItems) {
          const itemsOver50 = selectedItems.filter(
            (item) => item.value.unitPrice >= priceLimitToCharge
          );

          if (itemsOver50.length === 1) {
            // Creating an object with the details which have price more than 50
            const itemWithShipmentFee = {
              formattedArticleNumber:
                itemsOver50[0].value.formattedArticleNumber,
              articleNumber: itemsOver50[0].value.articleNumber,
            };

            return itemWithShipmentFee;
          }

          return null; // No item over 50 or more than 1 item over 50
        }
        const itemWithShipmentFee = getItemWithPriceOver50(selectedItems);
        const shouldCharge = shouldChargeForReturn(selectedItems);
        if (shouldCharge) {
          this.getReturnShipmentFee(
            itemWithShipmentFee.formattedArticleNumber,
            itemWithShipmentFee.articleNumber,
            this.wayOfDistribution,
            this.address.countryName // "FR"
          );
        } else {
          // this.showSpinner = false;
          isReturnShipmentFeeValidated.value = true;
        }
      } else {
        // this.showSpinner = false;
        isReturnShipmentFeeValidated.value = true;
      }
    };
    const submitReturn = () => {
      group.value.returnUserDescription = userDescription.value;
      console.log(typeof group.value);
      validateReturnShipmentFee();
      let returns = group.value;
      let coolingOffValue = String(
        !store.state.searchReturnOrder.getOrderDetails.orders[0]
          .isReturnPeriodExpired
      );
      debugger;
      console.log(returns);
      if (returns != null && Object.keys(returns).length > 0) {
        returns.consequentialDamage =
          returns.consequentialDamage == "1" ? "true" : "false";
      }

      // this.pickupDateGroup.controls.pickupWishDate.value;
      const alternativeAddress = JSON.parse(
        sessionStorage.getItem("additionalAddress")
      );
      let alternateAddressFilledData;
      let returnObj;
      if (alternativeAddress) {
        alternateAddressFilledData = {
          firstname: alternativeAddress.firstname || "",
          lastname: alternativeAddress.lastname || null,
          additionalDetails: alternativeAddress.additionalDetails || null,
          houseNumber: alternativeAddress.houseNumber || null,
          street: alternativeAddress.street || null,
          postalCode: alternativeAddress.postalCode || null,
          mobilePhoneNumber: alternativeAddress.mobilePhoneNumber || null,
          city: alternativeAddress.city || null,
          countryCode: alternativeAddress.countryCode || null,
        };
        returnObj = {
          orderNumber: this.returnFormGroup.controls.orderNumber.value,
          alternateAddress: alternateAddressFilledData,
          alternateEmailTelephone: this.alternateEmailTelephone.value,
          returnOrders: [returns],
          appRoleId: this.appRoleId,
          customerBankDetailsDto: !this.isCashOnDelivery
            ? null
            : this.customerBankDetailsFormGroup.value,
          coolingOff: coolingOffValue,
          pickupWishDate: selectedPickupDate
            ? new Date(
                Date.UTC(
                  selectedPickupDate.getFullYear(),
                  selectedPickupDate.getMonth(),
                  selectedPickupDate.getDate()
                )
              )
                .toISOString()
                .slice(0, 10)
            : null,
        };
      } else {
        returnObj = {
          orderNumber: returnOrderId,
          // alternateEmailTelephone: alternateEmailTelephone
          // .value
          returnOrders: [returns],
          appRoleId: appRoleId.value,
          customerBankDetailsDto: !isCashOnDelivery.value ? null : null, //this.customerBankDetailsFormGroup.value,
          coolingOff: coolingOffValue,
          pickupWishDate: null,
          // pickupWishDate: selectedPickupDate
          //   ? new Date(
          //       Date.UTC(
          //         selectedPickupDate.getFullYear(),
          //         selectedPickupDate.getMonth(),
          //         selectedPickupDate.getDate()
          //       )
          //     )
          //       .toISOString()
          //       .slice(0, 10)
          //   : null,
        };
      }
      store
        .dispatch("searchReturnOrder/createReturn", returnObj)
        .then(() => {});
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
      eventBus.on("specificReasonSelectedChanged", handleCheckBoxChange);
      eventBus.on("rejectRefunds", (data) => {
        maxDiscountReject.value = data.rejected;
      });
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
      dere,
      customerBankDetailsDisabled,
      isCashOnDelivery,
      orderItemsToReturnDetails,
      userDescription,
      compensationsDetails,
      selectedCompensation,
      selectedCheckBox,
      selectedReturnShipment,
      hasReturnShipmentFeeRec4po,
      pickupCarrierSelected,
      isReturnShipmentFeeValidated,
      specificReasonSelected,
      valueInPercentage,
      isCheckBoxChecked,
      currencyCode,
      isDiscountRejected,
      isRec4poFetched,
      returnsFormArray,
      // returnFormGroup,
      carriersList,
      variableRefund,
      selection,
      pickupMinDate,
      expiryDate,
      group,
      returnShipmentFee,
      selectedCarrier,
      wayOfDistribution,
      variableRefundDialog,
      customerBankDetailsFormGroupDisabled,
      valueInFigures,
      maxDiscountReject,
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
      success,
      handleCheckBoxChange,
      checkForVariableRefund,
      openVariableRefundDialog,
      onCompensationChange,
      validateReturnShipmentFee,
      submitReturn,
    };
  },
};
</script>
