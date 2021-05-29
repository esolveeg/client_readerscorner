<template>
    <div class="text-center">
   
      <v-card>
        <v-card-title color="red" class="headline grey lighten-2">
         Create Address
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-text-field
                    class="mb-8"
                    label="Building"
                    v-model="form.building"
                    :rules="rules.building"
                    hide-details="auto">
                </v-text-field>
                <v-text-field
                    class="mb-8"
                    label="Street"
                    v-model="form.street"
                    :rules="rules.street"
                    hide-details="auto">
                </v-text-field>
                <v-text-field
                    class="mb-8"
                label="State"
                v-model="form.state"
                :rules="rules.state"
                hide-details="auto">
                </v-text-field>
                <v-text-field
                    class="mb-8"
                    label="Floor"
                    v-model="form.floor"
                    :rules="rules.floor"
                    hide-details="auto">
                </v-text-field>
                <v-text-field
                    class="mb-8"
                    label="Phone"
                    v-model="form.phone"
                    :rules="rules.phone"
                    hide-details="auto">
                </v-text-field>
                <v-text-field
                    class="mb-8"
                    label="Apartment"
                    v-model="form.apartment"
                    :rules="rules.apartment"
                    hide-details="auto">
                </v-text-field>
                <v-select
                  :items="cities"
                  item-text="name"
                  item-value="id"
                  v-model="form.city_id"
                  :rules="rules.city"
                  label="City"
                ></v-select>
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="create"
            :loading="false"
          >
            Create
          </v-btn>
          <v-btn
            color="primary"
            text
            @click.prevent="toggle"
          >
            Cancle
          </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>

import { mapGetters , mapMutations } from 'vuex';
// import http from "@/repositories/Repository.js";

  export default {
    data: () => ({
      valid : false,
      rules:{
        building: [
          v => !!v || 'Building is required',
        ],
        title: [
          v => !!v || 'Title is required',
        ],
        street: [
          v => !!v || 'Street is required',
        ],
        state: [
          v => !!v || 'State is required',
        ],
        floor: [],
        phone: [],
        apartment: [],
        city: [
            v => !!v || 'City is required',
            v => !isNaN(v) || 'City Must Be Numeric',
        ],
      },
      form:{
        building : 'asd a',
        street : 'as',
        state : 'as',
        type : 'insert',
        floor : 'as',
        phone : 'asd',
        apartment : 'ad',
        city_id : 1,
      },
    }),
    computed: {
      ...mapGetters({
          loading: 'address/loading',
          address: 'address/address',
          cities: 'address/cities',
      })
    },
    methods: {
        create(){
          this.validate()
          if(this.valid){

            this.$store.dispatch('address/get' , this.form)
           
            // this.$axios.get('http://34.89.53.209/rcapi/public/products')
          }
        }, 
        validate () {
          this.$refs.form.validate()
        },
        ...mapMutations({
            toggle: 'ui/togglAddAddress' // map `this.add()` to `this.$store.commit('increment')`
        }),
    },
  }
</script>