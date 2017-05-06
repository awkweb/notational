<template>
  <footer class="foot">
    <foot-share-note v-if="showShareNote && activeNote"
                     @onDone="onShareNote">
    </foot-share-note>

    <foot-actions v-else
                  @onShareNote="onShareNote">
    </foot-actions>

  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import FootActions from './FootActions.vue'
import FootShareNote from './FootShareNote.vue'

export default {
  name: 'foot',

  data: () => ({
    showShareNote: false
  }),

  computed: {
    ...mapGetters(['activeNote'
    ])
  },

  components: {
    FootActions,
    FootShareNote
  },

  watch: {
    activeNote () {
      this.showShareNote = false
    }
  },

  methods: {
    onShareNote () {
      this.showShareNote = !this.showShareNote
    }
  }

}
</script>
