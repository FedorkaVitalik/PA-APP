<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-container fluid>
          <v-layout row>
            <v-flex xs7 md12>
              <v-text-field
                color
                label="Search"
                v-model="searchTerm"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex
        v-for="user in filteredUsers"
        :key="user._id"
        xs12
        sm10
        md8
        offset-sm1
        offset-md2
      >
        <user-card :user="user"></user-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import User from './UsersListItem';

export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchTerm: null
    };
  },
  computed: {
    filteredUsers() {
      let users = this.users;

      if (this.searchTerm)
        users = users.filter(
          u =>
            u.fname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0 ||
            u.lname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) >= 0
        );

      return users;
    }
  },
  components: {
    'user-card': User
  }
};
</script>

<style  scoped>
</style>