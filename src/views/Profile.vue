<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-tabs v-model="tabMode" color dark fixed-tabs slider-color="success">
          <v-tab :key="'data'" ripple>My Data</v-tab>
          <v-tab :key="'posts'" ripple>My Posts</v-tab>
          <v-tab :key="'followers'" ripple>My Followers</v-tab>
          <v-tab-item :key="'data'"
            ><user-profile-data></user-profile-data
          ></v-tab-item>
          <v-tab-item :key="'posts'">
            <posts-list :posts="myPosts"></posts-list>
          </v-tab-item>
          <v-tab-item :key="'followers'">
            <my-followers-list :users="myFollowers"></my-followers-list>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userProfileData from '../components/UserProfileData';
import PostsList from '../components/PostsList';
import MyFollowersList from '../components/UsersList';

export default {
  data() {
    return {
      tabMode: 'data'
    };
  },
  computed: {
    myPosts() {
      return this.$store.getters.getMyPosts;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    myFollowers() {
      return this.$store.getters.getMyFollowers;
    }
  },
  created() {
    this.loadPosts();
    this.loadUsers();
  },
  watch: {
    $route: 'loadPosts',
    $route: 'loadUsers'
  },

  methods: {
    loadPosts() {
      this.$store.dispatch('loadPosts');
    },
    loadUsers() {
      this.$store.dispatch('loadUsers');
    }
  },
  components: {
    'user-profile-data': userProfileData,
    'posts-list': PostsList,
    'my-followers-list': MyFollowersList
  }
};
</script>

<style scoped>
</style>
