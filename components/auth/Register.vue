<template>
    <div class="login" :class="{active : $route.query.tab == 'register'}">
        <div class="header">sign up</div>
        <div v-if="errors && typeof errors == 'string'">
          <span class="text-danger">{{errors}}</span>
        </div>
        <div v-if="errors && typeof errors == 'array'">
          <span v-for="(err , index) in errors" :key="index">{{err}}</span>
        </div>
        <v-form v-model="valid" ref="registerForm">
            <v-text-field
                label="Name"
                v-model="form.name"
                :rules="rules.name"
                hide-details="auto">
            </v-text-field>
            <v-text-field
                label="Email"
                v-model="form.email"
                :rules="rules.email"
                hide-details="auto">
            </v-text-field>
            <v-text-field
            label="Phone"
            v-model="form.phone"
            :rules="rules.phone"
            hide-details="auto">
            </v-text-field>
            <span class="text-danger" v-if="errors.phone">{{errors.phone[0]}}</span>
            <v-text-field
                label="Password"
                type="password"
                v-model="form.password"
                :rules="rules.password"
                hide-details="auto">
            </v-text-field>
            <v-text-field
                label="Confirm Password"
                type="password"
                v-model="form.password_confirmation"
                :rules="rules.password_confirmation"
                hide-details="auto">
            </v-text-field>
            <v-btn @click.prevent="register" :loading="loading" class="btn">
                register
            </v-btn>
        </v-form>
        <div class="disabled">
          <p>Lorem ssum dolor sit amet, consectetur adipisicing elit. Praesentium quam voluptatem numquam similique commodi vel,</p>
          <nuxt-link class="btn-square block"  :to="{name : 'login' , query :{tab:'register'}}">click here to sign up</nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    methods:{
      register(){
        if(!this.loading){
          this.$refs.registerForm.validate();
          if(this.valid){
            this.$store.dispatch('myAuth/register' , {"auth" : this.$auth ,'form' :this.form})
          }
        }
      },
      active(){
          this.$router.push({name : 'login' , query:  {tab: 'register'}})
      },
    },
    computed: {
      ...mapGetters({
          loading: 'myAuth/registerLoading',
          errors: 'ui/formErrorsRegister'

      })
    },
    data: () => ({
      valid : false,
      rules:{

        password: [
          v => !!v || 'password is required',
          v => v.length >= 6 || 'password must be more than than 6 characters',
        ],
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        name: [
          v => !!v || 'name is required',
          v => v.length >= 6 || 'name must more than 5 characters',
        ],
        phone: [
          v => !!v || 'phone is required',
          v => v.length >= 6 || 'phone must more than 5 characters',
        ],
        password_confirmation: [
          v => !!v || 'password confitmation is required',
          v => v.length >= 6 || 'password confitmation must more than 5 characters',
        ],
      },
      
      form:{
        email :'',
        password :'',
        name :'',
        phone :'',
        password_confirmation :'',
      },
    }),
  }
</script>

 <style  scoped src="@/assets/scss/components/login.css"></style>
