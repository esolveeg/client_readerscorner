<template>
    <div class="sidebar__categories mb-8">
        <div class="header-2">
            <h2>SHOP BY CATEGORY</h2>
        </div>
        <ul class="categories" v-if="!loading">
            <li  @click.prevent="filter(cat.slug)" v-for="cat in categories" :key="cat.id" :class="{active : active === cat.slug}">
                <a href="">{{cat.title}}</a>
            </li>
        </ul>
         <ul class="categories" v-else>
            <v-skeleton-loader
                v-for="i in 8"
                :key="i"
                class="mx-auto w-full"
                max-width="300"
                :loading="loading"
                type="list-item"
            ></v-skeleton-loader>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            active : null
        }
    },
    computed: {
      ...mapGetters({
          loading: 'product/categoriesLoading',
          categories: 'product/categories',
      })
    },
    methods:{
        addParamsToLocation(params) {
            this.$store.dispatch('product/get' , params)
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
        filter(slug){
             if(this.$route.name == 'shop'){
                 let query = this.$route.query
                 delete query.subcategory
                 delete query.page

                 query.category = slug
                 this.$store.commit('ui/setAppDrawer' , false)
                 this.addParamsToLocation(query)
             } else {
                 this.$router.push({name : 'shop' , query : {category : slug}})
             }
             this.active = slug
        },
        getCategories(){
            this.$store.dispatch('product/getCategories')
        }
    },
    created(){
        this.getCategories();
    }
}
</script>

 <style  scoped src="@/assets/scss/partials/sidebar-categories.css"></style>
