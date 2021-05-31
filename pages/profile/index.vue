<template>
    <div class="container profile">
        <h1 class="profile__main--heading">hello!</h1>
        <h1 class="profile__main--heading">{{$auth.user.name}} </h1>
        <v-tabs v-model="tab" class="profile__box" >
            <v-tab class="btn btn--gray" active-class="active" v-for="(tab , index) in tabs" :key="index">{{tab}}</v-tab>
        </v-tabs>
        <div class="tabs">
            <v-tabs-items v-model="tab">
                <!-- <v-tab-item>
                    <ul>
                        <li class=" mb-4">
                            <span class="black-text uppercase">Name:{{$auth.user.name}}</span>
                        </li>
                        <li class=" mb-4">
                            <span class="black-text uppercase">Email:{{$auth.user.email}}</span>
                        </li>
                        <li class=" mb-4">
                            <span class="black-text uppercase">Phone:{{$auth.user.phone}}</span>
                        </li>
                    </ul>
                </v-tab-item> -->
                <v-tab-item>
                    <order-history v-if="!loading" :orders="orders"  />
                    <v-progress-circular v-else :value="60"></v-progress-circular>
                </v-tab-item>
                <v-tab-item>
                    <shipping-address />
                </v-tab-item>
                <!-- <v-tab-item>
                   <wishlist />
                </v-tab-item> -->
            </v-tabs-items>
        </div>
        <div class="hidden">
            <order-history v-if="!loading" :orders="orders"  />
        </div>
    </div>
</template>
<script>
import OrderHistory from "@/components/profile/OrderHistory.vue"
import ShippingAddress from "@/components/profile/ShippingAddress.vue"
// import Wishlist from "@/components/profile/Wishlist.vue"
import { mapGetters } from 'vuex';
// import { preFetch } from "@/utils/preFetchUser.js"
export default {
    middleware: 'auth',
    watchQuery: true,
    data(){
        return {
            // TODO::add wishlist to the array
            // TODO::add account details to the array
            tabs : ['ORDERS' , 'ADDRESSES' ]
        }
    },
    methods:{
        getOrders(){
            this.$store.dispatch('myAuth/getOrders')
        }
    },
    // fetch: preFetch,
    computed: {
        ...mapGetters({
          loading: 'myAuth/ordersLoading',
          orders: 'myAuth/orders'
        }),
        tab: {
            set(val) {
                const query = val !== null ? {tab :val} : {}
                // this.$route.query = {...this.$route.query, page: `${to.query}`};
                this.$router.push({name : 'profile' , query})
            },
            get() {
                return (this.$route.query.tab || 0);
            }
        }
    },
    created(){
        this.getOrders()
    },
    components:{
        OrderHistory,
        ShippingAddress,
        // Wishlist
    }
}
</script>
    

 <style  scoped src="@/assets/scss/pages/profile.css"></style>
