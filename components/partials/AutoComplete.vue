<template>
  <div>
        <form method="GET">
          <div class="relative text-gray-600 focus-within:text-gray-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
              </button>
          </span>
          <input type="search" v-model="q" @input="search" class="py-2  rounded-2xl text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off">
          </div>
      </form>
      <div v-if="!loading" v-show="show" class="menu">
        <div class="close" @click.prevent="show = false">&times;</div>
        <div v-if="items.length > 0">
          <div v-for="item in items" :key="item.id" class="product">
            <product-image class="w-24 mb-4 mr-4" :product="item"/>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle >BY : {{item.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <del v-if="item.price.old_price">EGP{{item.price.old_price}}</del>
                <span v-if="item.price">EGP{{item.price.price}}</span>
            </v-list-item-action>
          </div>
        </div>
        <div v-else>
          <h2 class="w-full text-center">No books found</h2>
        </div>
      </div>
    
    
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      q : null,
      show : false
    }),
    computed: {
      ...mapGetters({
          items: 'product/searchProducts',
          loading: 'product/searchLoading',
      })
    },
    methods : {
       search () {
        // Items have already been loaded
        if (this.q.length < 3) return
        setTimeout(() => {
         this.$store.dispatch('product/search' , this.q)
         this.show = true
        },2000)
        console.log('asd')
       }
    },
   
  }
</script>
<style scoped>
.menu{
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 10;
  border-radius: 20px;
  padding: 20px;
  width: 400px;
  height: 400px;
  background-color: var(--gray-bg);
  box-shadow: var(--book-shadow);
  overflow: scroll;
}
.menu .product{
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}
.close{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  transition: var(--primary-transition);
  cursor: pointer;
}
</style>