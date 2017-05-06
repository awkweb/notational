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
            <button @click="onShareNote"
                  class="button-icon share">
            </button>
          </template>

          <button @click="onUpdateTheme"
                  class="button-icon theme">
          </button>

          <button @click="onUserProfile"
                  class="button-icon user">
          </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import router from '../../router'

export default {
  name: 'foot-actions',
 
  computed: {
    ...mapGetters([
      'activeNote',
      'theme'
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
    ...mapActions(['UPDATE_THEME'
    ]),

    onShareNote () {
      this.$emit('onShareNote')
    },

    onUserProfile () {
      router.push({ path: 'me' })
    },

    onUpdateTheme () {
      const theme = this.theme === 'dark' ? 'light' : 'dark'
      this.UPDATE_THEME(theme)
    },

    randomQuote () {
      const index = _.random(0, this.quotes.length - 1)
      return this.quotes[index]
    }
  }

}
</script>
