<template>
  <div id="login">
        <h1>Welcome back!</h1>
        <form>
            <div>
                <label>Email address</label>
                <input v-model="email" type="text" placeholder="you@domain.com" spellcheck="false" autofocus>
            </div>
            <div>
                <label>Password</label>
                <input v-model="password" type="password" placeholder="Super, secret">
            </div>
            <button v-on:click.prevent="onLogIn" v-on:keyup.enter="onLogIn">Log In</button>
        </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import router from '../router'
import store from '../store'

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
  	onLogIn () {
      const vm = this;
      const data = {
        email: this.email,
        password: this.password,
      }
      store.dispatch('LOG_IN_USER', data).then(() => {
        store.dispatch('FETCH_NOTES', vm.user.uid).then(() => {
          router.push({ name: 'main'})
        })
      })
  	},
  },

}
</script>
