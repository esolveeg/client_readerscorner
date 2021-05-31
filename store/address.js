import http from "../repositories/Repository.js";
export const state = () => ({
    loading: false,
    citiesLoading:false,
    addresses: [],
    cities: [],
    address: {},
});

export const getters = {
    loading(state){
        return state.loading
    },
    addresses(state){
        return state.addresses
    },
    address(state){
        return state.address
    },
    cities(state){
        return state.cities
    },
    citiesLoading(state){
        return state.citiesLoading
    }
    
};


export const mutations = {
    setLoading(state , payload){
        state.loading = payload
    },
    setAddresses(state , payload){
        state.addresses = payload
    },
    setAddress(state , payload){
        state.address = payload
    },
    setCitiesLoading(state , payload){
        state.citiesLoading = payload
    },
    setCities(state , payload){
        state.cities = payload
    },
};

export const actions = {
    get({commit} , payload) {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .post("user/address" , payload)
            .then(res => {
                commit('setAddresses' , res.data)

                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    find({commit},id) {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`user/address/${id}`)
            .then(res => {
                commit('setAddress' , res.data)

                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    create({commit},payload) {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            payload.type = "insert"
            http
            .post(`user/address/` , payload)
            .then(res => {
                http
                .post("user/address")
                .then(res => {
                    commit('setAddresses' , res.data)
                })
                commit('setLoading' , false)
                const snackbar = {
                    active : true,
                    text: 'address created in successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    update({commit , dispatch},payload) {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .put(`user/address/${payload.id}` , payload.form)
            .then(res => {
                dispatch('get')
                commit('setLoading' , false)
                const snackbar = {
                    active : true,
                    text: 'address updated in successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    },
    delete({commit , dispatch},id) {
        commit('setLoading' , true)
            return new Promise((resolve, reject) => {
            http
            .delete(`user/address/${id}`)
            .then(res => {
                dispatch('get')
                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
                commit('setLoading' , false)

            })
        })
    },
    getCities({commit}){
        commit('setCitiesLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`city`)
            .then(res => {
                commit('setCities' , res.data)
                commit('setCitiesLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
        })
    }
};
