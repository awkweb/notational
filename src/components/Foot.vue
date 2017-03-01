<template>
  <footer class="foot">
    <span v-if="activeNote"> {{ activeNote.body | wordCount }} words • {{ activeNote.body | characterCount }} characters</span>
    <span v-else>{{ messages[randomIntFromInterval(0, messages.length - 1)] }}</span>

    <button class="foot__button" v-on:click="onLogOut">Log Out</button>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import { wordCount, characterCount } from '../filters'

export default {
  name: 'foot',

  props: ['activeNote'],

  data () {
    return {
      messages: [
        'Nice to see you again :)',
        'This is your moment of glory.',
        'Hey-oh!',
        'Thanks for stopping by.',
        'Stay classy <3',
        'Beep, boop, bop',
        'No time like the present!',
        'Courage is resistance to fear, mastery of fear, not absence of fear.'
      ]
    }
  },

  methods: {
    onLogOut () {
      const vm = this
      vm.$store.dispatch('LOG_OUT_USER').then(() => {
        vm.$router.push({ name: 'login'})
      })
    },

    randomIntFromInterval (from, to) {
      return Math.floor(Math.random() * (to - from + 1) + from);
    }
  }

}
</script>
