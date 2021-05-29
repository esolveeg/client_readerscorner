import http from "../repositories/Repository.js";
export const state = () => ({
    loading: false,
    ordersLoading:false,
    orders:[],
    registerLoading: false,
});

export const getters = {
    loading(state){
        return state.loading
    },
    ordersLoading(state){
        return state.ordersLoading
    },
    orders(state){
        return state.orders
    },
    registerLoading(state){
        return state.loading
    }
};


export const mutations = {
   setLoading(state , payload){
       state.loading = payload
   },
   setOrdersLoading(state , payload){
        state.ordersLoading = payload
   },
   setOrders(state , payload){
    state.orders = payload
    },
    setRegisterLoading(state , payload){
        state.registerLoading = payload
    },
};

export const actions = {
    login({commit},payload) {
        commit('setLoading' , true)
        commit('ui/setFormErros' , "" , { root: true })
        payload.auth.loginWith('local', { data: payload.form })
        .then(d => {
            commit('setLoading' , false)
            const snackbar = {
                active : true,
                text: 'logged in successfully'
            }
            commit('ui/setSnackbar' , snackbar , { root: true })
            console.log(d)
        })
        .catch(e => {
            commit('ui/setFormErros' , e.response.data , { root: true })
            commit('setLoading' , false)
        })
    },
    manualLogin({commit},payload) {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
        http
            .post("login" , payload.form )
            .then( res => {
                // payload.auth.setUserToken(res.data.access_token)
                // localStorage.setItem('auth._token.local' , res.data.access_token)
                // localStorage.setItem('auth.strategy' , 'locale')
                // payload.auth.setLoggedIn(true)
                commit('setLoading' , false)
                const snackbar = {
                    active : true,
                    text: 'logged in successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res);
            })
            .catch(e => {
                
                reject(e.response.data);
            })
        })
    },
    register({commit} , payload) 
    {
        commit('setRegisterLoading' , true)
        commit('ui/setFormErrosRegister' , "" , { root: true })
        return new Promise((resolve, reject) => {
            http
            .post("register" , payload.form )
            .then( async (data) => {
                payload.auth.loginWith('local', { data: payload.form })
                commit('setRegisterLoading' , false)
                const snackbar = {
                    active : true,
                    text: 'registerd successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(data);
            })
            .catch(e => {
                commit('ui/setFormErrosRegister' , e.response.data , { root: true })
                commit('setLoading' , false)
                reject(e.response.data)
            })
          })
    },
    me({commit} , payload){
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get("user")
            .then(res => {
                payload.setUser(res.data)
                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                payload.logout();
                commit('setLoading' , false)
                reject(e.response.data);
            })
          })
    },
    getOrders({commit} ){
        commit('setOrdersLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get("user/orders")
            .then(res => {
                commit('setOrders' , res.data)
                commit('setOrdersLoading' , false)

                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    }
};
