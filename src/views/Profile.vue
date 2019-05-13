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
          <v-tab-item :key="'followers'">My Followers</v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import userProfileData from '../components/UserProfileData';
import PostsList from '../components/PostsList';

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
    }
  },
  created() {
    console.log(this.myPosts);

    this.loadPosts();
  },
  watch: {
    $route: 'loadPosts'
  },

  methods: {
    loadPosts() {
      this.$store.dispatch('loadPosts');
    }
  },
  components: {
    'user-profile-data': userProfileData,
    'posts-list': PostsList
  }
};
</script>

<style scoped>
</style>
