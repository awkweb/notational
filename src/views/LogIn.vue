<template>
  <div id="login" class="auth">
        <h1 class="auth__title text-center">Notational Velocity</h1>
        <form class="auth__form">
            <div class="auth__form__group">
                <label>Email</label>
                <input v-model="email" type="text" placeholder="tom@wpi.edu" spellcheck="false" autofocus>
            </div>
            <div class="auth__form__group">
                <label>Password</label>
                <input v-model="password" type="password" placeholder="Super, secret">
            </div>
            <button class="auth__form__button" v-on:click.prevent="onLogIn" v-on:keyup.enter="onLogIn">Log In</button>
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
      if (this.email != null && this.password != null) {
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
      } 
  	},
  },

}
</script>
