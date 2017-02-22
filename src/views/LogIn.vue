<template>
  <div id="login">
        <h1>Welcome back!</h1>
        <div v-if="user != null">{{ user }}</div>
        <form>
            <div>
                <label>Email address</label>
                <input v-model="email" type="text" placeholder="you@domain.com" spellcheck="false" autofocus>
            </div>
            <div>
                <label>Password</label>
                <input v-model="password" type="password" placeholder="Super, secret">
            </div>
            <button v-on:click.prevent="logIn">Log In</button>
        </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',

  data () {
  	return {
  		email: null,
  		password: null,
  	}
  },

  computed: {
    ...mapGetters([
        'user',
    ])
  },

  methods: {
  	logIn () {
      const data = {
        email: this.email,
        password: this.password,
      }
      this.$store.dispatch('FETCH_USER', data)
  	}
  },

}
</script>
