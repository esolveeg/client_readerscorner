<template>
    <div>
        <sidebar-languages />
        <sidebar-categories />
        <sidebar-ages v-if="active" />      
        <sidebar-authors/>  
    </div>
</template>


<script>
import SidebarCategories from "@/components/partials/SidebarCategories.vue"
import SidebarAuthors from "@/components/partials/SidebarAuthors.vue"
import SidebarAges from "@/components/partials/SidebarAges.vue"
import {mapGetters} from 'vuex'
import SidebarLanguages from '../partials/SidebarLanguages.vue'
export default {
  computed: {
      ...mapGetters({
          active: 'ui/ageActive',
      })

  },
  components:{
    SidebarAuthors,
    SidebarAges,
    SidebarCategories,
    SidebarLanguages
  }
}
</script>

<style  scoped src="@/assets/scss/layouts/sidebar.css"></style>
