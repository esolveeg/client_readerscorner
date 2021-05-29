import http  from "../repositories/Repository.js";

export const state = () => ({
    loading: false,
    couponLoading: false,
    couponNotFound: null,
    iframe:null,
    cart: []
});

export const getters = {
    loading(state){
        return state.loading
    },
    couponLoading(state){
        return state.couponLoading
    },
    couponNotFound(state){
        return state.couponNotFound
    },
    cart(state){
        return state.cart
    },
    iframe(state){
        return state.iframe
    }
};


export const mutations = {
    setLoading(state , payload){
        state.loading = payload
    },
    setCart(state , payload){
        state.cart = payload
    },
    setCouponLoading(state , payload){
        state.couponLoading = payload
    },
    setCouponNotFound(state , payload){
        state.couponNotFound = payload
    },
    setIframe(state,payload){
        state.iframe = payload
    }

    
};

export const actions = {
    get({commit}) 
    {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .post(`cart/get`)
            .then( res => {
                commit('setCart' , res.data)
                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    create({commit , dispatch} , payload) 
    {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .post(`cart` , payload)
            .then( res => {
                dispatch('get')
                const snackbar = {
                    active : true,
                    text: 'item added to cart successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    update({commit} , payload) 
    {
        return new Promise((resolve, reject) => {
            http
            .put(`cart/${payload.isbn}` , payload.payload)
            .then( res => {
                http
                .post(`cart/get`)
                .then( res => {
                    commit('setCart' , res.data)
                })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    checkout({commit} , payload) 
    {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .post(`checkout` , payload)
            .then( res => {
                commit('setLoading' , false)
                commit('setCart' , false)
                commit('setCart' , [])

                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    applyShipping({commit} , payload) 
    {
        return new Promise((resolve, reject) => {
            http
            .post(`cart/shipping` , payload)
            .then( res => {
                http
                .post(`cart/get`)
                .then( res => {
                    commit('setCart' , res.data)
                })
                
                const snackbar = {
                    active : true,
                    text: 'Shipping applied'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    applyGateway({commit} , payload) 
    {
        return new Promise((resolve, reject) => {
            http
            .post(`checkout/gateway` , payload)
            .then( res => {
                http
                .post(`cart/get`)
                .then( res => {
                    commit('setCart' , res.data)
                })
                
                if(res.data.url){
                    commit('setIframe' , res.data.url)
                } else {
                    commit('setIframe' , null)
                }
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    applyCoupon({commit} , payload){
        return new Promise((resolve, reject) => {
            http
            .post(`cart/coupon` , payload)
            .then( res => {
                commit('setCouponLoading' , false)
                commit('setCouponNotFound' , null)
                http
                .post(`cart/get`)
                .then( res => {
                    commit('setCart' , res.data)
                })
                const snackbar = {
                    active : true,
                    text: 'Coupon Applie Successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res.data);
            })
            .catch(e => {
                commit('setCouponNotFound' , e.response.data)
                commit('setCouponLoading' , false)
                reject(e.response.data);
            })
          })
    },
    delete({commit} , payload) 
    {
        return new Promise((resolve, reject) => {
            http
            .post(`cart/delete` , payload)
            .then( res => {
                http
                .post(`cart/get`)
                .then( res => {
                    commit('setCart' , res.data)
                })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    
  
};
