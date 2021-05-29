<template>
    <div class="history">
        <div class="add_new" @click.prevent="insert">
            <v-icon>mdi-plus</v-icon>
        </div>
        <div class="no-data text-center" v-if="typeof addresses == 'array' && addresses.length == 0">
            <h2>you don't have any addresses yet</h2>
            <a href="#" class="btn" @click.prevent="insert">Add New Address</a>
        </div>
        <div class="history__details" v-else v-for="address in addresses" :key="address.id" :class="{active : active == address.id}">
            <div class="flex justify-between items-center mobile-column">
                <div>
                    <h1 class="text--2 address-title">title: {{address.title}}</h1>
                    <h1 class="text--2">city: {{address.city}}</h1>
                </div>
                <div  class="btn-more" @click.prevent="active = address.id">
                    <button class="btn color-white history__more--box__button">more details</button>
                </div>
            </div>
            
            <div class="content">
                <ul>
                    <li class="text--1">building: {{address.building}}</li>
                    <li class="text--1">street: {{address.street}}</li>
                    <li class="text--1" v-if="address.floor">floor: {{address.floor}}</li>
                    <li class="text--1" v-if="address.apartment">apartment: {{address.apartment}}</li>
                    <li class="text--1">phone:11 {{address.phone}}</li>
                </ul>
            </div>
            <div class="history__details--button">
                <a href="#" @click.prevent="remove('your address' , address.id)" class="btn btn--red ">remove</a>
                <a href="#" @click.prevent="edit(address.id)" class="btn btn--blue">edit</a>
            </div>
        </div>
        <edit-address />
        <add-address @created="created"/>
    </div>
</template>
<script>
import EditAddress from "@/components/modals/EditAddress.vue"
import AddAddress from "@/components/modals/AddAddress.vue"
import { mapGetters , mapMutations} from 'vuex';
export default {
    data: ()=>({
        active: null,
    }),
    components:{
        EditAddress,
        AddAddress
    },
    computed: {
      ...mapGetters({
          loading: 'address/loading',
          addresses: 'address/addresses',
          deleted: 'global/deleted'
      })
    },
    
    methods:{
        get(){
            if(!this.loading){
            this.$store.dispatch('address/get')
            .then(()=>{
                console.log(this.addresses.length);
            })
            }
        },
        ...mapMutations({
            deleteModal: 'ui/toggleDeleteModal' // map `this.add()` to `this.$store.commit('increment')`
        }),
        remove(display , value){
            this.$store.commit('ui/setDeleteModal' , {active : true , name : display , id : value , model : 'addresses'})
        },
        edit(id){
            this.$store.dispatch('address/find' , id)
            this.$store.commit('ui/setEditAddress' , {active : true , id : id})
        },
        created(){
            this.$store.dispatch('address/get')
        },
        insert(){
            this.$store.commit('ui/setAddAddress' , {active : true})
            // this.$router.push({name : 'profile-create-address'})
        }
    },
    watch:{
         deleted: function (val){
            if(val == true){
                this.$store.dispatch('address/get')
                .then(()=>{
                    this.$store.commit('global/setDeleted' , false)
                })
            }
         },
    },
    created(){
        this.get()
    }
}
</script>
 <style  scoped src="@/assets/scss/components/profile/order-history.css"></style>
