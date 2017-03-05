<template>
  <div id="signup" class="auth">
    <h1 class="auth__title text-center">Sign Up</h1>

    <message v-if="error"
             :text="error"
             @closeMessage="closeMessage">
    </message>
    
    <form class="auth__form">
      <div class="auth__form__group">
        <label class="auth__form__group__label">Email</label>
        <input class="auth__form__group__input email" 
               v-model="email"
               v-focus
               type="text"
               placeholder="tom@wpi.edu"
               spellcheck="false"
               autofocus>
      </div>
      
      <div class="auth__form__group">
        <label class="auth__form__group__label">Password</label>
        <input class="auth__form__group__input password" 
               v-model="password"
               type="password"
               placeholder="Super, secret">
      </div>

      <div class="auth__form__group">
        <label class="auth__form__group__label">Confirm Password</label>
        <input class="auth__form__group__input password" 
               v-model="confirm"
               type="password"
               placeholder="You know the drill">
      </div>
      
      <button class="auth__form__button"
              v-on:click.prevent="onSignUp"
              v-on:keyup.enter="onSignUp">
              Sign Up
      </button>
    </form>

    <router-link :to="{ name: 'login', query: { email: email }}">Have an account? Log in</router-link>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../mixins'
import Message from '../components/Message.vue'

export default {
  name: 'signup',

  mixins: [localStorageMixin],

  components: { Message },

  data: () => ({
    email: null,
    password: null,
    confirm: null,
    error: null
  }),

  created () {
    if (this.$route.query.email) {
      this.email = this.$route.query.email
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    ...mapActions(['SIGN_UP_USER', 'INIT_NOTES']),

    onSignUp () {
      if (this.password != this.confirm) {
        this.error = 'The passwords did not match.'
        return
      }


      if (this.email != null && this.password != null) {
        const data = {
          email: this.email,
          password: this.password
        }
        this.SIGN_UP_USER(data)
          .then(() => {
            this.ls_pushUser(this.user)
            this.INIT_NOTES()
              .then(() => this.$router.push({ name: 'main'}))
              .catch((error) => this.error = error.message)
          })
          .catch((error) => {
            this.error = error.message
          })
      } 
    },

    closeMessage () {
      this.error = null
    }
  },

  head: {
    title: {
      inner: 'Sign Up'
    }
  }

}
</script>

