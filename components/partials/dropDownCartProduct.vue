<template>
<div class="dcp">
    <div v-if="typeof products !== 'undefined' && !loading">
        <div class="dcp__wrapper" v-for="product in products" :key="product.id">
            <div class="dcp__remove pointer">
                <span @click.prevent="remove(product.isbn)">&times;</span>
            </div>
            <product-image :product="product" class="dcp__image pointer"  @click.prevent="$router.push({name:'shop-slug' , params:{slug:product.slug}})" />
            <div class="dcp__content">
                <div class="dcp__content-title pointer" @click.prevent="$router.push({name:'shop-slug' , params:{slug:product.slug}})">
                    <h2>{{product.title}}</h2>
                </div>
                <div v-if="product.author" class="dcp__content-author" @click.prevent="$router.push({name:'shop' , query:{author:product.author_slug}})">
                    <h2>BY {{product.author}}</h2>
                </div>
                <div class="dcp__content-price">
                    <del v-if="product.old_price">EGP{{product.old_price}}</del>
                    <span>EGP{{product.price}}</span>
                </div>
                <div class="border input p-1">
                    <v-icon
                    @click.prevent="update(product.isbn , product.qty - 1)"
                        color="white darken-2"  
                    >
                        mdi-minus
                    </v-icon>
                    <span >{{product.qty}}</span>
                    <!-- <span v-else>+10</span> -->
                    <v-icon
                        color="white darken-2"
                        @click.prevent="update(product.isbn , product.qty + 1)"
                    >
                        mdi-plus
                    </v-icon>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="loading">
         <v-skeleton-loader
            class="mx-auto w-full"
            max-width="600"
            :loading="loading"
            type="list-item-avatar-three-line"
        ></v-skeleton-loader>
    </div>
    <div class="no-items" v-else>
        <h2>No Items On Your Cart</h2>
    </div>

</div>
   
</template>
<script>
import { mapGetters } from 'vuex';
import ProductImage from './ProductImage.vue';
export default {
  components: { ProductImage },
    props:['products'],
    computed: {
       ...mapGetters({
            loading: 'shop/loading',
        })
    },
    data(){
        return{
            cartCount:30,
            i :3,
        }
    },
    methods:{
        remove(product){
           const payload = {
                ip: localStorage.getItem('ip'),
                product
            }
            this.$store.dispatch('shop/delete' , payload)

       },
       update(isbn , qty){
        //    console.log(qty)
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
 <style  scoped src="@/assets/scss/partials/dropdown-cart-product.css"></style>
