<template>
  <v-container fluid fill-height back>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color>
            <v-toolbar-title>Log In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="error" type="warning"> {{ error }} </v-alert>
            <v-form v-model="valid">
              <v-text-field
                color
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                required
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                color
                id="password"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color @click.prevent="login" :disabled="processing || !valid"
              >Log In</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      emailRules: [
        v => !!v || 'Please write an email',
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Incorrect email'
      ],
      passwordRules: [
        v => !!v || 'Please write a password',
        v => (v && v.length >= 6) || 'Password is so short - min 6 characters'
      ]
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    },
    isUserAuthenticated() {
      return this.$store.getters.isUserAuthenticated;
    }
  },
  watch: {
    isUserAuthenticated(val) {
      if (val === true) {
        this.$router.push('/');
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style scoped>
.back {
  background-image: url(../assets/image2.jpg);
  background-size: cover;
  object-fit: contain;
}
</style>

