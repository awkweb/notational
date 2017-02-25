<template>
  <div id="app">
    <navbar v-if="user != null"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Navbar from './components/Navbar.vue'

export default {
  name: 'app',

  components: {
    navbar: Navbar
  },

  computed: {
  	...mapGetters([
        'user',
    ])
  },
}
</script>
