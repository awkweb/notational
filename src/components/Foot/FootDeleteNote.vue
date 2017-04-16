<template>
  <div class="user-profile">     
    <button @click="onDelete"
            class="button danger">
      Yes, delete note
    </button>

    <button @click="onCancel"
            class="button">
      Cancel
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { utilsMixin } from '../../mixins'

export default {
  name: 'foot-delete-note',

  mixins: [utilsMixin],

  methods: {
    ...mapActions(['DELETE_NOTE',
                   'RESET_ACTIVE_NOTE'
    ]),
    
    onDelete () {
      this.DELETE_NOTE().then(() => {
        this.RESET_ACTIVE_NOTE().then(() => {
          const id = '#search-input'
          this.focusElement(id)
          this.onCancel()
        })
      })
    },

    onCancel () {
      this.$emit('onCancel')
    }
  }

}
</script>
