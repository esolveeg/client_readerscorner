<template>
   <div class="wishlist">
       <product v-for="i in 8" :key="i"/>
   </div>
</template>

<script>
import Product from "@/components/partials/WishlistProduct.vue"

export default {
    components:{
        Product
    }
}
</script>
 <style  scoped src="@/assets/scss/components/profile/wishlist.css"></style>
