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
        <template v-if="activeNote && user">           
          <button
            @click="onShareNote"
            class="button-icon share">
          </button>
        </template>

        <button
          @click="onUpdateTheme"
          class="button-icon theme">
        </button>

        <dropdown></dropdown>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Dropdown from '../Dropdown.vue'

export default {
  name: 'foot-actions',
 
  computed: {
    ...mapGetters([
      'activeNote',
      'theme',
      'user'
    ])
  },

  components: {
    Dropdown
  },

  data: () => ({
    lastIndex: 0,
    quotes: [
      'Stay present.',
      'Praise specifically, criticize generally.',
      'Good artists borrow, great artists steal.',
      'Simplicity is the ultimate sophistication.',
      'This is your moment of glory.',
      'Even elephants do slip.',
      'Be yourself; everyone else is already taken.',
      'True will is wishing backed by power.',
      'I never learned anything while I was talking.',
      'Do things that have never been done.',
      'The details are not the details. They make the design.',
      'Love all, trust a few, do wrong to none.',
      'Everything you can imagine is real.'
    ]
  }),

  methods: {
    ...mapActions([
      'UPDATE_THEME'
    ]),

    onShareNote () {
      this.$emit('onShareNote')
    },

    onUpdateTheme () {
      const theme = this.theme === 'dark' ? 'light' : 'dark'
      this.UPDATE_THEME(theme)
    },

    randomQuote () {
      let index = _.random(0, this.quotes.length - 1)
      return this.quotes[index]
    }
  }

}
</script>
