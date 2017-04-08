<template>
  <div class="share-note">
    <div class="share-note__container">
      <div class="share-note__copy">
        <div class="share-note__url">
          https://notational.co/n/<span class="share-note__link">{{ noteKey }}</span>

          <input v-model="noteUrl"
                 id="note-url-hidden">
        </div>
        
        <button @click="onCopyLink"
                class="share-note__button">
          {{ isCopied ? "Copied!" : "Copy" }}
        </button>
      </div>

      <div class="share-note__permission">
        <button @click="onTogglePermission"
                class="share-note__checkbox">
          {{ isShareOn ? "On" : "Off" }}
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
import { mapGetters } from 'vuex'

import { noteMixin, utilsMixin } from '../../mixins'

export default {
  name: 'share-note',

  data: () => ({
    isCopied: false,
    isShareOn: false
  }),

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
    onCopyLink () {
      this.isCopied = true
      const id = '#note-url-hidden'
      const copySpan = this.selectElement(id);
      copySpan.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Success ' + copySpan.value);
      } catch (err) {
        console.log('Oops, unable to copy');
      }
      setTimeout(() => { this.isCopied = false }, 950);
    },

    onTogglePermission () {
      this.isShareOn = !this.isShareOn
    },

    onShareNoteDone () {
      this.$emit('onShareNoteDone')
    }
  }

}
</script>
