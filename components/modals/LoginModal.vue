<template>
    <div>
     <v-dialog
      v-model="modal.active"
      :width="500"
    >
      <v-card>
        <v-card-title color="red" class="headline grey lighten-2">
         Please Login to continue
        </v-card-title>
        <v-card-text>
        <v-form v-model="valid" ref="loginForm">
            <v-text-field
                label="Email"
                :rules="rules.email"
                v-model="form.email"
                ></v-text-field>
            <v-text-field
                label="Password"
                type="password"
                :rules="rules.password"
                v-model="form.password">
            </v-text-field>
        </v-form>
        <nuxt-link :to="{name: 'login' , query : {tab : 'register'}}">Don't have account? Register</nuxt-link>
       </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="login"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    methods:{
      login(){
        if(!this.loading){
          this.$refs.loginForm.validate();
          this.form.ip = localStorage.getItem('ip')
          if(this.valid){
            this.$store.dispatch('myAuth/manualLogin' , {"auth" : this.$auth ,'form' :this.form})
            .then(() => {
              console.log(this.$auth.loggedIn)
            })
          }
        }
      }
    },
    data: () => ({
      valid:false,
      rules:{

        password: [
          v => !!v || 'password is required',
          v => v.length >= 6 || 'password must be more than than 6 characters',
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
      },
      
      form:{
        email : 'ahmed@readerscorner.co',
        password : '123456',
        // ip: windwo.localStorage.getItem('ip')
      },
     
    }),
    computed: {
      ...mapGetters({
          loading: 'myAuth/loading',
          modal: 'ui/loginModal',

      })
    },
  }
</script>

 <style  scoped src="@/assets/scss/components/login.css"></style>
