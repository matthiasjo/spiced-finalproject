<template>
  <div class="hello">
    <div v-if="resetSuccess">
      <p>Your password has been reset</p>
    </div>
    <div v-if="error">{{ error }}</div>
    <form v-on:submit.prevent="resetPass">
      <input
        type="password"
        name="password"
        required
        v-model="resetForm.password"
      />
      <input
        type="password"
        name="password2"
        required
        v-model="resetForm.password2"
      />
      <button type="submit">Reset Password</button>
    </form>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "ResetPass",
  props: {},
  data: function() {
    return {
      error: null,
      resetSuccess: false,
      resetForm: {
        password: null,
        password2: null,
        email: this.$route.query.email,
        hash: this.$route.query.hash,
        iv: this.$route.query.iv
      }
    };
  },
  mounted: function() {},
  methods: {
    resetPass: function() {
      if (this.resetForm.password != this.resetForm.password2) {
        this.error = "Passwords to not match";
      } else {
        var self = this;
        axios
          .post("/resetPass", this.resetForm)
          .then(function(resp) {
            if (resp.data.success) {
              self.resetSuccess = true;
            } else {
              self.error = resp.data.error;
            }
          })
          .catch(err => console.log(err));
      }
    }
  },
  updated: function() {
    this.$nextTick(function() {
      if (this.resetSuccess) {
        setTimeout(() => this.$router.push("/"), 4000);
      }
    });
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
