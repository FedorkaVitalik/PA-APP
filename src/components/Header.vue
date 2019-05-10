<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
    >
      <v-list>
        <v-list-tile v-for="(item, i) in menuItems" :key="`navdrawer${i}`">
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"> </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar relative color dark>
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      >
      </v-toolbar-side-icon>

      <router-link to="/" tag="span" style="cursor:pointer">
        <v-toolbar-title v-text="'My Blog'"> </v-toolbar-title
      ></router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="(item, i) in menuItems"
          :key="`menuItem${i}`"
          :to="item.route"
        >
          <v-icon left v-html="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click.prevent="logout" v-if="isUserAuthenticated">
          <v-icon left>exit_to_app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    };
  },
  computed: {
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    },
    menuItems() {
      return this.isUserAuthenticated
        ? [
            {
              icon: 'visibility',
              title: 'Read',
              route: '/articles'
            },
            {
              icon: 'extension',
              title: 'Learn',
              route: '/learn'
            },
            {
              icon: 'account_circle',
              title: 'Profile',
              route: '/profile'
            }
          ]
        : [
            {
              icon: 'input',
              title: 'Log In',
              route: '/login'
            },
            {
              icon: 'lock_open',
              title: 'Sign Up',
              route: '/signup'
            }
          ];
    }
  }
};
</script>

<style  scoped>
</style>