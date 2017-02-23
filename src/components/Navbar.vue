<template>
  <nav id="navbar">
    <button v-on:click="onLogOut" v-if="user != null">Log Out</button>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

import router from '../router'
import store from '../store'

export default {
  name: 'navbar',

  computed: {
    ...mapGetters([
        'user',
    ])
  },

  methods: {
    onLogOut () {
      store.dispatch('LOG_OUT_USER').then(() => {
        router.push({ name: 'login'})
      })
    },
  },

}
</script>