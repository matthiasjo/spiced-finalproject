<template>
  <div class="hello" v-if="reset === false">
    <form v-on:submit.prevent="sendLogin">
      <input type="email" name="email" v-model="loginForm.email" />
      <input type="password" name="password" v-model="loginForm.password" />
      <button type="submit">Sign In</button>
    </form>
    <button v-on:click.prevent="$emit('swap-authForm')">Sign Up?</button>
    <div>
      <button v-on:click.prevent="resetForm()">Forgot your password?</button>
    </div>
  </div>
  <div v-else-if="reset === true">
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
      var formData = new FormData();
      formData.append("email", this.loginForm.email);
      formData.append("password", this.loginForm.password);
      //var self = this;
      axios
        .post("/sendLogin", this.loginForm)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
