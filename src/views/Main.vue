<template>
  <div id="main">
    <input v-model="query" v-on:keyup.enter="onSearch" placeholder="Search or create" autofocus>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import router from '../router'

export default {
  name: 'main',

  data () {
  	return {
      query: null,
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
  	onSearch () {
      console.log("Searched")
  	}
  }

}
</script>
