<template>
  <div class="main">
    <div v-if="verified">
      <p>Thank You. Your email has been verified!</p>
    </div>
    <div class="header">
      <div class="title">
        <b-img
          id="header-logo"
          src="https://www.onlygfx.com/wp-content/uploads/2018/01/grunge-paw-print-2.png"
          fluid
          alt="Responsive image"
        ></b-img>
        <h1 class="text-danger">DOG RESCUE</h1>
        <b-img
          id="header-logo"
          src="https://www.onlygfx.com/wp-content/uploads/2018/01/grunge-paw-print-2.png"
          fluid
          alt="Responsive image"
        ></b-img>
      </div>
      <div class="subtitle">
        <h3>Welcome to our Dog Rescue Site</h3>
        <h3>Together we save lives</h3>
      </div>
    </div>
    <div class="landing-help">
      <h1>Join the team and <a href="#"> help us </a>out</h1>
    </div>
  </div>
</template>

<style src="../../public/style.landing.css" scoped></style>

<script>
// @ is an alias to /src

import axios from "@/axios";

export default {
  name: "landing",
  components: {},
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
