<template>
    <div class="cart-products" >
        <div v-if="typeof cart.products !== 'undefined'">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Products
                            </th>
                            <th class="text-left md-hidden">
                                Quantity
                            </th>
                            <th class="text-left md-hidden">
                                Price
                            </th>
                            <th class="text-left">
                                Total
                            </th>
                            <th class="text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td class="product">
                                <div class="product__wrapper">
                                    <v-skeleton-loader
                                        class="mx-auto w-full"
                                        max-width="600"
                                        :loading="loading"
                                        type="list-item-avatar-three-line"
                                    ></v-skeleton-loader>
                                </div>
                            </td>
                            <td class="mr-4">
                                <v-skeleton-loader
                                    class="mx-auto w-full"
                                    max-width="20"
                                    :loading="loading"
                                    type="list-item"
                                ></v-skeleton-loader>
                            </td>
                            <td class="price">
                                <v-skeleton-loader
                                    class="mx-auto w-full"
                                    max-width="20"
                                    :loading="loading"
                                    type="list-item"
                                ></v-skeleton-loader></td>
                            <td class="price">
                               <v-skeleton-loader
                                        class="mx-auto w-full"
                                        max-width="20"
                                        :loading="loading"
                                        type="list-item"
                                    ></v-skeleton-loader>
                            </td>
                        </tr>
                        <tr v-else v-for="product in cart.products" :key="product.id">
                            <td class="product">
                                <div class="product__wrapper">
                                    <product-image :product="product"/>
                                    <div class="product__deltails">
                                        <div class="product__title">
                                            <nuxt-link tag="h3" :to="{name:'shop-slug' , params:{slug:product.slug}}">{{product.title}}</nuxt-link>
                                        </div>
                                        <div class="product__author" v-if="product.author">
                                            <nuxt-link tag="h3" :to="{name:'shop' , params:{author:product.author_slug}}">By:{{product.author}}</nuxt-link>
                                        </div>
                                        <div class="border input mt-2 p-1 lg-hidden">
                                            <v-icon
                                                color="gray darken-2"
                                                @click="update(product.isbn , product.qty - 1)"
                                            >
                                                mdi-minus
                                            </v-icon>
                                            <span v-if="product.qty < 10">{{product.qty}}</span>
                                            <span v-else>+10</span>
                                            <v-icon
                                                color="gray darken-2"
                                                @click="update(product.isbn , product.qty + 1)"
                                            >
                                                mdi-plus
                                            </v-icon>
                                        </div>
                                    </div>
                                    
                                </div>
                            </td>
                            <td class="mr-4 md-hidden">
                                <div class="border input p-1">
                                    <v-icon
                                        color="gray darken-2"
                                        @click="update(product.isbn , product.qty - 1)"
                                    >
                                        mdi-minus
                                    </v-icon>
                                    <span v-if="product.qty < 10">{{product.qty}}</span>
                                    <span v-else>+10</span>
                                    <v-icon
                                        color="gray darken-2"
                                        @click="update(product.isbn , product.qty + 1)"
                                    >
                                        mdi-plus
                                    </v-icon>
                                </div>
                            </td>
                            <td class="md-hidden price">EGP{{product.price}}</td>
                            <td class="price relative">
                                <div class="price__wrapper">
                                    <span>EGP{{product.price * product.qty}}</span>
                                    <v-icon class="remove" @click="remove(product.isbn)">mdi-delete</v-icon>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <div class="total">
                <div class="coupon">
                    <div class="coupon__input rounded-2xl">
                        <input v-model="form.code" class="py-2   text-sm text-white bg-gray-900 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Ente Coupon Code..." autocomplete="off">
                        <div  v-if="couponNotFound !== null">
                            <span class="text-danger">{{couponNotFound}}</span>
                        </div>
                    </div>
                    <v-btn class="btn" :disabled="form.code == null" @click="applyCoupon" :loading="couponLoading">
                        <!-- //align with input on error msg -->
                         <div class="hidden"  v-if="couponNotFound !== null">
                            <span class="text-danger">{{couponNotFound}}</span>
                        </div>
                        <span>APPLY COUPON</span>
                    </v-btn>
                </div>
                <div class="flex totals justify-end">
                    <div class="sum">
                        <span>SUBTOTAL</span>
                        <span class="price">EGP{{cart.subtotal}}</span>
                    </div>
                    <div class="sum" v-if="cart.discount_percent">
                        <span>DISCOUNT({{cart.discount_percent}}%)</span>
                        <span class="price">EGP{{cart.discount_value}}</span>
                    </div>
                    <div class="sum" v-else-if="cart.discount_value">
                        <span>DISCOUNT</span>
                        <span class="price">EGP{{cart.discount_value}}</span>
                    </div>
                    <div class="sum">
                        <span>TOTAL</span>
                        <span class="price">EGP{{cart.total}}</span>
                    </div>




                </div>
            </div>
            <div class="actions">
                <nuxt-link  :to="{name:'shop'}" class="btn">
                    <span>Continue Shopping</span>
                </nuxt-link>
                <div class="btn" @click.prevent="$emit('checkout')">
                    <span>Poceed Cheackout</span>
                </div>
            </div>
        </div>
        <div v-else>
           <div class="completed">
                <div class="icon">
                    <svg class="w-32 h-32" id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m372.052 480h-264.104c-23.46 0-41.906-20.152-39.845-43.516l24.353-276c1.835-20.799 18.964-36.484 39.845-36.484h24.699v-41c0-45.767 37.233-83 83-83s83 37.233 83 83v41h24.699c4.418 0 8 3.582 8 8s-3.582 8-8 8h-24.699v36c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-105c-4.418 0-8-3.582-8-8s3.582-8 8-8h105v-41c0-36.944-30.056-67-67-67s-67 30.056-67 67v93c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-24.699c-12.528 0-22.806 9.411-23.907 21.891l-24.353 276c-1.241 14.062 9.807 26.109 23.907 26.109h264.104c14.117 0 25.147-12.064 23.907-26.109l-24.353-276c-.388-4.401 2.865-8.284 7.266-8.672 4.399-.385 8.284 2.865 8.672 7.266l24.353 276c2.062 23.369-16.39 43.515-39.845 43.515zm-178.052-69h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8zm0-40h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8z"/></svg>
                </div>
                <div class="header">
                    No Items On Your Cart
                </div>
                <a :to="{name:'shop'}" class="btn">
                    <span>continue shopping</span>
                </a>
            </div> 
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ProductImage from './ProductImage.vue'
export default {
   components: { ProductImage },
   props:['cart'],
   data(){
       return{
           errMsg : "",
           form : {
               code : null,
           }
       }
   },
   computed: {
       ...mapGetters({
            couponNotFound: 'shop/couponNotFound',
            couponLoading: 'shop/couponLoading',
            loading: 'shop/loading',
        })
    },
   methods:{
        remove(product){
           const payload = {
                ip: localStorage.getItem('ip'),
                product
            }
            this.$store.dispatch('shop/delete' , payload)

        },
        applyCoupon(){
            this.form.ip = localStorage.getItem('ip')
            this.$store.dispatch('shop/applyCoupon' , this.form)
            
        },
       
       update(isbn , qty){
           if(qty > 0){
               const payload = {
                    ip: localStorage.getItem('ip'),
                    qty: qty
                }
               this.$store.dispatch('shop/update' , {isbn , payload})
           } else {
               const snackbar = {
                    active : true,
                    text: 'item Can\'t be decreased'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
           }
       },
   }
}
</script>
 <style  scoped src="@/assets/scss/partials/cart-products.css"></style>
 <style  scoped src="@/assets/scss/partials/cart-completed.css"></style>
