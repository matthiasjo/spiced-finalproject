<template>
  <div class="home">
    <div v-if="verified">
      <p>Thank You. Your email has been verified!</p>
    </div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue";
import axios from "@/axios";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      verified: false
    };
  },
  mounted: function() {
    var self = this;
    axios.get("/getUserData").then(function(resp) {
      if (resp.data.success) {
        // do something
      } else if (resp.data.verified) {
        self.verified = true;
      }
    });
  },
  methods: {},
  updated: function() {
    this.$nextTick(function() {
      if (this.verified) {
        setTimeout(() => (this.verified = false), 5000);
      }
    });
  }
};
</script>
