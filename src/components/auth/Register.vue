<template>
  <div class="hello">
    <div v-if="emailSend">
      <p>A verification email has been sent to {{ email }}</p>
    </div>
    <form v-on:submit.prevent="sendReg">
      <input type="text" name="first" required v-model="regForm.first" />
      <input type="text" name="last" required v-model="regForm.last" />
      <input type="email" name="email" required v-model="regForm.email" />
      <input
        type="password"
        name="password"
        required
        v-model="regForm.password"
      />
      <button type="submit">Submit</button>
    </form>
    <button v-on:click.prevent="$emit('swap-authForm')">Sign in?</button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "Register",
  props: {},
  data: function() {
    return {
      emailSend: false,
      email: "",
      regForm: {
        first: null,
        last: null,
        email: null,
        password: null
      }
    };
  },
  mounted: function() {},
  methods: {
    sendReg: function() {
      var self = this;
      axios
        .post("/sendReg", this.regForm)
        .then(function(resp) {
          if (resp.data.success) {
            self.emailSend = true;
            self.email = resp.data.email;
          }
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
