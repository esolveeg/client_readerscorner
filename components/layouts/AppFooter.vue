<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__wrapper">
                <div class="contacts">
                    <h3 class="footer__header">Need Help?</h3>
                    <ul>
                        <li>
                            <span>Call us on</span>
                            <span class="black-font">01125115718</span>
                        </li>
                        <li>
                            <span>or email us at</span>
                            <a href="mailto:info@readerscorner.co" target="_blank" class="black-font">info@readerscorner.co</a>
                        </li>
                    </ul>
                </div>
                <div class="links">
                    <h3 class="footer__header">Product Links</h3>
                    <div class="links_wrapper">
                        <sidebar-categories />
                    </div>
                    
                </div>
                <div class="account">
                    <h3 class="footer__header">Customers Account</h3>
                    <ul>
                        <nuxt-link tag="li" :to="{name : 'login' , query : {tab: 'login'} }" v-if="!$auth.loggedIn">Sign in</nuxt-link>
                        <nuxt-link tag="li" :to="{name : 'login' , query:{tab:'register'} }" v-if="!$auth.loggedIn">Create New Account</nuxt-link>
                        <nuxt-link tag="li" :to="{name : 'profile' }" v-if="$auth.loggedIn">Orders</nuxt-link>
                        <nuxt-link tag="li" :to="{name : 'profile', query : {tab : '1'} }" v-if="$auth.loggedIn">addresses</nuxt-link>
                        <a class="pointer" @click.prevent="goToCart">My Shopping Cart</a>
                    </ul>
                </div>
                <!-- <div class="about">
                    <h3 class="footer__header">About Us</h3>
                    <ul>
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Advertise With Us</li>
                        <li>Policies</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div> -->
            </div>
            <hr class="pb-50">
            <hr class="pb-0">
            <div class="copyrights">
                <span>&copy; All Copyrights Reserved To <a href="http://esolve-eg.com">ESOLVE</a></span>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    methods:{
        goToCart(){
            // this.$router.push({name : 'shop-cart'})
            if(this.$auth.loggedIn){
                this.$router.push({name : 'shop-cart'})

            } else {
                const snackbar = {
                active : true,
                text: 'please login to continue'
                }
                  this.$store.commit('ui/setLoginRequired' , true)
                  this.$store.commit('ui/setSnackbar' , snackbar)
                    this.$router.push({name : 'login' , query : {tab : 'login'}})

            }
        }
    }
}
</script>

<style  scoped src="@/assets/scss/layouts/footer.css"></style>
