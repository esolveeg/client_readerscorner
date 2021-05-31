import http  from "../repositories/Repository.js";
export const state = () => ({
    appDrawer: false,
    deleteLoading: false,
    subAges : false,
    noSubCats : false,
    loginRequired : false,
    DCPOpenned:false,
    subCategoriesActive: false,
    ageActive: false,
    formErrors : '',
    formErrorsRegister: '',
    sliders : [],
    slidersLoading: false,
    loginModal:{
        active : false,
    },
    deleteModal : {
        active: false,
        name:'',
        id:'',
        model:'',
    },
    editAddress:{
        active : false,
        id:null,
    },
    addAddress:{
        active : false,
    },
    snackbar : {
        active: false,
        text: '',
    },

});

export const getters = {
    appDrawer(state) {
        return state.appDrawer
    },
    noSubCats(state){
        return state.noSubCats
    },
    formErrorsRegister(state) {
        return state.formErrorsRegister
    },
    formErrors(state) {
        return state.formErrors
    },
    subCategoriesActive(state) {
        return state.subCategoriesActive
    },
    subAges(state){
        return state.subAges
    },
    ageActive(state) {
        return state.ageActive
    },
    loginRequired(state){
        return state.loginRequired
    },
    editAddress(state) {
        return state.editAddress
    },
    addAddress(state) {
        return state.addAddress
    },
    deleteModal(state) {
        return state.deleteModal
    },
    deleteLoading(state) {
        return state.deleteLoading
    },
    snackbar(state){
        return state.snackbar
    },
    loginModal(state){
        return state.loginModal
    },
    sliders(state){
        return state.sliders
    },
    slidersLoaing(state){
        return state.slidersLoaing
    },
    DCPOpenned(state) {
        return state.DCPOpenned
    }
};


export const mutations = {
    setAppDrawer(state, payload) {
        state.appDrawer = payload
    },
    setNoSubCats(state, payload) {
        state.noSubCats = payload
    },
    setFormErros(state,payload){
    state.formErrors = payload  
    },
    setFormErrosRegister(state,payload){
        state.formErrorsRegister = payload  
    },
    setSliders(state, payload) {
        state.sliders = payload
    },
    setSlidersLoading(state, payload) {
        state.slidersLoaing = payload
    },
    setAgeActive(state,payload){
        state.ageActive = payload
    },
    setSubCategoriesActive(state , payload){
        state.setSubCategoriesActive = payload
    },
    setLoginRequired(state , payload){
        state.loginRequired = payload
    },
    setSnackbar(state , payload){
        state.snackbar = payload
    },
    toggleSnackbar(state){
        state.snackbar.active = !state.snackbar.active
    },
    setSubAges(state , payload){
        state.subAges = payload
    },
    clearSnackbar(state){
        const snackbar = {
            active: false,
            text:'',
        }
        state.snackbar = snackbar
    },
    setDCPOpenned(state) {
        state.DCPOpenned = !state.DCPOpenned
    },
    setDeleteModal(state , payload) {
        state.deleteModal = payload
    },
    clearDeleteModal(state) {
        const modal = {
            active: false,
            name:'',
            id:'',
            model:'',
        }
        state.deleteModal = modal
    },
    toggleDeleteModal(state){
        state.deleteModal.active = !state.deleteModal.active
    },
    toggleEditAddress(state){
        state.editAddress.active = !state.editAddress.active
    },
    setEditAddress(state , payload){
        state.editAddress = payload
    },
    setLoginModal(state , payload){
        state.loginModal.active = payload
    },
    clearEditAddress(state){
        const editAddress = {
            active : false,
            id:null,
        }
        state.editAddress = editAddress
    },
    setAddAddress(state , payload){
        state.addAddress = payload
    },
    clearAddAddress(state){
        const addAddress = {
            active : false,
        }
        state.addAddress = addAddress
    },
    togglAddAddress(state){
        state.addAddress.active = !state.addAddress.active

    }
    
};

export const actions = {
    getSliders({commit} , payload) 
    {
        commit('setSliderLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .put(`sliders` , payload.payload)
            .then( res => {
                commit('setSlider' , res.data)
                commit('setSliderLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
}