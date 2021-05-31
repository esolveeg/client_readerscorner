<template>
   <div class="bs-product">
       <nuxt-link :to="{name:'shop-slug' , params:{slug:product.slug}}" tag="div" class="bs-product__wrapper">
           <div class="product__img bs-product__img">
              <product-image :product="product"/>
           </div>  
           <div>
                <div class="bs-product__title">
                    <h3>{{product.title}}</h3>
                </div>
                <div class="bs-product__price">
                    <span>EGP200</span>
                </div>
            </div>  
       </nuxt-link>
   </div>
</template>
<script>
import ProductImage from "./ProductImage.vue"

export default {
    components: { ProductImage },
  props:['product']
}
</script>
 <style  scoped src="@/assets/scss/partials/bestseller-product.css"></style>
