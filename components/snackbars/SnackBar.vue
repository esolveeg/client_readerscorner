<template>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar.active"
      :timeout="3000"
    >
      {{ snackbar.text }}

     
    </v-snackbar>
  </div>
</template>

<script>  
import { mapGetters , mapMutations } from 'vuex';

export default {
    computed: {
      ...mapGetters({
          snackbar: 'ui/snackbar',
      })
    },
    methods: {
      ...mapMutations({
          toggle: 'ui/setSnackbar' // map `this.add()` to `this.$store.commit('increment')`
      }),
    }
}
</script>