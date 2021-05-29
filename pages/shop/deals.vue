<template>
  <div class="app">
    <div class="container no-padding">
      <div class="page-header-img">
            <h1>DEALS</h1>
      </div>
    </div>
    <div class="app__wrapper">
      <div class="container">
          <div class="products">
            <div class="products__top border-b py-4 flex justify-between items-center">
              <div class="icons flex">
                <!-- <div class="icon-1 mr-4">1</div>
                <div class="icon-2">2</div> -->
              </div>
              <div class="controllers flex">
              </div>
            </div>
            <div class="products__wrapper">
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
            </div>

            <div class="view__all">
              <v-pagination
                v-model="page"
                :length="30"
                :total-visible="10"
              ></v-pagination>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
import Product from "@/components/partials/Product.vue"

export default {
  components:{
    Product,
  },
  data () {
    return {
      page:1,
      model: null,
      items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ],
    }
}
}
</script>


 <style  scoped src="@/assets/scss/home/main.css"></style>
 
