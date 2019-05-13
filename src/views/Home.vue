<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <create-post-card></create-post-card>
        <posts-list :posts="posts"></posts-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Post from '../components/Post';
import PostsList from '../components/PostsList';

export default {
  data() {
    return {};
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    }
  },
  components: {
    'create-post-card': Post,
    'posts-list': PostsList
  },
  created() {
    this.loadPosts();
  },
  watch: {
    $route: 'loadPosts'
  },

  methods: {
    loadPosts() {
      this.$store.dispatch('loadPosts');
    }
  }
};
</script>

<style scoped>
</style>
