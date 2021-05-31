<template>
    <div class="text-center">
    <v-dialog
      v-model="modal.active"
      width="500"
    >
      <v-card>
        <v-card-title color="red" class="headline grey lighten-2">
          Are  you Sure You Want To Delete {{modal.name}}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click.prevent="$emit('remove',modal)"
          >
            Delete
          </v-btn>
          <v-btn
            color="primary"
            text
            @click.prevent="toggle"
          >
            Cancle
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters , mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
          loading: 'ui/deleteLoading',
          modal: 'ui/deleteModal',
      })
    },
    methods: {
      ...mapMutations({
          toggle: 'ui/toggleDeleteModal' // map `this.add()` to `this.$store.commit('increment')`
      }),
    }
  }
</script>