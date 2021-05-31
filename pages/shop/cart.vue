<template>
    <div class="cart">
        <div class="page-header">
            <div class="explore">
                <h1>Cart</h1>
            </div>
        </div>
        <div class="cart__wrapper container">
            <div class="cart__tabs">
                <v-tabs
                    v-model="tab"
                    centered
                    :disabled="cartDisabled"
                    >
                    <v-tab 
                    >
                       1. Shopping Cart
                    </v-tab>
                     <v-tab 
                     :disabled="billing"
                    >
                       2. Billing Information
                    </v-tab>
                     <v-tab 
                     :disabled="!success"
                    >
                       3. Completed
                    </v-tab>
                </v-tabs>
            </div>
            <div class="cart__content">
                <v-tabs-items v-model="tab">
                    <v-tab-item v-if="!loading">
                        <cart-products :cart="cart" @checkout="goToCheckout"/>
                    </v-tab-item>
                    <v-tab-item v-else>
                         <v-skeleton-loader
                            class="mx-auto w-full"
                            max-width="600"
                            v-for="i in 5"
                            :key="i"
                            :loading="loading"
                            type="list-item"
                        ></v-skeleton-loader>
                    </v-tab-item>
                    <v-tab-item>
                        <cart-billing @success="goToSuccess()"/>
                    </v-tab-item>
                    <v-tab-item>
                        <cart-completed/>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>

    </div>
</template>
<script>
import CartProducts from "@/components/partials/CartProducts.vue"
import CartCompleted from "@/components/partials/CartCompleted.vue"
import CartBilling from "@/components/partials/CartBilling.vue"
import { mapGetters } from 'vuex';
  export default {
    data () {
        
      return {
        billing :  !this.$auth.loggedIn,
        tab: null,
        cartDisabled:true,
        success : false,
      }
    },
    methods:{
        goToCheckout(){
           if(this.$auth.loggedIn && typeof this.cart.products !== 'undefined'){
               this.tab = 1
           } else {
               this.$store.commit('ui/setLoginRequired' , true)
               this.$router.push({name:'login' , query:{tab:'login'}})
           }
        },
        goToSuccess(){
            this.tab = 2
            // this.success = true
            this.billing = false
            this.cartDisabled = false
        }
    },
    computed: {
       ...mapGetters({
            cart: 'shop/cart',
            loading: 'shop/loading',
        })
    },
    mounted(){
        typeof this.cart.products == 'undefined' ? this.billing = true : ''
    },
    components:{
        CartProducts,
        CartBilling,
        CartCompleted
    },
  }
</script>
 <style  scoped src="@/assets/scss/pages/cart.css"></style>
