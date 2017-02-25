<template>
  <div id="main">
    <input class="search"
           v-model="query"
           v-on:keyup.enter="onSearch"
           placeholder="Search or create"
           autofocus>
    <ul class="results">
      <li v-for="note in notes"><span>{{ note.title }}<span class="description"> — {{ note.body.substring(0,40) }}...</span></span><span>{{ note.date_modified }}</span></li>
    </ul>

    <textarea
      class="body"
      v-model="body"
      rows="12"></textarea>
    
    <div class="info">
      <span>300 words</span>
      <button class="info__button" v-on:click="onLogOut">Log Out</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import router from '../router'
import store from '../store'

export default {
  name: 'main',

  data () {
  	return {
      query: null,
      body: null
  	}
  },

  created () {
    if (this.user == null)
      router.push({ name: 'login'})
    else
      this.body = this.notes[1].body
  },

  computed: {
    ...mapGetters([
        'user',
        'notes',
    ])
  },

  methods: {
  	onSearch () {
      console.log("Searched")
  	},

    onLogOut () {
      store.dispatch('LOG_OUT_USER').then(() => {
        router.push({ name: 'login'})
      })
    },
  }

}
</script>
