<template>
  <div>
    <Login v-if="login" @swap-authForm="swapForm" />
    <Register v-else @swap-authForm="swapForm" />
  </div>
</template>

<script>
// @ is an alias to /src
import Register from "@/components/auth/Register.vue";
import Login from "@/components/auth/Login.vue";

export default {
  name: "Auth",
  components: {
    Register,
    Login
  },
  data: function() {
    return {
      login: true
    };
  },
  methods: {
    swapForm() {
      this.login = !this.login;
    }
  }
};
</script>
