<template>
  <div id="home"
       class="home">
    <nav class="home__nav">
      <router-link
        :to="{ name: 'home'}"
        class="home__nav__logo">
        Notational
      </router-link>

      <div>
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
    </nav>

    <header class="home__header">
      <h1 class="home__headline">
        Notes at the speed of thought.
      </h1>
    </header>

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
import router from '../router'

export default {
  name: 'home',

  data: () => ({
    email: ''
  }),

  methods: {
    onStart () {
      router.push({ name: 'signup', query: { email: this.email }})
    },

    onSignUp() {
      this.$router.push({ name: 'signup', query: { email: this.email }})
    },

    onLogIn () {
      this.$router.push({ name: 'login'})
    }
  },

  head: {
    title: {
      inner: 'Notes at the speed of thought.'
    }
  }

}
</script>
