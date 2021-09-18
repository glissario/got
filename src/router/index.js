import { createRouter, createWebHistory } from "vue-router";

const HomeGot = () => import("../views/HomeGot.vue");
const FamilyList = () => import("../views/FamilyList.vue");
const FamilyDetails = () => import("../views/FamilyDetails.vue");

const routes = [
  {
    path: "/",
    redirect: "/got",
  },
  {
    path: "/got",
    name: "HomeGot",
    component: HomeGot,
    children: [
      {
        path: "",
        component: FamilyList,
        name: "FamilyList",
      },
      {
        path: "/got/:index",
        component: FamilyDetails,
        name: "details",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
