<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">
            <v-icon>person</v-icon> {{ userData.fname }} {{ userData.lname }}
          </h3>
          <h3 class="headline mb-0">
            <v-icon>email</v-icon> {{ userData.email }}
          </h3>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" persistent max-width="550">
          <v-btn slot="activator" flat color="orange">Edit data</v-btn>
          <v-card>
            <v-card-title class="headline"
              >Change my profile data?</v-card-title
            >
            <v-card-text>
              <v-alert :value="error" type="warning"> {{ error }} </v-alert>
              <v-form v-model="valid">
                <h3>I want to change</h3>
                <v-radio-group v-model="changeType">
                  <v-radio label="First Name" :value="'fname'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'fname'"
                    color
                    label="New First Name"
                    name="newFname"
                    type="name"
                    required
                    v-model="newFname"
                    :rules="fnameRules"
                  ></v-text-field>
                  <v-radio label="Last Name" :value="'lname'"></v-radio
                  ><v-text-field
                    v-if="changeType == 'lname'"
                    color
                    label="New Last Name"
                    name="newLname"
                    type="lname"
                    required
                    v-model="newLname"
                    :rules="lnameRules"
                  ></v-text-field>
                  <v-radio label="Email" :value="'email'"></v-radio>
                  <v-text-field
                    v-if="changeType == 'email'"
                    color
                    label="New Email"
                    name="newEmail"
                    type="email"
                    required
                    v-model="newEmail"
                    :rules="emailRules"
                  ></v-text-field>
                </v-radio-group>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color flat @click="dialog = false">Cancel</v-btn>
              <v-btn color flat @click="edit" :disabled="processing || !valid"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      changeType: '',
      valid: false,

      newFname: null,
      newLname: null,
      newEmail: null,

      fnameRules: [v => !!v || 'Please write a first name'],
      lnameRules: [v => !!v || 'Please write a last name'],
      emailRules: [
        v => !!v || 'Please write an email',
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Incorrect email'
      ]
    };
  },
  computed: {
    userData() {
      return this.$store.getters.userData;
    },
    error() {
      return this.$store.getters.getError;
    },
    processing() {
      return this.$store.getters.getProcessing;
    }
  },
  methods: {
    edit() {
      this.$store
        .dispatch('editUserData', {
          uId: this.$store.getters.uId,
          newData: {
            fname: this.newFname !== null ? this.newFname : this.userData.fname,
            lname: this.newLname !== null ? this.newLname : this.userData.lname,
            email: this.newEmail !== null ? this.newEmail : this.userData.email
          }
        })
        .then(Response => {
          console.log(Response);

          this.dialog = false;
          this.newFname = null;
          this.newLname = null;
          this.newEmail = null;
        });
    }
  }
};
</script>

<style  scoped>
</style>