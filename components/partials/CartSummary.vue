<template>
    <v-card class="cartsummary relative">
        <div class="cartsummary__wrapper">
                <div class="product border-b p-8" v-for="product in cart.products" :key="product.id">
                    <div class="product__wrapper flex items-center">
                        <product-image class="mr-4 max-w-100" :product="product"/>
                        <div class="product__data text-left">
                            <nuxt-link tag="h2" :to="{name:'shop-slug' , params:{slug:product.slug}}" class="mb-2 p-title">{{product.title}}</nuxt-link>
                            <nuxt-link tag="h2" :to="{name:'shop' , query:{author:product.author_slug}}" class="mb-2 p-author text-gray">BY:{{product.author}}</nuxt-link>
                            <h2 class="mb-2  text-gray">QTY:{{product.qty}}</h2>
                            <h2 class="mb-2  text-gray">PRICE:{{product.price}}</h2>
                            <h2 class="mb-2  text-gray" v-if="product.qty > 1">TOTAL:{{product.price * product.qty}}</h2>
                        </div>
                    </div>
                </div>
                <!-- <drop-down-cart-product></drop-down-cart-product>
                <drop-down-cart-product></drop-down-cart-product> -->
            </div>
            <div class="cartsummary__total"  v-if="typeof cart.products !== 'undefined'">
                <div class="flex w-full justify-between items-center px-4">
                    <h2>SUBTOTAL: </h2>
                    <h2>EGP{{cart.subtotal}}</h2>
                </div>
                <div class="flex w-full justify-between items-center px-4" v-if="cart.shipping">
                    <h2>SHIPPING: </h2>
                    <h2>EGP{{cart.shipping}}</h2>
                </div>
                <div class="flex w-full justify-between items-center px-4"  v-if="cart.discount_percent">
                    <h2>DISCOUNT({{cart.discount_percent}}%): </h2>
                    <h2>EGP{{cart.discount_value}}</h2>
                </div>
                <div class="flex w-full justify-between items-center px-4"  v-else-if="cart.discount_value">
                    <h2>DISCOUNT: </h2>
                    <h2>EGP{{cart.discount_value}}</h2>
                </div>
                <div class="flex w-full justify-between items-center px-4">
                    <h2>TOTAL: </h2>
                    <h2>EGP{{cart.total}}</h2>
                </div>
            </div>
    </v-card>
</template>

<script>
// import DropDownCartProduct from "@/components/partials/dropDownCartProduct.vue"
// import NoData from "@/components/partials/NoData.vue"
import ProductImage from '@/components/partials/ProductImage.vue';
import { mapGetters } from 'vuex';
  export default {
    computed: {
       ...mapGetters({
            cart: 'shop/cart',
            loading: 'shop/loading',
        })
    },
    components:{
        ProductImage
    }
  }
</script>
<style  scoped src="@/assets/scss/partials/cart-summary.css"></style>
