<template>
  <div id="login" class="auth">
    <h1 class="auth__title text-center">Log In</h1>

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
      
      <button class="auth__form__button"
              v-on:click.prevent="onLogIn"
              v-on:keyup.enter="onLogIn">
              Log In
      </button>
    </form>

    <router-link :to="{ name: 'signup', query: { email: email }}">
      New here? Sign up
    </router-link>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../mixins'
import Message from '../components/Message.vue'

export default {
  name: 'login',

  mixins: [localStorageMixin],

  components: { Message },

  data: () => ({
    email: null,
    password: null,
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
    ...mapActions(['LOG_IN_USER',
                   'DELETE_ANONYMOUS_USER'
    ]),

    onLogIn () {
      if (this.email != null && this.password != null) {
        if (this.user && this.user.isAnonymous) {
          this.DELETE_ANONYMOUS_USER(this.user.uid)
        }

        const data = {
          email: this.email,
          password: this.password
        }
        this.LOG_IN_USER(data)
          .then(() => {
            this.ls_pushUser(this.user)
            this.$router.push({ name: 'app'})
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
      inner: 'Log In'
    }
  }

}
</script>