import Router from "vue-router";
//import Home from "./views/Home.vue";
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },

    {
      path: "/",
      name: "landing",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Landing.vue")
    },
    {
      path: "/events",
      name: "events",
      component: () =>
        import(/* webpackChunkName: "resetPass" */ "./components/auth/ResetPass.vue")
    }
  ]
});
