<template>
    <div class="sidebar__categories mb-8">
        <div class="header-2">
            <h2>SHOP BY Author</h2>
        </div>
        <ul class="categories" v-if="!loading">
            <li v-for="author in authors" :key="author.id"  :class="{active : $route.query.author == author.author_slug}" @click.prevent="filter(author.author_slug)">
                <a href="">{{author.name}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
      ...mapGetters({
          loading: 'product/authorsLoading',
          authors: 'product/authors',
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
            let query = this.$route.query
            query.author = slug
            delete query.page
            this.$store.commit('ui/setAppDrawer' , false)
            this.addParamsToLocation(query)
        },
        getAuthors(){
            this.$store.dispatch('product/getAuthors')
        }
    },
    created(){
        this.getAuthors();
    }
}
</script>
 <style  scoped src="@/assets/scss/partials/sidebar-categories.css"></style>
