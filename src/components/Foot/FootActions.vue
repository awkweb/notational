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
            <button
              @click="onShareNote"
              class="button-icon share">
            </button>
          </template>

          <button
            @click="onUpdateTheme"
            class="button-icon theme">
          </button>

          <button
            @click="onLogOut"
            class="button-icon user">
          </button>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../../mixins'

export default {
  name: 'foot-actions',

  mixins: [localStorageMixin],
 
  computed: {
    ...mapGetters([
      'activeNote',
      'theme'
    ])
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
      'True will is wishing backed by power.',
      'I never learned anything while I was talking.',
      'Do things that have never been done.',
      'The details are not the details. They make the design.'
    ]
  }),

  methods: {
    ...mapActions([
      'UPDATE_THEME',
      'RESET_APP',
      'LOG_OUT_USER',
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
    },

    onLogOut () {
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    }
  }

}
</script>
