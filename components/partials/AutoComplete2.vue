<template>
  <div>

    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      clearable
      hide-details
      hide-no-data
      hide-selected
      item-text="name"
      item-value="slug"
      placeholder="search"
      class="py-2 searchresult  rounded-2xl text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
      
    >
     </v-autocomplete>
      <v-expand-transition>
      <v-list
        v-if="model"
        class="red lighten-3"
      >
        <v-list-item
          v-for="item in items"
          :key="item.id"
        >
          <v-list-item-content>
            <product-image class="w-24 mb-4 mr-4" :product="item"/>
          
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
            <v-list-item-title >BY: {{item.name}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <del v-if="item.price.old_price">EGP{{item.price.old_price}}</del>
            <span>EGP{{item.price.price}}</span>
          </v-list-item-action>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </div>
     
    
</template>
<script>
import { mapGetters } from 'vuex';
import ProductImage from './ProductImage.vue';
  export default {
    data: () => ({
      model: null,
      search: null,
      tab: null,
    }),
    components:{
      ProductImage
    },

    watch: {
       model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search () {
        this.$store.dispatch('product/search' , this.search)
      },
    },
    computed: {
       ...mapGetters({
            isLoading: 'product/searchLoading',
            items: 'product/searchProducts',
        })

    },
  }
</script>