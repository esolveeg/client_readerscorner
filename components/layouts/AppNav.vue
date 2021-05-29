<template>
    <div class="navbar">
        <div class="container">
            <div class="nav-wrapper">
                <div class="left-wrapper">
                    <div class="logo pointer"  @click.prevent="$router.push('/')">
                        <img src="~@/assets/images/logo.png" alt="">
                    </div>
                    <nav class="list" :class="{active : appDrawer}">
                        <div class="hidden close-icon" @click.prevent="toggleNav(false)">
                            &times;
                        </div>
                         <div class="flex mb-8 hidden rounded-2xl mobile-search items-center justify-center bg-gray-800">
                            <form method="GET">
                                <div class="relative text-gray-600 focus-within:text-gray-400">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
                                    </button>
                                </span>
                                <input type="search" name="q" class="py-2  rounded-2xl text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off">
                                </div>
                            </form>
                        </div>
                        <ul>
                            <nuxt-link tag="li" :to="{name : 'index'}" class="nav-item" :class="{activenav : $route.name == 'index'}">Home</nuxt-link>
                            <nuxt-link tag="li" :to="{name : 'shop'}" class="nav-item" :class="{activenav : $route.name == 'shop' && typeof $route.query.category === 'undefined' && typeof $route.query.key === 'undefined'}">Books</nuxt-link>
                            <nuxt-link tag="li" :to="{name : 'shop' ,query :{category : 'nonfiction'} }" class="nav-item"  :class="{activenav : $route.name == 'shop' && $route.query.category === 'nonfiction'}">Nonfiction</nuxt-link>
                            <nuxt-link tag="li" :to="{name : 'shop' , query :{key : 'deals'}}" class="nav-item" :class="{activenav : $route.name == 'shop' &&  $route.query.key === 'deals'}">Deals</nuxt-link>
                            <nuxt-link tag="li" :to="{name : 'shop' , query:{category : 'kids'}}" class="nav-item" :class="{activenav : $route.name == 'shop' && $route.query.category === 'kids'}">Kids</nuxt-link>
                            <!-- <nuxt-link tag="li" :to="{name : 'about'}" class="nav-item">About</nuxt-link> -->
                            <!-- <nuxt-link tag="li" :to="{name : 'contact'}" class="nav-item">Contact</nuxt-link> -->
                            <nav-filters class="nav-filters"/>
                        </ul>
                    </nav>
                </div>
                <div class="icons">
                    <div class="flex rounded-2xl search items-center justify-center bg-gray-800">
                        <form method="GET">
                            <div class="relative text-gray-600 focus-within:text-gray-400">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <button type="submit" class="p-1 focus:outline-none focus:shadow-outline">
                                    <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><path d="M505.749 475.587l-145.6-145.6c28.203-34.837 45.184-79.104 45.184-127.317C405.333 90.926 314.41.003 202.666.003S0 90.925 0 202.669s90.923 202.667 202.667 202.667c48.213 0 92.48-16.981 127.317-45.184l145.6 145.6c4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251c8.341-8.341 8.341-21.824-.001-30.165zM202.667 362.669c-88.235 0-160-71.765-160-160s71.765-160 160-160 160 71.765 160 160-71.766 160-160 160z"/></svg>
                                </button>
                            </span>
                            <auto-complete/>
                            </div>
                        </form>
                    </div>
                    <div class="cart cursor-pointer">
                        <cart-drop-down></cart-drop-down>   
                        <!-- <v-badge v-if="typeof cart.products !== 'undefined' && cart.products.length > 0" :content="cart.products.length"
                                :value="cart.products.length"
                                right
                                color="primaryColor"
                                overlap>
                        </v-badge>
                            <svg @click.prevent="toggleDCPOpenned()" class="w-8 h-8" id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m372.052 480h-264.104c-23.46 0-41.906-20.152-39.845-43.516l24.353-276c1.835-20.799 18.964-36.484 39.845-36.484h24.699v-41c0-45.767 37.233-83 83-83s83 37.233 83 83v41h24.699c4.418 0 8 3.582 8 8s-3.582 8-8 8h-24.699v36c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-105c-4.418 0-8-3.582-8-8s3.582-8 8-8h105v-41c0-36.944-30.056-67-67-67s-67 30.056-67 67v93c0 4.418-3.582 8-8 8s-8-3.582-8-8v-36h-24.699c-12.528 0-22.806 9.411-23.907 21.891l-24.353 276c-1.241 14.062 9.807 26.109 23.907 26.109h264.104c14.117 0 25.147-12.064 23.907-26.109l-24.353-276c-.388-4.401 2.865-8.284 7.266-8.672 4.399-.385 8.284 2.865 8.672 7.266l24.353 276c2.062 23.369-16.39 43.515-39.845 43.515zm-178.052-69h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8zm0-40h-58c-4.418 0-8 3.582-8 8s3.582 8 8 8h58c4.418 0 8-3.582 8-8s-3.582-8-8-8z"/></svg>
                        <cart-drop-down></cart-drop-down> -->
                    </div>
                    <nuxt-link  v-if="!$auth.loggedIn" :to="{name : 'login' , query :{tab:'login'}}" tag="div" class="person cursor-pointer">
                        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.323 513.323"><path d="M256.661 257.323c-135.275 0-245.333 110.059-245.333 245.333 0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667c0-123.52 100.48-224 224-224s224 100.48 224 224c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667c-.001-135.296-110.06-245.333-245.335-245.333zM256.661 0c-64.683 0-117.333 52.629-117.333 117.333s52.651 117.333 117.333 117.333 117.333-52.629 117.333-117.333S321.344 0 256.661 0zm0 213.333c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96z"/></svg>
                    </nuxt-link>
                        <v-menu v-else offset-y left bottom>
                            <template v-slot:activator="{ attrs, on }">
                                <svg class="w-8 h-8" v-bind="attrs" v-on="on" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.323 513.323"><path d="M256.661 257.323c-135.275 0-245.333 110.059-245.333 245.333 0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667c0-123.52 100.48-224 224-224s224 100.48 224 224c0 5.888 4.779 10.667 10.667 10.667s10.667-4.779 10.667-10.667c-.001-135.296-110.06-245.333-245.335-245.333zM256.661 0c-64.683 0-117.333 52.629-117.333 117.333s52.651 117.333 117.333 117.333 117.333-52.629 117.333-117.333S321.344 0 256.661 0zm0 213.333c-52.928 0-96-43.072-96-96s43.072-96 96-96 96 43.072 96 96-43.072 96-96 96z"/></svg>
                            </template>

                            <v-list>
                                <v-list-item
                                v-for="(item,index) in items"
                                 @click.prevent="goTo(item.to)" 
                                :key="index"
                                link
                                >
                                <div>{{item.text}}</div>
                                </v-list-item>
                                <v-divider/>
                                <v-list-item @click.prevent="logout">logout</v-list-item>
                            </v-list>
                        </v-menu>
                     <div class="menu cursor-pointer hidden ml-2" @click.prevent="toggleNav(true)">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 0 2 L 0 4 L 24 4 L 24 2 Z M 0 11 L 0 13 L 24 13 L 24 11 Z M 0 20 L 0 22 L 24 22 L 24 20 Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters , mapMutations } from 'vuex';
import AutoComplete from "@/components/partials/AutoComplete.vue"
import cartDropDown from "@/components/partials/cartDropDown.vue"
import NavFilters from './NavFilters.vue';
export default {
    computed: {
       ...mapGetters({
            appDrawer: 'ui/appDrawer',
            cart: 'shop/cart',
        })

    },
    watch: {
      $route () {
        this.drawer = this.toggleNav(false)
      },
    },
    data:() => ({
        menu:null,
        cartMenu: true,
        drawer: false,
        group: null,
        items: [
            { text: 'Orders' , to: { name : 'profile' , query : null }},
            { text: 'Addressess' , to: { name : 'profile'  , query : 1}},
            { text: 'Wishlist' , to: { name : 'profile'  , query : 2}},
            { text: 'cart' , to: {name: 'shop-cart' , query : null}},
        ],
    }),
    components:{
        cartDropDown,
        AutoComplete,
        NavFilters
    },
    methods:{
        ...mapMutations({
          toggleNav: 'ui/setAppDrawer',
          toggleDCPOpenned: 'ui/setDCPOpenned',
        }),
        logout() {
            
            this.$auth.logout()
            .then(() => {
                const snackbar = {
                active : true,
                text: 'logged out in successfully'
                }
                this.$store.commit('ui/setSnackbar' , snackbar)
            })
        },
        goTo(to){
            const query = to.query !== null ? {tab :to.query} : {}
            // this.$route.query = {...this.$route.query, page: `${to.query}`};
            this.$router.push({name : to.name , query})
        },
        // search(q){
        //     if(q.length > 3){
        //         this.$store.dispatch('product/search' , q)
        //     }
        // }
    },
    watchQuery : true
}
</script>
 <style  scoped src="@/assets/scss/layouts/nav.css"></style>
 