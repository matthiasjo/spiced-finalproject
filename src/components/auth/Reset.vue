<template>
  <div class="hello">
    <form v-on:submit.prevent="resetAuth">
      <input type="text" name="first" v-model="resetForm.first" />
      <input type="text" name="last" v-model="resetForm.last" />
      <input type="email" name="email" v-model="resetForm.email" />
      <button type="submit">Reset Password</button>
    </form>
    <button v-on:click.prevent="$emit('swap-loginForm')">Go back?</button>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "Reset",
  props: {},
  data: function() {
    return {
      resetForm: {
        first: "",
        last: "",
        email: ""
      }
    };
  },
  mounted: function() {},
  methods: {
    resetAuth: function() {
      var formData = new FormData();
      formData.append("first", this.resetForm.first);
      formData.append("last", this.resetForm.last);
      formData.append("email", this.resetForm.email);
      //var self = this;
      axios
        .post("/resetAuth", this.resetForm)
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
