<template>
  <footer class="foot">
    
    <foot-share-note v-if="showShareNote && activeNote"
                     @onShareNoteDone="onShare">
    </foot-share-note>

    <foot-actions v-else
                  @onShare="onShare">
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

  methods: {
    onShare () {
      this.showShareNote = !this.showShareNote
    }
  }

}
</script>
