<template>
  <footer class="foot">
    
    <share-note v-if="showShareNote && activeNote"
                @onShareNoteDone="onShare">
    </share-note>

    <main-actions v-else
                  @onShare="onShare">
    </main-actions>

  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import MainActions from './MainActions.vue'
import ShareNote from './ShareNote.vue'

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
    MainActions,
    ShareNote
  },

  methods: {
    onShare () {
      this.showShareNote = !this.showShareNote
    }
  }

}
</script>
