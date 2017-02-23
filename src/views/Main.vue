<template>
  <div id="main">
    <p>Main view</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import router from '../router'

export default {
  name: 'main',

  data () {
  	return {
  	}
  },

  created () {
    if (this.user == null)
      router.push({ name: 'login'})
  },

  computed: {
    ...mapGetters([
        'user',
    ])
  },

  methods: {
  	logOut () {
  	}
  }

}
</script>
