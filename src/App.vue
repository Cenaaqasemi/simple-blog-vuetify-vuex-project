<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { defineOptions } from 'vue';
defineOptions({
  name : 'App',
});

</script>
<style>

</style>
