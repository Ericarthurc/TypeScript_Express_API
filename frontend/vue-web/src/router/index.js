import { createRouter, createWebHistory } from "vue-router";
// there is also createWebHashHistory and createMemoryHistory

import Login from "../views/Login.vue";
import Main from "../views/Main.vue";
import store from "../store";

export const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  strict: true,
  routes: [
    // { path: "/", name: "root" },
    { path: "/", name: "login", component: Login },
    {
      path: "/main",
      name: "main",
      component: Main,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.state.userAPI.loggedIn) {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });

export default router;
