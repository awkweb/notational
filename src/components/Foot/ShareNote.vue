<template>
  <div class="share-note">
    <div class="share-note__container">
      <div class="share-note__copy">
        <div class="share-note__url">
          https://notational.co/n/<span class="share-note__link">{{ noteKey }}</span>
        </div>
        
        <button @click="onCopyLink"
                :data-clipboard-text="noteUrl"
                id="clipboardjs"
                class="share-note__button">
          {{ copyButtonText }}
        </button>
      </div>

      <div class="share-note__permission">
        <button @click="onTogglePermission"
                :class="activeNote.is_public ? 'on' : 'off'"
                class="share-note__checkbox">
          {{ activeNote.is_public ? "On" : "Off" }}
        </button>

        <span class="share-note__info">Anyone with the link can view</span>
      </div>
    </div>
      
    <button @click="onShareNoteDone"
            class="button">
      Done
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Clipboard from 'clipboard'

import { noteMixin, utilsMixin } from '../../mixins'

export default {
  name: 'share-note',

  data: () => ({
    copyButtonText: 'Copy'
  }),

  mounted () {
    const id = '#clipboardjs'
    const button = this.selectElement(id)
    const clipboard = new Clipboard(button)
    clipboard.on('success', (e) => { this.copyButtonText = 'Copied!' })
    clipboard.on('error', (e) => { this.copyButtonText = 'Error' })
  },

  mixins: [noteMixin, utilsMixin],

  computed: {
    ...mapGetters(['activeNote',
                   'notes'
    ]),

    noteKey () {
      return this.activeNote ? this.findKeyForNoteId(this.activeNote.id, this.notes) : ''
    },

    noteUrl () {
      return `https://notational.co/n/${this.noteKey}`
    }
  },

  methods: {
    ...mapActions(['TOGGLE_IS_PUBLIC'
    ]),

    onCopyLink () {
      setTimeout(() => { this.copyButtonText = 'Copy' }, 800);
    },

    onTogglePermission () {
      this.TOGGLE_IS_PUBLIC(this.activeNote)
    },

    onShareNoteDone () {
      this.$emit('onShareNoteDone')
    }
  }

}
</script>
