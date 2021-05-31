<template>
    <div class="auth">
        <div class="container" >
            <div class="auth__wrapper">
                <div class="login">
                    <login/>
                </div>
                <div class="register">
                    <register/>
                </div>
            </div>
        </div>
        <loading v-if="loading"/>
    </div>
</template>
<script>
import Login from "@/components/auth/Login.vue"
import Loading from "@/components/layouts/Loading.vue"
import Register from "@/components/auth/Register.vue"
export default {
    data:() =>({
        loading : false,
    }),
    middleware: 'guest',
    components:{
        Login,
        Register,
        Loading
    }
}
</script>
 <style  scoped src="@/assets/scss/pages/auth.css"></style>
