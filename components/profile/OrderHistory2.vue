<template>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="order in orders" :key="order.id" :loading="loading"
        class="mb-4"
      >
        <v-expansion-panel-header class="p-4 flex justify-between items-center">
           
            <ul>
                    <li class=" mb-4">
                        <span class="black-text uppercase">INVOICE NO:{{order.id}}</span>
                    </li>
                    <li class=" mb-4">
                        <span class="black-text uppercase">PAYMENT METHOD:{{order.gateway}}</span>
                    </li>
                    <li class=" mb-4">
                        <span class="black-text uppercase">INVOICE DATE:{{formate(order.created_at)}}</span>
                    </li>
                     <li class=" mb-4">
                        <span class="black-text uppercase">STATUS:{{order.status}}</span>
                    </li>
                </ul>

        </v-expansion-panel-header>
        <v-expansion-panel-content>
       <div class="body">
                    <div class="cart-products">
                        <v-simple-table>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Products
                                        </th>
                                        <th class="text-left">
                                            Quantity
                                        </th>
                                        <th class="text-left">
                                            Price
                                        </th>
                                        <th class="text-left">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="product in order.products" :key="product.id">
                                        <td class="product">
                                            <div class="product__wrapper">
                                                <div class="product__img">
                                                <figure v-if="product.thumbnail">
                                                        <img :src="product.thumbnail" :alt="product.title">
                                                    </figure>
                                                    <figure v-else-if="product.image">
                                                        <img  :src="product.image" :alt="product.title">
                                                    </figure>
                                                    <img v-else src="https://www.pacificfoodmachinery.com.au/media/catalog/product/placeholder/default/no-product-image-400x400.png" :alt="product.title">
                                                </div> 
                                                <div class="product__deltails">
                                                    <div class="product__title">
                                                        <nuxt-link tag="h3" :to="{name:'shop-slug' , params:{slug:product.slug}}">{{product.title}}</nuxt-link>
                                                    </div>
                                                    <div class="product__author">
                                                        <nuxt-link tag="h3" :to="{name:'shop' , params:{author:product.author_slug}}">By:{{product.author}}</nuxt-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="mr-4">
                                            <div class="">
                                                <span>{{product.qty}}</span>
                                            </div>
                                        </td>
                                        <td class="price">EGP{{product.price}}</td>
                                        <td class="price">
                                            <div class="price__wrapper">
                                                <span>EGP{{product.price * product.qty}}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                        <div class="total justify-end">
                            <div class="sum">
                                <span>TOTAL</span>
                                <span class="price">EGP{{order.subtotal}}</span>
                            </div>
                        </div>
                    </div>
                </div>
           
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data: ()=>({
        active: null,
    }),
    computed: {
      ...mapGetters({
          loading: 'myAuth/ordersLoading',
          orders: 'myAuth/orders',
      })
    },
    
    methods:{
        get(){
            this.$store.dispatch('myAuth/getOrders')
        },
        formate(val){
            const date =new Date(Date.parse(val))
            const month = '' + (date.getMonth() + 1)
            const day = '' + date.getDate()
            const year = date.getFullYear()
            return [year, month, day].join('-')
        }
    },
    watch:{
    },
    created(){
        this.get()
    }
}
</script>
 <style  scoped src="@/assets/scss/components/profile/order-history.css"></style>
 <style  scoped src="@/assets/scss/partials/cart-products.css"></style>
