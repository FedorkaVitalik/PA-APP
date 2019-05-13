<template>
  <v-card color dark style="margin: 10px;">
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{ user.fname }} {{ user.lname }}</span>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-btn @click="follow" :color="colorFollow" flat>
        <v-icon>forward</v-icon> Follow
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import constants from '../constants/constants.js';

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      colorFollow: null
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    }
  },
  mounted() {
    if (this.user) {
      this.checkFollows();
    }
  },
  methods: {
    async follow() {
      if (!this.user.followers.includes(this.userData.uId)) {
        this.colorFollow = constants.followUser;

        await this.$store.dispatch('follow', this.user._id);
      } else if (this.user.followers.includes(this.userData.uId)) {
        this.colorFollow =
          !this.user.followers.length > 0
            ? constants.notFollowUser
            : constants.notFollowByMe;

        await this.$store.dispatch('unFollow', this.user._id);
      }

      this.$store.dispatch('loadUsers');
    },
    checkFollows() {
      this.colorFollow =
        this.user.followers.length === 0
          ? constants.notFollowUser
          : this.user.followers.includes(this.userData.uId)
          ? constants.followUser
          : constants.notFollowByMe;
    }
  }
};
</script>

<style  scoped>
</style>