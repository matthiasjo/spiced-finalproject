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
    return {};
  },
  mounted: function() {},
  methods: {},
  updated: function() {}
};
</script>
