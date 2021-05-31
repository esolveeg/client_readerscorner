<template>
    <div class="sidebar__categories mb-8">
        <div class="header-2">
            <h2>SHOP BY AGE</h2>
        </div>
        <ul class="categories" v-if="!loading">
            <li v-for="age in ages" :key="age.id"  :class="{active : $route.query.age == age.slug}" @click.prevent="filter(age.slug)">
                <a href="">{{age.title}}</a>
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
          ages: 'product/ages',
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
            query.age = slug
            delete query.page
            this.$store.commit('ui/setAppDrawer' , false)
            this.addParamsToLocation(query)
        },
        getAges(){
            this.$store.dispatch('product/getAges')
        }
    },
    created(){
        this.getAges();
    }
}
</script>
 <style  scoped src="@/assets/scss/partials/sidebar-categories.css"></style>
