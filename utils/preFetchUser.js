// import { store } from 'vuex'
// import http from "../repositories/Repository.js";
export const preFetch = (app) => {
    app.store.dispatch('myAuth/me' , app.$auth)
}
    