<template>
    <div class="product">
        <div class="container">
            <div class="product__wrapper"  v-if="!loading">
                <div class="product__img">
                    <figure>
                        <img style="width:100%" :src="product.image" :alt="product.title">
                    </figure>
                </div>
                <div class="product__details">
                    <ul class="mb-4 product__details-categories">
                        <li>{{product.categories[0].title}}</li>
                        <li v-if="product.categories[0].title">{{product.categories[1].title}}</li>
                    </ul>
                    <h1 class="mb-4 product__details-title">
                        {{product.title}}
                    </h1>
                    <h2 class="mb-4 " v-if="product.author">
                        BY: {{product.author.name}}
                    </h2>
                    <h2 class="mb-4">
                        ISBN: {{product.isbn}}
                    </h2>
                    <div class="mb-4 product__details-price py-4 border-b"  v-if="typeof product.price !== 'undefiend'">
                        <del v-if="product.old_price">EGP{{product.old_price}}</del>
                        <span>EGP{{product.price}}</span>
                    </div>
                    <p class="mb-4 product__details-discripion">{{product.description}}</p>
                    <div class="mb-4 product__details-qty">
                        <div class="product__details-qty-wrapper">
                            <span>quantity:</span>
                            <div class="border input p-1">
                                <v-icon
                                    color="gray darken-2 pointer"
                                    @click.prevent="decrease"
                                >
                                    mdi-minus
                                </v-icon>
                                <v-text-field
                                    hide-details
                                    v-model="cartCount"
                                ></v-text-field>
                                <v-icon
                                    color="gray darken-2 pointer"
                                    @click.prevent="increase"
                                >
                                    mdi-plus
                                </v-icon>
                            </div>
                        </div>
                    </div>
                    <a class="btn atc-btn" @click.prevent="addToCart()">
                       <svg class="w-8 h-8 mr-4" id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m372.052 480h-264.104c-23.46 0-41.906-20.152-39.845-43.516l24.353-276c1.835-20.799 18.964-36.484 39.845-36.484h24.699v-41c0-45.767 37.233-83 83-83s83 37.233 83 83v41h24.699c4.418 0 8 3.582 8 8s-3.582 8-8 8h-24.699v36c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-105c-4.418 0-8-3.582-8-8s3.582-8 8-8h105v-41c0-36.944-30.056-67-67-67s-67 30.056-67 67v93c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-24.699c-12.528 0-22.806 9.411-23.907 21.891l-24.353 276c-1.241 14.062 9.807 26.109 23.907 26.109h264.104c14.117 0 25.147-12.064 23.907-26.109l-24.353-276c-.388-4.401 2.865-8.284 7.266-8.672 4.399-.385 8.284 2.865 8.672 7.266l24.353 276c2.062 23.369-16.39 43.515-39.845 43.515zm-178.052-69h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8zm0-40h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8z"/></svg> 
                       <span>add to cart</span>
                    </a>
                </div>
            </div>
            <div v-else>
                    <v-skeleton-loader
                        class="mx-auto w-full"
                        max-width="600"
                        :loading="loading"
                        type="list-item-avatar-three-line"
                    ></v-skeleton-loader>
                </div>
            <!-- <div class="product-reviews">
                <div class="product-reviews__head">
                    <h2>rating & reviews</h2>
                </div>
                <div class="product-reviews__wrapper">

                </div>

            </div> -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
      ...mapGetters({
          loading: 'product/loading',
          product: 'product/product',
          cart: 'shop/cart',
      })
    },
    data(){
        return{
            cartCount:1
        }
    },
    methods:{
        getProduct(){
            this.$store.dispatch('product/find' , this.$route.params.slug)
        },
        increase(){
            this.cartCount++
        },
        decrease(){
            if(this.cartCount !== 1){
                this.cartCount-- 
            } else {
                const snackbar = {
                    active : true,
                    text: 'item Can\'t be decreased'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
            }
        },
        addToCart(){
            if(this.$auth.loggedIn){
                const payload = {
                    product: this.product.isbn,
                    qty:this.cartCount
                }
                this.$store.dispatch('shop/create' , payload)
                // window.localStorage.removeItem('product')
                // window.localStorage.removeItem('qty')
                // window.localStorage.setItem('product' , this.product.isbn)
                // window.localStorage.setItem('qty' , 1)
            } else {
                // window.localStorage.removeItem('product')
                // window.localStorage.removeItem('qty')
                // window.localStorage.setItem('product' , this.product.isbn)
                // window.localStorage.setItem('qty' , 1)
                const snackbar = {
                    active : true,
                    text: 'Please login to be able to add items to your cart'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
                this.$store.commit('ui/setLoginRequired' , true)
                this.$router.push({name:'login' , query:{tab:'login'}})
            }
        }
    },
    created(){
        this.getProduct()
    }
}
</script>

 <style  scoped src="@/assets/scss/pages/product.css"></style>
