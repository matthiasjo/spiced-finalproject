<template>
  <b-container id="b-container" fluid>
    <div class="main">
      <div class="header">
        <div class="title">
          <b-img
            id="header-logo"
            src="https://www.onlygfx.com/wp-content/uploads/2018/01/grunge-paw-print-2.png"
            fluid
            alt="Responsive image"
          ></b-img>
          <h1>DOG RESCUE</h1>
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
        <h1>
          Join the team and
          <a id="help-link" href="/#/adoption"> help us </a>out
        </h1>
      </div>
    </div>
  </b-container>
</template>

<style src="../../public/style.landing.css" scoped></style>

<script>
// @ is an alias to /src

//import axios from "@/axios";
//import { mapState } from "vuex";

export default {
  name: "landing",
  components: {},
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {},
  updated: function() {}
};
</script>
