<template>
  <footer class="foot">
    <span v-if="activeNote"> {{ activeNote.body | wordCount }} words • {{ activeNote.body | characterCount }} characters</span>
    <span v-else>Welcome back :)</span>

    <button class="foot__button" v-on:click="onLogOut">Log Out</button>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

import { wordCount, characterCount } from '../filters'

export default {
  name: 'foot',

  props: ['activeNote'],

  methods: {
    onLogOut () {
      const vm = this
      vm.$store.dispatch('LOG_OUT_USER').then(() => {
        vm.$router.push({ name: 'login'})
      })
    }
  }

}
</script>
