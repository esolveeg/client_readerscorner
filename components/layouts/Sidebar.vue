<template>
    <div>
        <sidebar-languages />
        <sidebar-categories />
        <div class="sidebar__bestseller mb-8">
            <div class="header-2">
                <h2>Best Seller Books</h2>
            </div>
            <div class="bestseller-wrapper mb-8"  v-if="!loading && products.data.length > 0">
                <best-seller-product v-for="product in products.data" :key="product.id + 100" :product="product"/>
            </div>
            <div class="bestseller-wrapper mb-8" v-else-if="loading">
                <v-skeleton-loader
                    v-for="i in 4"
                    :key="i"
                    class="mx-auto w-full"
                    max-width="300"
                    :loading="loading"
                    type="list-item-avatar-three-line"
                ></v-skeleton-loader>
            </div>
        </div>
        <div class="sidebar__ad">
            <sidebar-ad-product />
        </div>
    </div>
</template>


<script>
import SidebarCategories from "@/components/partials/SidebarCategories.vue"
import BestSellerProduct from "@/components/partials/BestSellerProduct.vue"
import SidebarAdProduct from "@/components/partials/SidebarAdProduct.vue"
import { mapGetters } from 'vuex';
import SidebarLanguages from '../partials/SidebarLanguages.vue';

export default {
  components:{
    BestSellerProduct,
    SidebarAdProduct,
    SidebarCategories,
    SidebarLanguages
  },
  methods:{
    getProducts(){
      this.$store.dispatch('product/getBestseller')
    },
  },
  computed: {
      ...mapGetters({
          loading: 'product/bestsellerLoading',
          products: 'product/bestsellers',
      })
    },
  created(){
    this.getProducts();
  }
}
</script>

<style  scoped src="@/assets/scss/layouts/sidebar.css"></style>
