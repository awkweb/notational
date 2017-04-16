<template>
  <footer class="foot">
    
    <foot-delete-note v-if="showDeleteNote"
                      @onCancel="onDeleteNote">
    </foot-delete-note>

    <foot-share-note v-else-if="showShareNote && activeNote"
                     @onDone="onShareNote">
    </foot-share-note>

    <foot-user-profile v-else-if="showUserProfile"
                     @onDone="onUserProfile">
    </foot-user-profile>

    <foot-actions v-else
                  @onDeleteNote="onDeleteNote"
                  @onShareNote="onShareNote"
                  @onUserProfile="onUserProfile">
    </foot-actions>

  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import FootActions from './FootActions.vue'
import FootDeleteNote from './FootDeleteNote.vue'
import FootShareNote from './FootShareNote.vue'
import FootUserProfile from './FootUserProfile.vue'

export default {
  name: 'foot',

  data: () => ({
    showDeleteNote: false,
    showShareNote: false,
    showUserProfile: false
  }),

  computed: {
    ...mapGetters(['activeNote'
    ])
  },

  components: {
    FootActions,
    FootDeleteNote,
    FootShareNote,
    FootUserProfile
  },

  watch: {
    activeNote () {
      this.showDeleteNote = false
      this.showShareNote = false
      this.showUserProfile = false
    }
  },

  methods: {
    onDeleteNote () {
      this.showDeleteNote = !this.showDeleteNote
    },

    onShareNote () {
      this.showShareNote = !this.showShareNote
    },

    onUserProfile () {
      this.showUserProfile = !this.showUserProfile
    }
  }

}
</script>
