import http from "../repositories/Repository.js";
export const state = () => ({
    loading: false,
    deleted : false,
});

export const getters = {
    loading(state){
        return state.loading
    },
    deleted(state){
        return state.deleted
    }
};


export const mutations = {
   setLoading(state , payload){
       state.loading = payload
   },
   setDeleted(state , payload){
    state.deleted = payload
},
};

export const actions = {
    remove({commit},payload) {
        commit('setLoading' , true)
        console.log(payload.model);
            return new Promise((resolve , reject) => {
            http
            .delete(`delete/${payload.model}/${payload.id}`)
            .then(res => {
                commit('ui/clearDeleteModal' , {} , { root: true })
                const snackbar = {
                    active : true,
                    text: 'deleted successfully'
                }
                commit('ui/setSnackbar' , snackbar , { root: true })
                commit('setDeleted', true)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
                commit('ui/clearDeleteModal' , { root: true })
                commit('setLoading' , false)

            })
        })
    },
};
