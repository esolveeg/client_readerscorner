<template>
   <div class="ad-product">
       <div class="ad-product__wrapper">
           <div class="ad-product__content">
                <div class="ad-product__category"  @click.prevent="$router.push({name:'shop' , query: {category : 'kids'}})">
                    <span>KIDS BOOKS</span>
                </div>

                <div class="ad-product__title" @click.prevent="$router.push({name:'shop-slug' , params: {slug : 'Lift-the-Flap-Atlas'}})">
                    <h3>LIFT</h3>
                    <span> THE FLAP ATLAS</span>
                </div>
                <div class="ad-product__price">
                    <del>EGP250</del>
                    <span>EGP175</span>
                </div>
            </div>  
           <div class="product__img ad-product__img" @click.prevent="$router.push({name:'shop-slug' , params: {slug : 'Lift-the-Flap-Atlas'}})">
               <figure>
                    <img src="https://images-na.ssl-images-amazon.com/images/I/615ifpDLGNL._SX389_BO1,204,203,200_.jpg" alt="">
               </figure>
           </div>  
       </div>
   </div>
</template>

 <style  scoped src="@/assets/scss/partials/sidebar-ad-product.css"></style>
