<template>
  <div>
    <users-list :users="users"></users-list>
  </div>
</template>

<script>
import UsersList from '../components/UsersList';

export default {
  computed: {
    users() {
      return this.$store.getters.getUsers;
    }
  },
  components: {
    'users-list': UsersList
  },
  created() {
    this.loadUsers();
  },
  watch: {
    $route: 'loadUsers'
  },

  methods: {
    loadUsers() {
      this.$store.dispatch('loadUsers');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>