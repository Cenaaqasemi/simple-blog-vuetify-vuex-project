<template>
  <v-card>
    <v-row>
      <v-app-bar color="blue-grey-darken-3" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        color="blue-grey-darken-4"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        :permanent="$vuetify.display.mdAndUp"
        :temporary="$vuetify.display.smAndDown"
      >
        <v-list>
          <router-link to="/admin">
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Dashboard"
              v-ripple
            ></v-list-item>
          </router-link>
          <router-link to="/admin/users">
            <v-list-item
              prepend-icon="mdi-account-box"
              title="Users Management"
              v-ripple
            ></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>

      <v-main class="h-screen">
        <div class="pa-7">
          <router-view></router-view>
        </div>
      </v-main>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const drawer = ref(true);

</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
.v-row {
  margin: 0 !important;
}
.v-main {
  padding-top: 1px !important;
  padding-left: 10px !important;
}
</style>
