<template>
  <div id="home"
       class="home">
    <nav class="home__nav">
      <div class="home__container nav">
        <router-link
          :to="{ name: 'home'}"
          class="home__nav__logo">
          N<span>otational</span>
        </router-link>

        <div>
          <a
            href="mailto:tom@meagher.co"
            class="home__nav__button">
            Contact
          </a>

          <button
            @click="onLogIn"
            class="home__nav__button">
            Log In
          </button>
          
          <button
            @click="onSignUp"
            class="home__nav__button primary"
            id="sign-up">
            Sign Up
          </button>
        </div>
      </div>
    </nav>

    <div class="home__container main">

      <div class="home__content left">
        <h1 class="home__headline">
          Notes at the speed of thought.
        </h1>

        <form class="home__form">
          <div
            class="auth__form__group"
            :class="{ active: activeInput === 'email' }">
            <label class="auth__form__group__label">Email Address</label>
            <input
              class="auth__form__group__input" 
              v-model="email"
              v-focus
              @focus="activeInput = 'email'"
              @blur="activeInput = null"
              type="text"
              placeholder="richard@piedpiper.com"
              spellcheck="false"
              autofocus>
          </div>
          
          <div
            class="auth__form__group"
            :class="{ active: activeInput === 'password' }">
            <label class="auth__form__group__label">Password</label>
            <input
              class="auth__form__group__input" 
              v-model="password"
              @focus="activeInput = 'password'"
              @blur="activeInput = null"
              type="password"
              placeholder="Super, secret">
          </div>
          
          <button class="auth__form__button"
                  v-on:click.prevent="onCreateAccount"
                  v-on:keyup.enter="onCreateAccount">
                  Create an Account
          </button>
        </form>

        <message
          v-if="error"
          :text="error"
          @closeMessage="closeMessage">
        </message>
      </div>

      <div class="home__content right">
        <div class="home__browser">
          <div class="home__browser__header">
            <div class="home__browser__button-group">
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
            </div>
          </div>
          <div class="home__browser__body"></div>
        </div>
      </div>
    </div>

    <p class="home__subline">
      <span>Smart shortcuts</span>, <span>magic save</span>, and <span>incremental search</span> keep your hands on the keyboard—and your brain happy.
    </p>

    <footer class="home__foot">
      <div>
        Made in Boston by <a href="http://meagher.co">Tom</a>
      </div>

      <div>
        Inspired by <a href="http://notational.net/">Notational Velocity</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import router from '../router'
import { localStorageMixin } from '../mixins'
import Message from '../components/Message.vue'

export default {
  name: 'home',

  mixins: [localStorageMixin],

  components: { Message },

  data: () => ({
    email: null,
    password: null,
    activeInput: null,
    error: null
  }),

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    ...mapActions([
      'SIGN_UP_USER',
      'INIT_NOTES'
    ]),

    onCreateAccount () {
      if (this.email === null) {
        this.error = 'Please enter an email address.'
        return
      }

      if (this.password === null) {
        this.error = 'Please enter a password.'
        return
      }

      const data = {
        email: this.email,
        password: this.password
      }

      this.SIGN_UP_USER(data)
        .then(() => {
          this.ls_pushUser(this.user)
          console.log()
          this.INIT_NOTES()
            .then(() => this.$router.push({ name: 'app'}))
            .catch((error) => this.error = error.message)
        })
        .catch((error) => {
          this.error = error.message
        })
    },

    onSignUp() {
      this.$router.push({ name: 'signup', query: { email: this.email }})
    },

    onLogIn () {
      this.$router.push({ name: 'login'})
    },

    closeMessage () {
      this.error = null
    }
  },

  head: {
    title: {
      inner: 'Notes at the speed of thought.'
    }
  }

}
</script>
