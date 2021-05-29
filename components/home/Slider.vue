<template>
     <div class="app__slider"  id="ThemesSlideshow">
          <v-carousel
            :hide-delimiters="true"
            :show-arrows="false"
            v-model="currentSLide"
          >
            <v-carousel-item class="slider" :style="{backgroundColor : '#ba9fd6' }">
              <div class="container h-full  relative">
                <div class="h-full">
                      <div class="slider__wrapper h-full ">
                        <div class="slider__content">
                          <div class="tag">BOOKS</div>
                          <div class="header">LOVE OF</div>
                          <div class="sub-header">STORY</div>
                          <div class="slider-btn" @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'First-Encyclopedia-of-Seas-and-Oceans'}})">
                            <a href="">SHOP NOW</a>
                          </div>
                        </div>
                        <div class="slider__img">
                          <figure @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'First-Encyclopedia-of-Seas-and-Oceans'}})">
                              <img src="https://www.theschoolrun.com/sites/theschoolrun.com/files/u9/first_encyclopaedia_of_seas_and_oceans.jpg" alt="">
                          </figure>
                        </div>
                      </div>
                </div>
              </div>
            </v-carousel-item>
            <v-carousel-item class="slider" :style="{backgroundColor : '#947fab' }">
              <div class="container h-full  relative">
                <div class="h-full">
                      <div class="slider__wrapper h-full ">
                        <div class="slider__content">
                          <div class="tag">BOOKS</div>
                          <div class="header">LOVE OF</div>
                          <div class="sub-header">STORY</div>
                          <div class="slider-btn" @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'قواعد-العشق-الأربعون'}})">
                            <a href="">SHOP NOW</a>
                          </div>
                        </div>
                        <div class="slider__img">
                          <figure @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'قواعد-العشق-الأربعون'}})">
                              <img src="https://cdn.jamalon.com/c/p/3087504.jpg" alt="قواعد العشق الاربعون">
                          </figure>
                        </div>
                      </div>
                </div>
              </div>
            </v-carousel-item>
            <v-carousel-item class="slider" :style="{backgroundColor : '#6f5f80'}">
              <div class="container h-full  relative">
                <div class="h-full">
                      <div class="slider__wrapper h-full ">
                        <div class="slider__content">
                          <div class="tag">BOOKS</div>
                          <div class="header">LOVE OF</div>
                          <div class="sub-header">STORY</div>
                          <div class="slider-btn" @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'علامات-الحب-السبعة'}})">
                            <a href="">SHOP NOW</a>
                          </div>
                        </div>
                        <div class="slider__img">
                          <figure @click.prevent="$router.push({name : 'shop-slug' , params : {slug : 'علامات-الحب-السبعة'}})">
                              <img src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1452893056l/28575817._SY475_.jpg">
                          </figure>
                        </div>
                      </div>
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
          <div class="container relative controllers__wrapper">
            <div class="slider__controllers">
              <div class="prev" @click="currentSLide--"><v-icon >mdi-arrow-left</v-icon></div>
              <div class="next" @click="currentSLide++"><v-icon>mdi-arrow-right</v-icon></div>
            </div>
            <!-- <div class="slider__indicators">
              <span :class="{active : i == currentSLide + 1}"  v-for="i in 3" @click="currentSLide = i - 1" :light="true" :key="i"></span>
            </div>  -->
          </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      currentSLide:0
    }
  }
}
</script>

 <style  scoped src="@/assets/scss/home/slider.css"></style>
