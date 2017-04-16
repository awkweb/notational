<template>
  <div class="main-actions">
      <span v-if="activeNote">
        {{ activeNote.body | wordCount }} words,
        {{ activeNote.body | charCount }} chars
      </span>
      
      <span v-else>
        {{ randomQuote() }}
      </span>

      <div class="foot__right">
          <template v-if="activeNote">
            <button @click="onDeleteNote"
                  class="button-icon trash">
            </button>
            
            <button @click="onShareNote"
                  class="button-icon share">
            </button>
          </template>

          <button @click="onUserProfile"
                  class="button-icon user">
          </button>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'foot-actions',
 
  computed: {
    ...mapGetters(['activeNote'
    ])
  },

  data: () => ({
    quotes: [
      'Praise specifically, criticize generally.',
      'Good artists borrow, great artists steal.',
      'Simplicity is the ultimate sophistication.',
      'This is your moment of glory.',
      'Stay present.',
      'Even elephants do slip.',
      'True will is wishing backed by power.',
      'I never learned anything while I was talking.',
      'Do things that have never been done.'
    ]
  }),

  methods: {    
    onDeleteNote () {
      this.$emit('onDeleteNote')
    },

    onShareNote () {
      this.$emit('onShareNote')
    },

    onUserProfile () {
      this.$emit('onUserProfile')
    },

    randomQuote () {
      const index = _.random(0, this.quotes.length - 1);
      return this.quotes[index]
    }
  }

}
</script>
