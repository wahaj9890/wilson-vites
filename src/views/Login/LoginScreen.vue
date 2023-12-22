<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen overflow-hidden grayFair"
  >
    <p class="font-bold underline md:hidden">Welcome in Wilson</p>
    <form class="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <!-- Title "Login" -->
      <h2 class="text-2xl font-bold mb-6">Login</h2>

      <!-- Email field -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter your email"
        />
      </div>

      <!-- Password field with eye icon -->
      <div class="mb-4 relative">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label
        >
        <input
          type="password"
          id="password"
          v-model="password"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Enter your password"
        />
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
          @click="togglePasswordVisibility"
        >
          <svg
            v-if="showPassword"
            class="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 12s3 9 10 9 10-9 10-9M5 12a9 9 0 019-9 9 9 0 010 18 9 9 0 01-9-9z"
            ></path>
          </svg>
          <svg
            v-else
            class="h-5 w-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2 12s3 9 10 9 10-9 10-9M5 12a9 9 0 019-9 9 9 0 010 18 9 9 0 01-9-9z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- "Forgot password" link with underline only on "Click here" -->
      <div class="mb-4">
        <p>
          Forgot your password?
          <a href="#" class="text-blue-500 underline">Click here</a>
        </p>
      </div>

      <!-- Black-colored Login button -->
      <button
        class="bg-yellow-400 text-black font-bold py-2 px-4 rounded-md w-full hover:bg-gray-800 focus:outline-none focus:ring focus:border-gray-700"
        @click.prevent="login"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginScreen",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    login() {
      // Implement your login logic here
      console.log("Login clicked");
    },
  },
};
</script>

<style scoped>
.grayFair {
  background-color: #f7f7f7;
}
</style>
