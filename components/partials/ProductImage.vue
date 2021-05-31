<template>
    <nuxt-link :to="{name:'shop-slug' , params:{slug:product.slug}}" tag="div" class="product__img">
        <figure v-if="product.thumbnail">
            <v-img :src="product.thumbnail" width="100%" :alt="product.title"></v-img>
        </figure>
        <figure v-else-if="product.image">
            <v-img  :src="product.image" :alt="product.title"></v-img>
        </figure>
        <img v-else src="https://res.cloudinary.com/dwfcmvqn5/image/upload/v1550827381/no-img.jpg" :alt="product.title">
    </nuxt-link>
</template>

<script>
export default {
    props:['product']
}
</script>