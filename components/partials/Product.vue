<template>
   <div class="product" @clock.prevent="$router.push({name:'product-slug'})">
       
       <div class="label" v-if="typeof product.price != 'undefined' && product.old_price"><span>30%</span><span>off</span></div>
       <div class="product__wrapper">
          <product-image :product="product" class="dcp__image" />    
           <div class="product__title">
               <nuxt-link tag="h3" :to="{name:'shop-slug' , params:{slug:product.slug}}">{{product.title}}</nuxt-link>
               <nuxt-link tag="h2" v-if="product.name" :to="{name:'shop' , query:{author:product.author_slug}}">By: {{product.name}}</nuxt-link>
           </div>
           <div class="product__price">
               <del v-if="typeof product.price != 'undefined' && product.old_price">EGP{{product.old_price}}</del>
               <span v-if="typeof product.price != 'undefined'">EGP{{product.price}}</span>
               
           </div>
           <div class="product__atc" @click.prevent="addToCart(product.isbn)">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464.5 301.1l36.5-178H141.3l-12.5-59.2L20.4 11 11 29.7l99 47.8 50 238.8h289s28.5 17.9 17.5 40.5c-4.9 7-12.5 15.6-26.1 15.6H152.8V393h287.7c19.8 0 36.5-10.4 45.9-27 18.4-34.4-21.9-64.9-21.9-64.9zm-286.7-5.7l-32.3-151.6H476l-31.3 151.6H177.8zM212.2 422.1c-21.9 0-39.6 17.6-39.6 39.4s17.7 39.4 39.6 39.4 39.6-17.6 39.6-39.4-17.7-39.4-39.6-39.4zm0 58.1c-10.4 0-18.8-8.3-18.8-18.7s8.3-18.7 18.8-18.7 18.8 8.3 18.8 18.7-8.4 18.7-18.8 18.7zM424.9 422.1c-21.9 0-39.6 17.6-39.6 39.4S403 501 424.9 501s40.7-17.6 39.6-39.4c0-21.8-17.7-39.5-39.6-39.5zm18.8 39.5c0 10.4-8.3 18.7-18.8 18.7s-18.8-8.3-18.8-18.7 8.3-18.7 18.8-18.7 19.8 8.3 18.8 18.7z"/></svg>
               <span> add to cart</span>
           </div>

       </div>
   </div>
</template>

<script>
import ProductImage from '@/components/partials/ProductImage.vue';
export default {
   props:['product'],
   components:{
       ProductImage
   },
   methods:{
       addToCart(product){
           if(this.$auth.loggedIn){
            const payload = {
                    product,
                    qty:1,
                }
            this.$store.dispatch('shop/create' , payload)
               window.localStorage.removeItem('product')
               window.localStorage.removeItem('qty')
           }else {
               window.localStorage.setItem('product' , product)
               window.localStorage.setItem('qty' , 1)
                const snackbar = {
                    active : true,
                    text: 'Please login to be able to add items to your cart'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
                this.$store.commit('ui/setLoginRequired' , true)
                this.$router.push({name:'login' , query:{tab:'login'}})
            }
       }
   }
}
</script>
 <style  scoped src="@/assets/scss/partials/product.css"></style>
