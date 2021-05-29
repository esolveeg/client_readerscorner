<template>
    <div class="os__parent">
        <v-carousel
            :hide-delimiters="true"
            :show-arrows="false"
            v-model="currentSLide"
            :vertical="true"
        >
            <v-carousel-item :class="`slider-item slider-item-${i}`" :height="350" v-for="i in 3" :key="i">
                <div class="os__slider">
                        <div class="image">
                        <div class="os__wrapper">
                            <div class="percent-off">
                                <span>30% off</span>
                            </div>
                            <div class="content">
                                <h3 class="tag">
                                    limited deals
                                </h3>
                                <div class="counter">
                                    <div class="hours">
                                        <span>12</span>
                                        <span>hours</span>
                                    </div>
                                    <div class="minutes">
                                        <span>36</span>
                                        <span>minutes</span>
                                    </div>
                                    <div class="seconds">
                                        <span>59</span>
                                        <span>seconds</span>
                                    </div>
                                </div>
                                    <h3 class="title">
                                    
                                </h3>
                                <div class="price">
                                    <del>EGP100</del>
                                    <span>EGP70</span>
                                </div>
                                <div class="show_more">
                                    <a href="">Show More Details</a>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </v-carousel-item>
        </v-carousel>
        <div class="os__indicators" >
            <span v-for="i in 3"  :key="i" @click="currentSLide = i - 1" :class="{active : currentSLide == i - 1}" ></span>
        </div> 
    </div>
</template>
<script>
export default {
  data(){
    return{
      currentSLide: 0,
    }
  }
}
</script>

 <style  scoped src="@/assets/scss/home/offer_slider.css"></style>
