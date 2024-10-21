import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import AdminPanelLayout from "@/layouts/AdminPanelLayout.vue";
import AdminContentView from "@/pages/admin/AdminContentView.vue";
import UsersListView from "@/pages/admin/users/UsersListView.vue";
import AddUsersView from "@/pages/admin/users/AddUsersView.vue";
import EditUserView from "@/pages/admin/users/EditUserView.vue";
const routes = [
  { path: "/", name: "home", component: HomeView },
  {
    path: "/admin",
    name: "admin",
    component: AdminPanelLayout,
    children: [
      //  * Show Content form clicking Dashboard
      { path: "", name: "", component: AdminContentView },

      // * show Content from clicking Users Management -> Users List
      { path: "users", name: "users", component: UsersListView },

      // * set new route for AddUserView clicking + Add New user btn inside UserListView
      { path: "users/add", name: "addUser", component: AddUsersView },

      // * set new route for EditUserView Clicking Edit user btn inside userListView
      { path: "user/edit/:id", name: "editUser", component: EditUserView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
