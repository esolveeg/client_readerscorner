<template>
    <div class="billing">
        <div class="billing__form">
            <div class="header">
                <h2>Buyer Info</h2>
            </div>
            <v-form ref="form">
                <div class="addresses" v-if="!loading">
                    <div v-if="!addressFormVisible" class="add_new text-primary text-right pointer" @click.prevent="insert">
                        <h4>None of these addresses?<v-icon class="text-primary">mdi-plus</v-icon></h4>
                    </div>
                    <v-select
                    :items="addresses"
                    item-text="title"
                    item-value="id"
                    v-model="form.address_id"
                    :rules="rules.address"
                    @input="applyShipping"
                    label="Select Address"
                    v-if="!addressFormVisible"
                    ></v-select>
                    <div v-else>
                        <v-text-field
                            class="mb-8"
                            label="Building"
                            v-model="addressForm.building"
                            :rules="addressRules.building"
                            hide-details="auto">
                        </v-text-field>
                        <v-text-field
                            class="mb-8"
                            label="Street"
                            v-model="addressForm.street"
                            :rules="addressRules.street"
                            hide-details="auto">
                        </v-text-field>
                        <v-text-field
                            class="mb-8"
                        label="State"
                        v-model="addressForm.state"
                        :rules="addressRules.state"
                        hide-details="auto">
                        </v-text-field>
                        <v-text-field
                            class="mb-8"
                            label="Floor"
                            v-model="addressForm.floor"
                            :rules="addressRules.floor"
                            hide-details="auto">
                        </v-text-field>
                        <v-text-field
                            class="mb-8"
                            label="Phone"
                            v-model="addressForm.phone"
                            :rules="addressRules.phone"
                            hide-details="auto">
                        </v-text-field>
                        <v-text-field
                            class="mb-8"
                            label="Apartment"
                            v-model="addressForm.apartment"
                            :rules="addressRules.apartment"
                            hide-details="auto">
                        </v-text-field>
                        <v-select
                        :items="cities"
                        item-text="name"
                        item-value="id"
                        :loading="citiesLoading"
                        v-model="addressForm.city_id"
                        :rules="addressRules.city"
                        @input="applyShipping"
                        class="mb-4"
                        label="City"
                        ></v-select>
                    </div>
                </div>
                <v-skeleton-loader
                v-else
                    class="mx-auto w-full"
                    max-width="300"
                    :loading="loading"
                    type="list-item"
                ></v-skeleton-loader>
                 <div class="billing__payment">
                    <!-- <div class="header">
                        <h2>Payment Method</h2>
                    </div> -->
                    <div class="tabs">
                        <div class="tab" @click.prevent="handleGateway('card')" :class="{active : form.gateway =='card'}"><svg id="Layer_1" enable-background="new 0 0 480 480" height="512" viewBox="0 0 480 480" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m480 103v274c0 22.056-17.944 40-40 40h-400c-22.056 0-40-17.944-40-40v-120c0-4.418 3.582-8 8-8s8 3.582 8 8v120c0 13.233 10.767 24 24 24h400c13.233 0 24-10.767 24-24v-274c0-13.233-10.767-24-24-24h-400c-13.233 0-24 10.767-24 24v32h410c4.418 0 8 3.582 8 8s-3.582 8-8 8h-410v52h410c4.418 0 8 3.582 8 8s-3.582 8-8 8h-418c-4.418 0-8-3.582-8-8v-108c0-22.056 17.944-40 40-40h400c22.056 0 40 17.944 40 40zm-64 208c0-20.537-22.83-32.992-40.125-21.817 16.971 27.8-3.117 63.817-35.875 63.817-23.159 0-42-18.841-42-42 0-34.467 39.438-54.21 67-33.726 27.685-20.479 67-.677 67 33.726 0 23.159-18.841 42-42 42-4.418 0-8-3.582-8-8s3.582-8 8-8c14.337 0 26-11.663 26-26zm-50 0c0-14.337-11.663-26-26-26s-26 11.663-26 26 11.663 26 26 26 26-11.663 26-26zm-293-17h67c4.418 0 8-3.582 8-8s-3.582-8-8-8h-67c-4.418 0-8 3.582-8 8s3.582 8 8 8zm0 50h67c4.418 0 8-3.582 8-8s-3.582-8-8-8h-67c-4.418 0-8 3.582-8 8s3.582 8 8 8z"/></svg> Credit Card</div>
                        <div class="tab" @click.prevent="handleGateway('cod')" :class="{active : form.gateway =='cod'}"><svg viewBox="0 0 511 511.99978" xmlns="http://www.w3.org/2000/svg"><path d="m235.792969 347.265625c3.902343-3.910156 3.902343-10.238281 0-14.148437-3.90625-3.898438-10.234375-3.898438-14.144531 0-3.898438 3.910156-3.898438 10.238281 0 14.148437 3.910156 3.898437 10.238281 3.898437 14.144531 0zm0 0"/><path d="m188.449219 109.96875c0 60.636719 49.332031 109.972656 109.96875 109.972656s109.96875-49.335937 109.96875-109.972656-49.332031-109.96875-109.96875-109.96875-109.96875 49.332031-109.96875 109.96875zm199.945312 0c0 49.613281-40.363281 89.976562-89.976562 89.976562s-89.976563-40.363281-89.976563-89.976562c0-49.609375 40.363282-89.972656 89.976563-89.972656s89.976562 40.363281 89.976562 89.972656zm0 0"/><path d="m115.652344 509.042969c3.875 3.90625 10.183594 3.949219 14.109375.082031l48.46875-47.75c8.234375-8.234375 10.738281-20.425781 7.117187-31.023438l10.425782-10.054687c5.613281-5.421875 13.003906-8.410156 20.816406-8.410156h132.902344c23.578124 0 45.863281-9.054688 62.757812-25.496094.695312-.675781-5.277344 6.359375 90.667969-108.3125 14.230469-16.835937 12.101562-42.117187-4.75-56.363281-16.746094-14.113282-41.832031-12.085938-56.101563 4.460937l-58.992187 60.632813c-7.449219-9.167969-18.808594-14.882813-31.082031-14.882813h-111.480469c-15.863281-6.636719-32.695313-9.996093-50.0625-9.996093-48.140625 0-90.175781 22.234374-112.734375 63.921874-9.503906-1.800781-19.527344 1.074219-26.738282 8.285157l-47.558593 47.699219c-3.882813 3.894531-3.890625 10.195312-.015625 14.101562zm74.792968-227.121094c15.3125 0 30.117188 3.082031 44.011719 9.160156 1.265625.554688 2.628907.839844 4.007813.839844h113.527344c10.839843 0 19.996093 8.839844 19.996093 19.992187 0 11.027344-8.96875 19.996094-19.996093 19.996094h-81.566407c-5.519531 0-9.996093 4.476563-9.996093 9.996094 0 5.523438 4.476562 9.996094 9.996093 9.996094h81.566407c22.050781 0 39.988281-17.9375 39.988281-39.988282 0-1.757812-.125-3.5-.351563-5.226562 57.066406-58.660156 65.113282-66.902344 65.457032-67.3125 7.125-8.410156 19.773437-9.476562 28.1875-2.382812 8.421874 7.121093 9.488281 19.761718 2.34375 28.21875l-89.667969 107.195312c-13.09375 12.570312-30.285157 19.488281-48.457031 19.488281h-132.902344c-13.023438 0-25.351563 4.980469-34.703125 14.015625l-8.496094 8.199219-78.320313-78.316406c18.304688-34.339844 52.652344-53.871094 95.375-53.871094zm-125.320312 66.34375c3.296875-3.296875 8.359375-3.890625 12.378906-1.40625 1.730469 1.054687-3.238281-3.46875 86.589844 86.234375 3.996094 3.996094 3.78125 10.363281.054688 14.089844l-41.320313 40.707031-98.230469-98.980469zm0 0"/><path d="m286.421875 49.988281v11.714844c-11.636719 4.125-19.996094 15.238281-19.996094 28.273437 0 16.535157 13.453125 29.992188 29.992188 29.992188 5.511719 0 9.996093 4.484375 9.996093 9.996094 0 5.511718-4.484374 9.996094-9.996093 9.996094-4.269531 0-8.882813-2.683594-12.980469-7.5625-3.554688-4.226563-9.859375-4.769532-14.085938-1.21875-4.226562 3.554687-4.773437 9.859374-1.21875 14.085937 5.34375 6.355469 11.628907 10.785156 18.289063 13.019531v11.667969c0 5.523437 4.476563 9.996094 9.996094 9.996094s9.996093-4.472657 9.996093-9.996094v-11.714844c11.636719-4.128906 19.996094-15.242187 19.996094-28.273437 0-16.539063-13.453125-29.992188-29.992187-29.992188-5.511719 0-9.996094-4.484375-9.996094-9.996094 0-5.511718 4.484375-10 9.996094-10 3.542969 0 7.28125 1.808594 10.8125 5.226563 3.96875 3.839844 10.296875 3.734375 14.136719-.230469 3.839843-3.96875 3.734374-10.296875-.230469-14.136718-5.074219-4.910157-10.152344-7.6875-14.722657-9.203126v-11.644531c0-5.523437-4.476562-10-9.996093-10s-9.996094 4.476563-9.996094 10zm0 0"/></svg>Cash On Delivery</div>
                    </div>
                </div>
                <div class="iframe" v-if="iframe">
                    <iframe :src="iframe" frameborder="0"></iframe>
                </div>
                <v-btn v-if="iframe == null" :loading="btnLoading" class="billing__submit btn" @click.prevent="checkout()">
                    checkout
                </v-btn>
            </v-form>
        </div>
        <div class="billing__payment">
            <div class="header">
                <h2>Cart Summary</h2>
            </div>
            <cart-summary/>
        </div>
        <add-address @created="addressCreated"/>
    </div>
</template>
<script>
import CartSummary from "@/components/partials/CartSummary.vue"
import AddAddress from "@/components/modals/AddAddress.vue"
import { mapGetters } from 'vuex';
  export default {
      computed: {
      ...mapGetters({
          loading: 'address/loading',
          iframe:'shop/iframe',
          cities: 'address/cities',
          citiesLoading :'address/citiesLoading',
          addresses: 'address/addresses',
      })
    },
    components:{
        CartSummary,
        AddAddress
    },
    methods:{
        insert(){
            this.$store.commit('ui/setAddAddress' , {active : true})
        },
        handleGateway(gateway){
            if(gateway == 'card'){
                if(this.form.address_id == null){
                    const snackbar = {
                        active : true,
                        text: 'Please Choose Your Address'
                    }
                    this.$store.commit('ui/setSnackbar' , snackbar)
                    return
                }
            }
            this.btnLoading = true
            this.form.gateway = gateway
            
            this.$store.dispatch('shop/applyGateway' , {gateway})
            .then(() => {
                this.btnLoading = false
            })
        },
        addressCreated(id){
            this.getAdresses()
            this.form.address_id = id
        },
        getAdresses(){
            this.btnLoading = true
            this.$store.dispatch('address/get')
            .then(res => {
                this.btnLoading = false
                if (res.length == 0) {
                    this.addressFormVisible = true
                } else {
                    this.addressFormVisible = false
                }
            })
        },
        getCities(){
            this.btnLoading = true
            this.$store.dispatch('address/getCities')
            .then(() => {
                this.btnLoading = false
            })
        },
        checkout(){
            if(this.addressFormVisible){
                this.$refs.form.validate()
                this.$store.dispatch('address/get' , this.addressForm)
                .then(res => {
                    this.form.address_id = res.id
                    this.checkoutAction()
                })
            } else {
                if(this.form.address_id == null){
                    const snackbar = {
                        active : true,
                        text: 'Please Choose Your Address'
                    }
                    this.$store.commit('ui/setSnackbar' , snackbar)
                    return
                }
                if(this.form.gateway == null){
                    const snackbar = {
                        active : true,
                        text: 'Please Choose Your Payment Method'
                    }
                    this.$store.commit('ui/setSnackbar' , snackbar)
                    return
                }
            }
            this.checkoutAction()
        },
        applyShipping(){
            this.btnLoading = true
            let payload
            if(this.addressFormVisible){
                payload  = {
                    city_id : this.addressForm.city_id
                }
            }else {
                payload  = {
                    address_id : this.form.address_id
                }
            }
            this.$store.dispatch('shop/applyShipping' , payload)
            .then(() => {
                this.btnLoading = false
            })
        },
        checkoutAction(){
            this.btnLoading = true
            this.$store.dispatch('shop/checkout' , this.form)
            .then((res) => {
                this.btnLoading = false
                if(res.url){
                    window.open(res.url);
                }else {
                    this.$emit('success')
                }
            })
        },

        init(){
            this.getAdresses()
            this.getCities()
            this.$store.dispatch('shop/get')
            .then(res => {
                this.form.address_id = res.address_id
            })
        }
    },
    created(){
        this.init()
    },
    data: () => ({
        addressFormVisible: false,
        valid : false,
        btnLoading :false,
        addressValid : false,
        addressRules : {
            building: [
            v => !!v || 'Building is required',
            ],
            title: [
            v => !!v || 'Title is required',
            ],
            street: [
            v => !!v || 'Street is required',
            ],
            state: [
            v => !!v || 'State is required',
            ],
            floor: [],
            phone: [],
            apartment: [],
            city: [
                v => !!v || 'City is required',
                v => !isNaN(v) || 'City Must Be Numeric',
            ],
        },
        addressForm:{
            building : '',
            street : '',
            type:'insert',
            state : '',
            floor : '',
            phone : '',
            apartment : '',
            city_id : null,
        },
        form : {
            address_id : null,
            gateway: null,
        },
        rules: {
            address : [  value => !!value || 'Required.',]
        },
    }),
  }
</script>
 <style  scoped src="@/assets/scss/partials/cart-billing.css"></style>
