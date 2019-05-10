<template>
  <v-app>
    <app-header></app-header>
    <v-content>
      <router-view />
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
};
</script>
