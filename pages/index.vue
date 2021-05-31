<template>
  <div class="app">
    <slider />

    <div class="app__wrapper">
      <div class="container">
        <div class="home__grid">
          <div class="sidebar">
            <sidebar/>
          </div>
          <div class="products">
            <SidebarCategories />
            <div class="category-title flex justify-between items-center">
            </div>
            
            <div class="products__wrapper" v-if="loading">
              <v-skeleton-loader
                  v-for="i in 12"
                  :key="i"
                  class="mx-auto w-full"
                  max-width="300"
                  :loading="loading"
                  type="card"
                ></v-skeleton-loader>
            </div>
            <div class="products__wrapper" v-else-if="products.total > 0">
              <Product v-for="product in products.data" :key="product.id" :product="product"/> 
            </div>
            <no-data class="products" v-else/>

            <nuxt-link :to="{name : 'shop'}" class="view__all">
              <h3 class="mt-4">View All Books</h3>
            </nuxt-link> 
            <!-- <div class="offer__slider">
              <OfferSlider />
            </div> -->
             
            
          </div>
           

          <div class="logos">
             <LogosSlider/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Product from "@/components/partials/Product.vue"
import Sidebar from "@/components/layouts/Sidebar.vue"
import Slider from "@/components/home/Slider.vue"
// import OfferSlider from "@/components/home/OfferSlider.vue"
import LogosSlider from "@/components/home/LogosSlider.vue"
import SidebarCategories from "@/components/partials/SidebarCategories.vue"
import { mapGetters } from 'vuex';
import NoData from '../components/partials/NoData.vue'
export default {
  components:{
    Product,
    Sidebar,
    Slider,
    // OfferSlider,
    SidebarCategories,
    LogosSlider,
    NoData
  },
  methods:{
    getProducts(){
      this.$store.dispatch('product/get' , {key:'home'})
    },
  },
  computed: {
      ...mapGetters({
          loading: 'product/loading',
          products: 'product/products',
      })
    },
  created(){
    this.getProducts();
  }
}
</script>


 <style  scoped src="@/assets/scss/home/slider.css"></style>
 <style  scoped src="@/assets/scss/home/main.css"></style>
