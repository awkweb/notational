<template>
  <div id="signup" class="auth">
    <h1 class="auth__title text-center">Sign Up</h1>
    
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

import { localStorageMixin } from '../mixins/local-storage-mixin'

export default {
  name: 'signup',

  mixins: [localStorageMixin],

  data: () => ({
    email: null,
    password: null,
    confirm: null
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
    ...mapActions(['SIGN_UP_USER', 'FETCH_NOTES']),

    onSignUp () {
      if ((this.email != null && this.password != null) && (this.password === this.confirm)) {
        const data = {
          email: this.email,
          password: this.password
        }
        this.SIGN_UP_USER(data).then(() => {
          this.ls_pushUser(this.user)
        
          this.FETCH_NOTES(this.user.uid).then(() => {
            this.ls_pushNotes([])
            this.$router.push({ name: 'main'})
          })
        })
      } 
    },
  },

}
</script>

