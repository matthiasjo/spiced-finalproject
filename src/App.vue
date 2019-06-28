<template>
  <div id="app">
    <div class="nav-wrapper">
      <div id="verified" v-if="verified">
        <p>Thank You. Your email has been verified!</p>
      </div>
      <div id="nav">
        <router-link class="nav" to="/">Welcome</router-link> |
        <router-link class="nav" to="/about">About</router-link> |
        <router-link class="nav" to="/events">Events</router-link> |
        <router-link class="nav" to="/connect/lost">Lost & Found</router-link> |
        <router-link class="nav" to="/adoption">Adoption</router-link> |

        <router-link v-if="userInfo.userId == null" class="nav" to="/auth"
          >Authentication</router-link
        >
        <router-link v-if="userInfo.userId !== null" class="nav" to="/logout"
          >Hello, {{ userInfo.first }}</router-link
        >
      </div>
    </div>
    <router-view />
  </div>
</template>

<style src="../public/style.general.css" scoped></style>

<script>
// @ is an alias to /src
import axios from "@/axios";
import { mapState } from "vuex";

export default {
  components: {},
  data: function() {
    return {};
  },
  mounted: function() {
    this.$store.dispatch("loadUserInfo");
  },
  methods: {},
  updated: function() {
    this.$nextTick(function() {
      if (this.verified) {
        setTimeout(() => this.$store.commit("disableVerfify"), 5000);
      }
    });
    if (this.$route.path == "/logout") {
      var self = this;
      axios.get("/logoutUser").then(async function(resp) {
        if (resp.data.success) {
          self.$store.dispatch("loadUserInfo");
          self.$router.push("/");
        }
      });
    }
  },
  computed: mapState(["userInfo", "verified"])
};
</script>
