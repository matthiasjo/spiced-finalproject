<template>
  <div class="hello">
    <form v-on:submit.prevent="sendReg">
      <input type="text" name="first" v-model="regForm.first" />
      <input type="text" name="last" v-model="regForm.last" />
      <input type="email" name="email" v-model="regForm.email" />
      <input type="password" name="password" v-model="regForm.password" />
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
        first: "",
        last: "",
        email: "",
        password: ""
      }
    };
  },
  mounted: function() {},
  methods: {
    sendReg: function() {
      var formData = new FormData();
      formData.append("first", this.regForm.first);
      formData.append("last", this.regForm.last);
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
