<template>
  <nav id="navbar" class="navbar">
    <router-link class="navbar__logo" :to="{ name: 'main' }">NV</router-link>
    <button class="navbar__button" v-on:click="onLogOut">Log Out</button>
  </nav>
</template>

<script>
import router from '../router'
import store from '../store'

export default {
  name: 'navbar',

  methods: {
    onLogOut () {
      store.dispatch('LOG_OUT_USER').then(() => {
        router.push({ name: 'login'})
      })
    },
  },

}
</script>