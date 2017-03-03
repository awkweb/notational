<template>
  <footer class="foot">
    
    <span v-if="activeNote">
      {{ activeNote.body | wordCount }} words
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
import { mapGetters } from 'vuex'

import { wordCount } from '../filters'

export default {
  name: 'foot',

  props: ['activeNote'],

  data: () => ({
    messages: [
      'Nice to see you again :)',
      'This is your moment of glory.',
      'Stay classy <3',
      'Beep, boop, bop',
      'Totally on fleek',
      'No time like the present!',
      'Courage is resistance to fear, mastery of fear, not absence of fear.'
    ]
  }),

  methods: {
    onLogOut () {
      const vm = this
      vm.$store.dispatch('LOG_OUT_USER').then(() => {
        vm.$router.push({ name: 'login'})
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
