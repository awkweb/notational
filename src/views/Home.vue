<template>
  <div id="home"
       class="home">
    <header>
      <h1 class="home__headline">
        Notes at the speed of <mark>thought</mark>.
      </h1>
      <h2 class="home__subline">
        Smart shortcuts and auto-save keep your hands on the keyboard—and your brain happy.
      </h2>
    </header>

    <div class="home__form">
      <form>
        <input v-model="email"
               v-focus
               class="home__form__email"
               type="text" placeholder="tom@wpi.edu"
               spellcheck="false"
               autofocus>
        
        <button v-on:click.prevent="getStarted"
                class="home__form__button">
          Get Started
        </button>
      </form>
      <span class="home__form__description">Join 50+ others reducing cognitive load</span>
    </div>

    <div class="home__reasons">
      <div class="reason">
        <h2 class="search">
          Search as you type
        </h2>
        <p>Searching encompasses all notes' content and occurs immediately with each key pressed.</p>
      </div>
      
      <div class="reason">
        <h2 class="share">
          Instantly shareable
        </h2>
        <p>Copy, paste, and send your note's unique link: Anyone can see your next great idea from anywhere.</p>
      </div>
    </div>

    <div class="home__buttons">
      <button @click="onLogIn"
                class="button large">
                Log In
      </button>
      <button @click="onSignUp"
              class="button primary large"
              id="sign-up">
              Sign Up
      </button>
    </div>

    <footer class="home__foot">
      <div>
        Made in Boston by <a href="http://meagher.co">Tom</a>.
      </div>

      <div>
        Inspired by <a href="http://notational.net/">Notational Velocity</a>.
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
    getStarted () {
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
