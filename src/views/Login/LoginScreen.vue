<template>
  <div
    class="flex flex-col items-center min-h-[90vh] overflow-hidden bg-[#F7F7F7]"
  >
    <p class="font-bold mainHeading underline md:hidden">
      {{ $t("login.wilson.welcome") }}
    </p>
    <div v-if="!hideSpinner" class="flex gap-4 flex-wrap">
      <SfLoaderCircular class="!ring-yellow-200" size="2xl" />
    </div>
    <form class="bg-white p-8 rounded-lg shadow-md max-w-md mt-14 w-full">
      <h2 class="primaryHeading font-bold mb-6">{{ $t("login.Btn") }}</h2>

      <div class="mb-4">
        <label
          for="language"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ $t("login.language") }}</label
        >
        <select
          v-model="selectedLanguage"
          id="language"
          @change="updateLanguage"
          class="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        >
          <option
            v-for="lang in selectLanguages"
            :key="lang.value"
            :value="lang.value"
          >
            {{ lang.language }}
          </option>
        </select>
      </div>

      <div class="mb-4 relative">
        <label
          for="password"
          class="block text-gray-700 text-sm font-bold mb-2"
          >{{ $t("login.profile") }}</label
        >
        <select
          id="profile"
          v-model="selectedProfile"
          @change="updateProfile(selectedProfile)"
          class="w-full cursor-pointer px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
        >
          <option
            v-for="role in profileRoles"
            :key="role.value"
            :value="role.value"
          >
            {{ role.displayValue }}
          </option>
        </select>
      </div>

      <button
        class="bg-yellow-400 primaryHeading text-black py-2 px-4 rounded-md w-full hover:bg-yellow-500 focus:outline-none focus:ring focus:border-gray-700"
        @click.prevent="SignIn"
      >
        {{ $t("login.Btn") }}
      </button>
    </form>
  </div>
</template>

<script>
import { PublicClientApplication } from "@azure/msal-browser";
import { environment, graphEndPoints } from "../../environment";
import request from "../../utils/request";
import { mapState } from "vuex";
import { SfLoaderCircular } from "@storefront-ui/vue";
import { clearLocalStorage } from "../../utils/globalMethods";
import { roles, languages } from "../../utils/lookup";
export default {
  name: "LoginScreen",
  data() {
    return {
      // GRAPH_ENDPOINT: "https://graph.microsoft.com/v1.0/me",
      // GRAPH_ENDPOINT_MEMBER_OF: "https://graph.microsoft.com/v1.0/me/memberOf",
      GRAPH_ENDPOINT: graphEndPoints.graphEndPoint,
      GRAPH_ENDPOINT_MEMBER_OF: graphEndPoints.graphMemberOf,
      account: undefined,
      profile: "",
      userInfo: "",
      loggedIn: false,
      hideSpinner: true,
      accessToken: "",
      error: "",
      returnUrl: "/returns",
      userData: "",
      selectedLanguage: "en-GB",
      selectedProfile: "WILSON_CTS_Agents",
      selectLanguages: languages,
      // languages: [
      //   { language: "English", value: "en-GB", locale: "en-GB" },
      //   { language: "German", value: "de-DE", locale: "de-DE" },
      //   { language: "Slovak", value: "sk-SK", locale: "sk-SK" },
      // ],
      profileRoles: roles,
      // roles: [
      //   { value: "WILSON_CTS_Agents", displayValue: "csAgent" },
      //   {
      //     value: "WILSON_Warehouse_Staff_Hoppegarten",
      //     displayValue: "warehouseStaffHoppegarten",
      //   },
      //   {
      //     value: "WILSON_Warehouse_Staff_KaLi",
      //     displayValue: "warehouseStaffKaLi",
      //   },
      //   {
      //     value: "WILSON_Warehouse_Staff_SK",
      //     displayValue: "warehouseStaffSK",
      //   },
      //   { value: "Variable_Refund_Uploader", displayValue: "M & A Director" },
      //   { value: "WILSON_C2R_Staff", displayValue: "C2R Team" },
      // ],
    };
  },
  components: {
    SfLoaderCircular,
  },
  computed: {
    ...mapState({
      isAuthenticatedUser: (state) => state.global.authenticatedUser,
    }),
  },
  async created() {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig
    );
  },
  async mounted() {
    this.updateLanguage();
    const currentUserValue = localStorage.getItem("currentUser");

    if (currentUserValue) {
      this.$router.push({ name: "returns" });
      this.$store.dispatch("global/clearAllState");
    }
    const storedLanguage = localStorage.getItem("userPreferredLanguage");
    if (storedLanguage) {
      this.selectedLanguage = storedLanguage;
    }
    await this.$msalInstance.initialize();
    this.account = this.$msalInstance.getAllAccounts();
  },
  methods: {
    async SignIn() {
      try {
        await this.$msalInstance.loginPopup({
          // scopes: ["user.read", "Directory.Read.All"],
          scopes: ["user.read", "openid", "profile"],
        });
        this.account = this.$msalInstance.getAllAccounts();

        if (this.account.length > 0) {
          this.account = this.account[0];
          await this.acquireTokenAndMakeGraphRequest();
        }
      } catch (error) {
        this.$store.dispatch("notifications/showErrorToast", "Login Fails");
        console.error(`error during authentication: ${error}`);
      }
    },
    async acquireTokenAndMakeGraphRequest() {
      try {
        const tokenResponse = await this.$msalInstance.acquireTokenSilent({
          account: this.account,
          scopes: ["user.read", "Directory.Read.All"],
        });
        // Use the obtained token for authorization
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        };

        // Make a request to Microsoft Graph API
        const graphResponse = await fetch(this.GRAPH_ENDPOINT_MEMBER_OF, {
          headers: reqHeader,
        })
          .then((res) => res.json())
          .then((response) => {
            this.profile = response;
            var roleFound = false;
            var specialRole = false;
            for (let memberof of this.profile.value) {
              if (
                memberof.displayName == "SEC-Developer-Admin" ||
                memberof.displayName == "QM&Returns"
              ) {
                specialRole = true;
                roleFound = true;
                break;
              }
            }
            if (specialRole == false) {
              for (let memberof of this.profile.value) {
                if (memberof.displayName == this.selectedProfile.value) {
                  roleFound = true;
                  specialRole = true;
                  break;
                }
              }
            }
            if (roleFound === false || specialRole === false) {
              this.error = "user not found";
              this.hideSpinner = true;
              // this.loginInvalid = true;
            } else {
              roleFound = true;
              this.hideSpinner = false;
              const checkGraphResponse = fetch(this.GRAPH_ENDPOINT, {
                headers: reqHeader,
              })
                .then((res) => res.json())
                .then((user) => {
                  this.userInfo = user;
                  var payload = {
                    firstName: this.userInfo.givenName,
                    lastName: this.userInfo.surname,
                    email: this.userInfo.userPrincipalName,
                    role: this.selectedProfile,
                  };
                  request
                    .post(`${environment.apiUrl}/api/employee/login-employee`, {
                      body: payload,
                    })
                    .then((data) => {
                      this.userData = data;
                      if (data !== null) {
                        localStorage.setItem(
                          "currentUser",
                          JSON.stringify(this.userData.data.data)
                        );
                      }
                      // this.isAuthenticatedUser = true;
                      this.$store.dispatch("global/clearAllState");

                      if (this.userData.data.data.role.id != null) {
                        this.fetchConsequentialDamage();
                        this.fetchReturnReasons();
                      }

                      if (
                        this.userData !== null ||
                        this.userData !== undefined
                      ) {
                        const currentUserRole =
                          localStorage.getItem("currentUserRole");
                        if (currentUserRole === "Variable_Refund_Uploader") {
                          this.returnUrl = "variable-refunds/variable-refunds";
                        } else if (currentUserRole === "C2R_Staff") {
                          this.returnUrl = "returns/bulk-return";
                        } else {
                          this.returnUrl = "returns/return-order";
                        }

                        this.$router.push("/returns");
                      }
                    });
                  return user.data;
                });
            }
          });
        // const graphData = await graphResponse.json();
      } catch (error) {
        console.error(
          "Error during token acquisition or Graph API request:",
          error
        );
      }
    },
    async signOut() {
      const variable_Refund_Uploader = localStorage.getItem("currentUserRole");
      if (variable_Refund_Uploader) {
        localStorage.removeItem("currentUserRole");
      }
      clearLocalStorage();
      // localStorage.removeItem("currentUser");
      // localStorage.removeItem("userPreferredLanguage");
      // localStorage.removeItem("consequentialDamage");
      // localStorage.removeItem("ReturnReasonsScene_Damage_true_coolingOff_true");
      // localStorage.removeItem(
      //   "ReturnReasonsScene_Damage_true_coolingOff_false"
      // );
      // localStorage.removeItem(
      //   "ReturnReasonsScene_Damage_false_coolingOff_true"
      // );
      // localStorage.removeItem(
      //   "ReturnReasonsScene_Damage_false_coolingOff_false"
      // );
      this.$router.push("/");
      this.$emit("close");
      // this.$store.commit("clearModuleStates");
      this.$store.dispatch("global/clearAllState");
    },
    updateLanguage() {
      localStorage.setItem("userPreferredLanguage", this.selectedLanguage);
      this.$i18n.locale = this.selectedLanguage;
    },
    updateProfile() {
      if (this.selectedProfile === "Variable_Refund_Uploader") {
        localStorage.setItem("currentUserRole", "Variable_Refund_Uploader");
      } else if (this.selectedProfile === "WILSON_C2R_Staff") {
        localStorage.setItem("currentUserRole", "C2R_Staff");
      } else {
        const currentUserRole = localStorage.getItem("currentUserRole");
        if (currentUserRole) {
          localStorage.removeItem("currentUserRole");
        }
      }
    },
    fetchConsequentialDamage() {
      let appRoleId = this.userData.data.data.role.id;
      request
        .get(`${environment.apiUrl}/api/returns/get-consequential-damage`, {
          params: { appRoleId },
        })
        .then((data) => {
          localStorage.setItem(
            "consequentialDamage",
            JSON.stringify(data.data.data)
          );
        });
    },
    fetchReturnReasons() {
      const payloads = [
        {
          payload: {
            appRoleId: this.userData.data.data.role.id,
            consequentialDamage: true,
            coolingOff: true,
          },
          keys: "ReturnReasonsScene_Damage_true_coolingOff_true",
        },
        {
          payload: {
            appRoleId: this.userData.data.data.role.id,
            consequentialDamage: true,
            coolingOff: false,
          },
          keys: "ReturnReasonsScene_Damage_true_coolingOff_false",
        },
        {
          payload: {
            appRoleId: this.userData.data.data.role.id,
            consequentialDamage: false,
            coolingOff: true,
          },
          keys: "ReturnReasonsScene_Damage_false_coolingOff_true",
        },
        {
          payload: {
            appRoleId: this.userData.data.data.role.id,
            consequentialDamage: false,
            coolingOff: false,
          },
          keys: "ReturnReasonsScene_Damage_false_coolingOff_false",
        },
      ];

      payloads.forEach((item) => {
        this.$store.dispatch("global/fetchRegistrationReasons", item);
      });
    },
  },
};
</script>

<style scoped></style>
