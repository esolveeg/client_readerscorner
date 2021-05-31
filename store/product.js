import http  ,{ serializeQuery }from "../repositories/Repository.js";

export const state = () => ({
    loading: false,
    bestsellerLoading: false,
    categoriesLoading: false,
    subCategoriesLoading: false,
    authorsLoading:false,
    authors:[],
    products: [],
    searchProducts: [],
    searchLoading: false,
    ages: [],
    agesLoading: false,
    product: {},
    categories: [],
    subCategories: [],
    bestsellers:[],
    languages:[],
    languagesLoading : false,
});

export const getters = {
    subCategoriesLoading(state){
        return state.subCategoriesLoading
    },
    ages(state){
        return state.ages
    },
    agesLoading(state){
        return state.agesLoading
    },
    searchProducts(state){
        return state.searchProducts
    },
    searchLoading(state){
        return state.searchLoading
    },
    subCategories(state){
        return state.subCategories
    },
    loading(state){
        return state.loading
    },
    products(state){
        return state.products
    },
    product(state){
        return state.product
    },
    categories(state){
        return state.categories
    },
    categoriesLoading(state){
        return state.categoriesLoading
    },
    bestsellerLoading(state){
        return state.bestsellerLoading
    },
    bestsellers(state){
        return state.bestsellers
    },
    authors(state){
        return state.authors
    },
    authorsLoading(state){
        return state.authorsLoading
    },
    languages(state){
        return state.languages
    },
    languagesLoading(state){
        return state.languagesLoading
    }

};


export const mutations = {
    setLoading(state , payload){
        state.loading = payload
    },
    setAgesLoading(state , payload){
        state.agesLoading = payload
    },
    setAges(state , payload){
        state.ages = payload
    },
    setSearchProducts(state , payload){
        state.searchProducts = payload
    },
    setSearchLoading(state , payload){
        state.searchLoading = payload
    },
    setCategoriesLoading(state , payload){
        state.categoriesLoading = payload
    },
    setSubCategoriesLoading(state , payload){
        state.subCategoriesLoading = payload
    },
    setBestsellerLoading(state , payload){
        state.bestsellerLoading = payload
    },
    setProducts(state , payload){
        state.products = payload
    },
    setBestsellers(state , payload){
        state.bestsellers = payload
    },
    setProduct(state , payload){
        state.product = payload
    },
    setCategories(state , payload){
        state.categories = payload
    },

    setSubCategories(state , payload){
        state.subCategories = payload
    },

    setAuhorsLoading(state , payload){
        state.authorsLoading = payload 
    },
    setAuthors(state , payload){
        state.authors = payload 
    },
    setLanguages(state , payload){
        state.languages = payload 
    },
    setLanguagesLoading(state , payload){
        state.languagesLoading = payload 
    },
};

export const actions = {
    search({commit} , query){
        commit('setSearchLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product?search=${query}` )
            .then( res => {
                commit('setSearchProducts' , res.data.data)
                commit('setSearchLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getLanguages({commit}) 
    {
        commit('setLanguagesLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get("product/languages" )
            .then( res => {
                commit('setLanguages' , res.data)
                commit('setLanguagesLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getBestseller({commit}) 
    {
        commit('setBestsellerLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get("product?key=bestseller" )
            .then( res => {
                commit('setBestsellers' , res.data)
                commit('setBestsellerLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    get({commit ,dispatch} , payload) 
    {
        commit('setLoading' , true)
        //check if category is equals to kids to make some configurations
        if(payload.category == 'kids'){
            //active the age
            commit('ui/setAgeActive' , true , { root: true })
            //check if the age is undefiened to disable the subages
            //subages is telling us that we will replace subcategories with ages when we are under kids
            // else block validate this we will remove the ages from subcats position if age is selected
            if(typeof payload.age == 'undefined'){
                commit('ui/setSubAges' , true , { root: true })
            } else {
                commit('ui/setSubAges' , false , { root: true })
            }
        } else{
            //check if category is not equals to kids to make disable ages
            commit('ui/setAgeActive' , false , { root: true })
            commit('ui/setSubAges' , false , { root: true })

        }

        //check if there is no category to do some configurations on ui
        if(typeof payload.category == 'undefined'){
                //disable the subcats
                commit('ui/setNoSubCats' , true , { root: true })
                //disable sub ages
                commit('ui/setSubAges' , false , { root: true })
                // remove the ages from subcats position if there is no category selecte
                commit('ui/setAgeActive' , false , { root: true })
        } else {
            commit('ui/setNoSubCats' , false , { root: true })
        }
        return new Promise((resolve, reject) => {
            http
            .get(`product?${serializeQuery(payload)}`)
            .then( res => {
                commit('setProducts' , res.data)
                commit('setLoading' , false)
                if(payload.category){
                    commit('ui/setSubCategoriesActive' , true , { root: true })
                    dispatch('getSubCategories' , payload.category)
                }
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getCategories({commit}) 
    {
        commit('setCategoriesLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product/categories`)
            .then( res => {
                commit('setCategories' , res.data)
                commit('setCategoriesLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getAges({commit}) 
    {
        commit('setAgesLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product/ages`)
            .then( res => {
                commit('setAges' , res.data)
                commit('setAgesLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getSubCategories({commit} , payload) 
    {
        commit('setCategoriesLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product/categories/${payload}`)
            .then( res => {
                commit('setSubCategories' , res.data)
                commit('setCategoriesLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    getAuthors({commit}) 
    {
        commit('setAuhorsLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product/authors`)
            .then( res => {
                commit('setAuthors' , res.data)
                commit('setAuhorsLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
    find({commit} , slug) 
    {
        commit('setLoading' , true)
        return new Promise((resolve, reject) => {
            http
            .get(`product/find/${slug}`)
            .then( res => {
                commit('setProduct' , res.data)
                commit('setLoading' , false)
                resolve(res.data);
            })
            .catch(e => {
                reject(e.response.data);
            })
          })
    },
};
