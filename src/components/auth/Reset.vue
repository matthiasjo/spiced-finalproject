<template>
  <div class="hello">
    <div v-if="emailSend">
      <p>A email has been sent to {{ email }}</p>
    </div>
    <div v-if="error">{{ error }}</div>
    <form v-on:submit.prevent="resetAuth">
      <input
        class="input-login"
        type="email"
        name="email"
        required
        v-model="resetForm.email"
      />
      <b-button id="btn-sign" type="submit">Reset Password</b-button>
    </form>
    <b-button id="btn-sign-two" v-on:click.prevent="$emit('swap-loginForm')">
      Go back?
    </b-button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "Reset",
  props: {},
  data: function() {
    return {
      error: null,
      emailSend: false,
      email: "",
      resetForm: {
        email: null
      }
    };
  },
  mounted: function() {},
  methods: {
    resetAuth: function() {
      var self = this;
      axios
        .post("/resetAuth", this.resetForm)
        .then(function(resp) {
          if (resp.data.success) {
            self.emailSend = true;
            self.email = resp.data.email;
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

<style src="../../../public/style.reset.css" scoped></style>
