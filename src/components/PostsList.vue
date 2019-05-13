<template>
  <v-container>
    <v-layout row wrap>
      <v-flex
        v-for="post in posts"
        :key="post._id"
        xs12
        sm10
        md8
        offset-sm1
        offset-md2
      >
        <post-card :post="post"></post-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Post from './PostsListItem';

export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  },

  components: {
    'post-card': Post
  }
};
</script>

<style  scoped>
</style>