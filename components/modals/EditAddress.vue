<template>
    <div class="text-center">
    <v-dialog
      v-model="modal.active"
      :width="800"
    >
      <v-card>
        <v-card-title color="red" class="headline grey lighten-2">
         Edit Address
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
            @click.prevent="update"
            :loading="loading"
          >
            Update
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
    </v-dialog>
  </div>
</template>

<script>

import { mapGetters , mapMutations } from 'vuex';

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
        building : '',
        street : '',
        state : '',
        floor : '',
        phone : '',
        apartment : '',
        city_id : null,
      },
    }),
    computed: {
      ...mapGetters({
          loading: 'address/loading',
          address: 'address/address',
          cities: 'address/cities',
          modal: 'ui/editAddress',
      })
    },
    methods: {
        update(){
          this.$refs.form.validate()
          if(this.valid){
            this.$store.dispatch('address/update' , {"id" : this.modal.id ,'form' :this.form})
            .then(() => {
              this.$store.commit('ui/clearEditAddress')
            })
          }
        }, 
        getCities(){
          this.$store.dispatch('address/getCities')
        },
        ...mapMutations({
            toggle: 'ui/toggleEditAddress' // map `this.add()` to `this.$store.commit('increment')`
        }),
    },
    created(){
      this.getCities()
    },
    watch: {
      address : function(val){
        this.form = val
      }
    }
  }
</script>