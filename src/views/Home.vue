<template>
  <div
    id="home"
    class="home"
    :class="theme">
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
          <field
            v-for="field in fields"
            v-model="field.value"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :autofocus="field.autofocus">
          </field>
          
          <button 
            class="auth__form__button button large primary"                  
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
        <div
          class="home__browser">
          <div class="home__browser__header">
            <div class="home__browser__button-group">
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
            </div>
            <span class="home__browser__name">Preview Mode</span>
          </div>
          <div class="home__browser__body">
            <preview></preview>
          </div>
        </div>
      </div>
    </div>

    <p class="home__subline">
      <span>Smart shortcuts</span>, <span>magic save</span>, and <span>incremental search</span> keep your hands on the keyboard—and your brain happy.
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import router from '../router'
import { localStorageMixin } from '../mixins'
import Field from '../components/Field.vue'
import Message from '../components/Message.vue'
import Preview from '../components/Preview.vue'

export default {
  name: 'home',

  mixins: [localStorageMixin],

  components: {
    Field,
    Message,
    Preview
  },

  data: () => ({
    fields: {
      email: {
        name: 'Email Address',
        value: '',
        type: 'text',
        placeholder: 'monica@raviga.com',
        autofocus: false
      },
      password: {
        name: 'Password',
        value: '',
        type: 'password',
        placeholder: 'Super, secret',
        autofocus: false
      }
    },
    error: null
  }),

  computed: {
    ...mapGetters([
      'user',
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'SIGN_UP_USER',
      'INIT_NOTES'
    ]),

    onCreateAccount () {
      if (this.fields.email.value.length == 0) {
        this.error = 'Please enter an email address.'
        return
      }

      if (this.fields.password.value.length == 0) {
        this.error = 'Please enter a password.'
        return
      }

      const data = {
        email: this.fields.email.value,
        password: this.fields.password.value
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
      this.$router.push({ name: 'signup', query: { email: this.fields.email.value }})
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
