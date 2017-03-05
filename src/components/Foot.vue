<template>
  <footer class="foot">
    
    <span v-if="activeNote">
      {{ activeNote.body | wordCount }} words,
      {{ activeNote.body | charCount }} characters
    </span>
    
    <span v-else>
      {{ randomMessage() }}
    </span>

    <button class="foot__button"
            v-on:click="onLogOut">
            Log Out
    </button>

  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../mixins'
import { wordCount } from '../filters'

export default {
  name: 'foot',

  mixins: [localStorageMixin],

  props: ['activeNote'],

  data: () => ({
    messages: [
      'I don\'t paint things, I paint the difference between things.',
      'Good artists borrow, great artists steal.',
      'Have no fear of perfection – you\'ll never reach it.',
      'Simplicity is the ultimate sophistication.',
      'This is your moment of glory.'
    ]
  }),

  methods: {
    ...mapActions(['LOG_OUT_USER']),
    
    onLogOut () {
      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    randomMessage () {
      const to = 0
      const from = this.messages.length - 1
      const index = Math.floor(Math.random() * (to - from + 1) + from)
      return this.messages[index]
    }
  }

}
</script>
