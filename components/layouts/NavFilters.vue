<template>
<div class="nav-filters">
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header class="nav-item">
        Languages
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <sidebar-languages />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="nav-item">
        Categories
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <sidebar-categories />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-if="active">
      <v-expansion-panel-header class="nav-item">
        Ages
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <sidebar-ages  />  
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="nav-item">
        Authors
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <sidebar-authors />
      </v-expansion-panel-content>
    </v-expansion-panel>

    

  </v-expansion-panels>
</div>
</template>

<script>
import SidebarCategories from "@/components/partials/SidebarCategories.vue"
import SidebarAuthors from '../partials/SidebarAuthors.vue'
import {mapGetters} from 'vuex'
import SidebarLanguages from '../partials/SidebarLanguages.vue'
export default {
    components:{
        SidebarCategories,
        SidebarAuthors,
        SidebarLanguages
    },
    computed:{
      ...mapGetters({
        active: 'ui/ageActive',
      })
    }
}
</script>
<style src="@/assets/scss/layouts/nav-filters.css">