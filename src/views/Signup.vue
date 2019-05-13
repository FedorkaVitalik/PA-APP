<template>
  <v-container fluid fill-height class="back">
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color>
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="error" type="warning"> {{ error }} </v-alert>
            <v-form v-model="valid">
              <v-text-field
                color
                id="fname"
                name="fname"
                label="First Name"
                type="fname"
                required
                v-model="fname"
                :rules="fnameRules"
              ></v-text-field>
              <v-text-field
                color
                id="lname"
                name="lname"
                label="Last Name"
                type="lname"
                required
                v-model="lname"
                :rules="lnameRules"
              ></v-text-field>
              <v-text-field
                color
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
            <v-btn
              color
              @click.prevent="signup"
              :disabled="processing || !valid"
              >Submit</v-btn
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
      fname: null,
      valid: false,
      lname: null,
      fnameRules: [v => !!v || 'Please write a first name'],
      lnameRules: [v => !!v || 'Please write a last name'],
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
    signup() {
      this.$store.dispatch('signup', {
        email: this.email,
        password: this.password,
        fname: this.fname,
        lname: this.lname
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
