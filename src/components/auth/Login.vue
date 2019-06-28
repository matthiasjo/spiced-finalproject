<template>
  <div class="hello" id="log" v-if="reset === false">
    <div v-if="error">{{ error }}</div>
    <form id="login-form" v-on:submit.prevent="sendLogin">
      <input
        class="input-login"
        type="email"
        name="email"
        required
        v-model="loginForm.email"
      />
      <input
        class="input-login"
        type="password"
        name="password"
        required
        v-model="loginForm.password"
      />
      <b-button id="btn-sign-two" type="submit">Sign In</b-button>
    </form>
    <b-button id="btn-sign" v-on:click.prevent="$emit('swap-authForm')"
      >Sign Up?</b-button
    >

    <b-button id="btn-sign" v-on:click.prevent="resetForm()"
      >Forgot your password?</b-button
    >
  </div>
  <div id="reset-form" v-else-if="reset === true">
    <Reset @swap-loginForm="resetForm" />
  </div>
</template>

<script>
import Reset from "@/components/auth/Reset.vue";
import axios from "@/axios";

export default {
  name: "Login",
  components: {
    Reset
  },
  props: {},
  data: function() {
    return {
      error: null,
      reset: false,
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  mounted: function() {},
  methods: {
    resetForm() {
      if (this.reset == false) {
        this.reset = true;
      } else {
        this.reset = false;
      }
      console.log(this.reset);
    },
    sendLogin: function() {
      var self = this;
      axios
        .post("/sendLogin", this.loginForm)
        .then(function(resp) {
          if (resp.data.success) {
            self.$store.dispatch("loadUserInfo");
            self.$router.push("/");
          } else {
            self.error = resp.data.error;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../../../public/style.login.css" scoped></style>
