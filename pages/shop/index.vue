<template>
  <div class="app">
    <div class="page-header">
        <div class="explore">
          <h1>explore our products</h1>
        </div>
        <div class="count">
          <span>showing  {{products.total}} proucts</span>
        </div>
    </div>
    <div class="app__wrapper">
      <div class="container">
        <div class="home__grid">
          <div class="sidebar">
            <ProductsSidebar/>
          </div>
          <div class="products">
            <div class="products__top border-b py-4 flex justify-between items-center">
              <div class="icons flex">
                <!-- <div class="icon-1 mr-4">1</div>
                <div class="icon-2">2</div> -->
                <v-chip
                  class="ma-2"
                  color="gray"
                  label
                  text-color="black"
                  v-for="(q,index) in Object.keys($route.query)"
                  :key="index"
                  @click="clearFilter(q)"
                >
                  {{q}} : {{$route.query[q]}}
                  <v-icon>mdi-close</v-icon>
                </v-chip>
              </div>
              <div class="controllers flex">
              </div>
            </div>
              <div class="subcategories" v-if="!subCatLoading && !subCats.length == 0 && !noSubCats && !subAges">
              <v-sheet
                class="mx-auto"
              >
                <v-slide-group
                  multiple
                  show-arrows
                >
                  <v-slide-item
                    v-for="cat in subCats"
                    :key="cat.id"
                  >
                    <v-btn
                      class="mx-2 sub-cat"
                      :class="{active : $route.query.category == cat.slug}"
                      active-class="active bg-primary white--text"
                      depressed
                      @click="subcatFilter(cat.slug)"
                    >
                      {{cat.title}}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </div>
              <div class="subcategories" v-else-if="!agesLoading && !ages.length == 0 && subAges">
              <v-sheet
                class="mx-auto"
              >
                <v-slide-group
                  multiple
                  show-arrows
                  
                >
                  <v-slide-item
                    v-for="age in ages"
                    :key="age.id"
                  >
                    <v-btn
                      class="mx-2 sub-cat"
                      :class="{active : $route.query.category == age.slug}"
                      active-class="active bg-primary white--text"
                      depressed
                      @click="ageFilter(age.slug)"
                    >
                      {{age.title}}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </div>
            <div class="products__wrapper" v-if="loading">
              <v-skeleton-loader
                  v-for="i in 12"
                  :key="i"
                  class="mx-auto w-full"
                  max-width="300"
                  :loading="loading"
                  type="card"
                ></v-skeleton-loader>
            </div>
            <div class="products__wrapper" v-else-if="products.total > 0">
              <Product  v-for="product in products.data" :key="product.id" :product="product"/>
            </div>
            <no-data class="products" v-else/>

            <div class="view__all">
              <v-pagination
                v-model="page"
                :length="products.last_page"
                @input="paginate"
                :total-visible="10"
              ></v-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Product from "@/components/partials/Product.vue"
import ProductsSidebar from "@/components/layouts/ProductsSidebar.vue"
import { mapGetters } from 'vuex';
import NoData from '../../components/partials/NoData.vue';
export default {
  watchQuery(newQuery) {
    this.getProducts(newQuery)
  },
  components:{
    Product,
    ProductsSidebar,
    NoData
  },
  methods:{
    clearFilter(q){
      let query = this.$route.query;
      // dalete query[q]
      delete query[q];
      console.log(query)
      this.addParamsToLocation(query)
    },
    addParamsToLocation(params) {
      this.getProducts(params)
      history.pushState(
        {},
        null,
        this.$route.path +
          '?' +
          Object.keys(params)
            .map(key => {
              return (
                encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
              )
            })
            .join('&')
      )
      window.scrollTo({ top:0, behavior: 'smooth'});

    },
    subcatFilter(slug){
      let query = this.$route.query
      query.subcategory = slug
      delete query.page
      this.addParamsToLocation(query)
      // console.log(query)
      // this.$router.push({ name: "shop", query : query })
    },
    ageFilter(slug){
      let query = this.$route.query
      query.age = slug
      delete query.page
      this.addParamsToLocation(query)
      // console.log(query)
      // this.$router.push({ name: "shop", query : query })
    },
    paginate(page){
      let query = this.$route.query
      query.page = page
      this.addParamsToLocation(query)
    },
    getProducts(query){
      this.$store.dispatch('product/get' , query)
    },
    getSubCategories(parent){
      this.$store.dispatch('product/getSubCategories' , parent)
    }
  },
  computed: {
    ...mapGetters({
        loading: 'product/loading',
        subCatLoading: 'product/loading',
        subCats: 'product/subCategories',
        ages: 'product/ages',
        subAges: 'ui/subAges',
        noSubCats: 'ui/noSubCats',
        agesLoading: 'product/agesLoading',
        products: 'product/products',
    })
  },
  created(){
    this.getProducts(this.$route.query);
    if(this.$route.query.category){
      this.getSubCategories(this.$route.query.category)
    }
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
        options: {
            navButtons: true,
            
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 7,
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                 {
                    breakpoint: 300,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                
               
            ]
        }
    }
  },
}
</script>


 <style  scoped src="@/assets/scss/home/main.css"></style>
 <style  scoped src="@/assets/scss/pages/shop.css"></style>
