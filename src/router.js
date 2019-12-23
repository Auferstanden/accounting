import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import About from "@/views/About";
import Table from "@/views/Table";
import Search from "@/views/Search";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/tables/:year/:month",
      name: "table",
      component: Table
    },
    {
      path: "/search",
      name: "search",
      component: Search
    }
  ]
});
