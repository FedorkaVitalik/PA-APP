<template>
  <div>
    <v-btn @click="openBlock = !openBlock" block color="secondary" dark
      >Write a post</v-btn
    >
    <v-card
      v-if="openBlock"
      class="mx-auto"
      color
      dark
      max-width="600"
      style="margin: 10px;"
    >
      <v-toolbar card color="blue-grey" dark>
        <v-toolbar-title>Submit a post</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-model="valid">
        <v-text-field
          class="headline"
          label="Title"
          v-model="title"
          :rules="titleRules"
        ></v-text-field>
        <v-text-field
          label="Text"
          v-model="body"
          :rules="bodyRules"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-grey"
          @click="addPost"
          :disabled="processing || !valid"
          depressed
        >
          Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openBlock: false,
      valid: false,
      title: null,
      body: null,
      bodyRules: [v => !!v || 'Please write a text'],
      titleRules: [v => !!v || 'Please write a title']
    };
  },
  computed: {
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    addPost() {
      if (this.title === '' || this.body === '') {
        throw new Error();
      } else {
        let postData = {
          title: this.title,
          body: this.body,
          createdBy: this.$store.getters.uId,
          date: Date.now()
        };

        try {
          this.$store.dispatch('addPost', postData);

          this.openBlock = false;
          this.title = null;
          this.body = null;
        } catch (error) {
          throw Error(error);
        }
      }
    }
  }
};
</script>

<style  scoped>
</style>