import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

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
<<<<<<< HEAD
      path: "/welcome",
=======
      path: "/",
>>>>>>> f5ca1fe17d3f0d168cba9561845d6c10e441ccc5
      name: "landing",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Landing.vue")
    }
  ]
});
