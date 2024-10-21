<template>
  <v-container grid-list-md>
    <v-row justify="space-between" align="center" style="text-align: center">
      <v-col cols="12" sm="12" md="auto">
        <h1>Users List</h1>
      </v-col>
      <v-col cols="12" sm="12" md="auto">
        <v-btn
          rounded="lg"
          variant="outlined"
          prepend-icon="$plus"
          @click="navigateToAddNewUserComponent"
          >Add New User</v-btn
        >
      </v-col>
    </v-row>

    <!-- Loading Indicator -->
    <v-row v-if="isLoading">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-col>
    </v-row>

    <!-- Error Message -->
    <v-row v-if="isFetchError">
      <v-col cols="12" class="text-center">
        <v-alert type="error" dismissible>{{ isFetchError }}</v-alert>
      </v-col>
    </v-row>

    <!-- Users Tables -->
    <v-row>
      <v-col cols="12">
        <v-table class="custom-user-list-table rounded-lg">
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Username</th>
              <th class="text-left">Email</th>
              <th class="text-left">Phone</th>
              <th class="text-left">Age</th>
              <th class="text-left">Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.age }}</td>
              <td>
                <v-btn
                  variant="outlined"
                  prepend-icon="$edit"
                  rounded="lg"
                  @click="goToEditUserComponent(user.id)"
                  >Edit User</v-btn
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const users = computed(() => store.getters.allUsers);
const isLoading = computed(() => store.getters.loading);
const isFetchError = computed(() => store.getters.error);

onMounted(() => store.dispatch("fetchUsers"));
const navigateToAddNewUserComponent = () => {
  router.push({ name: "addUser" });
};
const goToEditUserComponent = async (userId) => {
  router.push({ name: "editUser", params: { id: userId } });
  // await store.dispatch("editUserModule/fetchUserById", userId);
};
</script>

<style scoped>
.custom-user-list-table {
  background-color: #eceff1;
}
.custom-table th {
  background-color: #e0e0e0;
  color: #000;
}
.custom-table td {
  background-color: #fff;
  color: #000;
}
</style>
