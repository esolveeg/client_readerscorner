<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
       offset-y 
       left bottom>
    
      <template v-slot:activator="{ on, attrs }" >
        <div class="relative">
          <svg  v-bind="attrs" v-on="on" class="w-8 h-8" id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m372.052 480h-264.104c-23.46 0-41.906-20.152-39.845-43.516l24.353-276c1.835-20.799 18.964-36.484 39.845-36.484h24.699v-41c0-45.767 37.233-83 83-83s83 37.233 83 83v41h24.699c4.418 0 8 3.582 8 8s-3.582 8-8 8h-24.699v36c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-105c-4.418 0-8-3.582-8-8s3.582-8 8-8h105v-41c0-36.944-30.056-67-67-67s-67 30.056-67 67v93c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-24.699c-12.528 0-22.806 9.411-23.907 21.891l-24.353 276c-1.241 14.062 9.807 26.109 23.907 26.109h264.104c14.117 0 25.147-12.064 23.907-26.109l-24.353-276c-.388-4.401 2.865-8.284 7.266-8.672 4.399-.385 8.284 2.865 8.672 7.266l24.353 276c2.062 23.369-16.39 43.515-39.845 43.515zm-178.052-69h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8zm0-40h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8z"/></svg>
          <span  v-if="typeof cart.products !== 'undefined' && cart.products.length > 0 " class="badge">
            <span v-if="cart.products.length <= 10">{{cart.products.length}}</span>
            <span v-else>10+</span>
          </span>
        </div>
      </template>
        <v-card class="cartdropdown relative" dark v-if="typeof cart.products !== 'undefined' && cart.products.length > 0">
            <div class="cartdropdown__wrapper">
                    <drop-down-cart-product :products="cart.products"></drop-down-cart-product>
                    <!-- <drop-down-cart-product></drop-down-cart-product>
                    <drop-down-cart-product></drop-down-cart-product> -->
                </div>
                <div class="cartdropdown__total"  v-if="typeof cart.products !== 'undefined'">
                    <span>SUBTOTAL</span>
                    <h2>EGP{{cart.subtotal}}</h2>
                    <a @click.prevent="goToCart" class="checkout">View Cart</a>
                </div>
        </v-card>
        <v-card class="cartdropdown p-4 relative" dark v-else>
           <div class="completed flex flex-column justify-center items-center" >
              <div class="icon white-text">
                  <svg  class="w-12 h-12" id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m372.052 480h-264.104c-23.46 0-41.906-20.152-39.845-43.516l24.353-276c1.835-20.799 18.964-36.484 39.845-36.484h24.699v-41c0-45.767 37.233-83 83-83s83 37.233 83 83v41h24.699c4.418 0 8 3.582 8 8s-3.582 8-8 8h-24.699v36c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-105c-4.418 0-8-3.582-8-8s3.582-8 8-8h105v-41c0-36.944-30.056-67-67-67s-67 30.056-67 67v93c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-24.699c-12.528 0-22.806 9.411-23.907 21.891l-24.353 276c-1.241 14.062 9.807 26.109 23.907 26.109h264.104c14.117 0 25.147-12.064 23.907-26.109l-24.353-276c-.388-4.401 2.865-8.284 7.266-8.672 4.399-.385 8.284 2.865 8.672 7.266l24.353 276c2.062 23.369-16.39 43.515-39.845 43.515zm-178.052-69h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8zm0-40h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8z"/></svg>
              </div>
              <div class="header py-4 px-8 white-text text-center">
                  No Books On Your Cart Yet!
              </div>
          </div>
        </v-card>
    </v-menu>
  </div>
</template>

<script>
// import DropDownCartProduct from "@/components/partials/dropDownCartProduct.vue"
// import NoData from "@/components/partials/NoData.vue"
import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),
     components:{
        // DropDownCartProduct,
        // NoData
    },
    computed: {
       ...mapGetters({
            DCPOpenned: 'ui/DCPOpenned',
            cart: 'shop/cart',
            loading: 'shop/loading',
        })
    },
    methods:{
        getCart(){
            this.$store.dispatch('shop/get');
        },
        goToCart(){
            this.menu = false
            this.$router.push({name:'shop-cart'})
        }
    },
    mounted(){
      this.getCart()
    }
  }
</script>
 <style  scoped src="@/assets/scss/partials/dropdown-cart.css"></style>
<style scoped>
.badge{
  position: absolute;
  top: -20px;
  left: -12px;
  padding: 10px;
  background-color: var(--primary-color);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>