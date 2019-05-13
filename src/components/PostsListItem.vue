<template>
  <v-card
    class="mx-auto"
    color
    dark
    max-width="600"
    height="250"
    style="margin: 10px;"
    v-if="post"
  >
    <v-card-title>
      {{ post.title }}
      <v-spacer></v-spacer>
      <span class="title font-weight-light">My Blog</span>
    </v-card-title>

    <v-card-text class="headline font-weight-bold">
      {{ post.body }}
    </v-card-text>

    <v-card-actions>
      <v-list-tile class="grow">
        <v-list-tile-avatar color="grey">
          <v-icon>person</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title
            >{{ post.createdBy.fname }}
            {{ post.createdBy.lname }}</v-list-tile-title
          >
        </v-list-tile-content>

        <v-layout align-center justify-end>
          <v-icon
            class="mr-1"
            style="cursor: pointer;"
            color="white"
            @click="like"
            >favorite</v-icon
          >
          <span class="subheading mr-2">{{ post.countOfLikes.length }}</span>
          <span class="mr-1">·</span>
          <span class="subheading">{{ date(post.date) }}</span>
        </v-layout>
      </v-list-tile>
    </v-card-actions>
    <v-spacer></v-spacer>
    <v-btn
      flat
      color="orange"
      v-if="userData.uId === post.createdBy._id"
      @click="deletePost"
      >Delete post</v-btn
    >
    <v-dialog v-model="dialog" persistent max-width="550">
      <v-btn
        slot="activator"
        v-if="userData.uId === post.createdBy._id"
        flat
        color="orange"
        >Edit post</v-btn
      >
      <v-card>
        <v-card-text v-model="valid">
          <v-text-field
            class="headline"
            label="Title"
            v-model="post.title"
            :rules="titleRules"
          ></v-text-field>
          <v-text-field
            label="Text"
            v-model="post.body"
            :rules="bodyRules"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color flat @click="dialog = false">Disagree</v-btn>
          <v-btn color flat @click="editPost" :disabled="processing || !valid"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      valid: false,
      title: null,
      body: null,
      bodyRules: [v => !!v || 'Please write a text'],
      titleRules: [v => !!v || 'Please write a title']
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    like() {
      this.$store.dispatch('likePost', this.post._id);
    },
    editPost() {
      let postData = {
        title: this.title !== null ? this.title : this.post.title,
        body: this.body !== null ? this.body : this.post.body,
        createdBy: this.userData.uId,
        date: Date.now()
      };

      this.$store.dispatch('editPost', {
        postId: this.post._id,
        postData
      });
      this.dialog = false;
    },
    deletePost() {
      this.$confirm('Do you really want to delete post?').then(res => {
        if (res) {
          try {
            this.$store.dispatch('deletePost', this.post._id);
          } catch (error) {
            throw Error(error);
          }
        }
      });
    }
  }
};
</script>

<style  scoped>
</style>