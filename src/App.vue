<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Header from '@/components/Header';

export default {
  components: {
    'app-header': Header
  }
};
</script>
