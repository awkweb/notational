<template>
  <footer class="foot">
    
    <span v-if="activeNote">
      {{ activeNote.body | wordCount }} words,
      {{ activeNote.body | charCount }} characters
    </span>
    
    <span v-else>
      {{ randomMessage() }}
    </span>

    <div class="foot__right">
      <template v-if="user && !user.isAnonymous">
        <button @click="onLogOut"
                class="foot__button">
                Log Out
        </button>
      </template>

      <template v-else>
        <button @click="onLogIn"
                class="foot__button">
                Log In
        </button>
        <button @click="onSignUp"
                class="foot__button primary">
                Sign Up
        </button>
      </template>
    </div>

  </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { localStorageMixin } from '../mixins'
import { wordCount } from '../filters'

export default {
  name: 'foot',

  props: ['activeNote', 'user'],

  mixins: [localStorageMixin],

  data: () => ({
    messages: [
      'I don\'t paint things, I paint the difference between things.',
      'Good artists borrow, great artists steal.',
      'Have no fear of perfection – you\'ll never reach it.',
      'Simplicity is the ultimate sophistication.',
      'This is your moment of glory.'
    ]
  }),

  methods: {
    ...mapActions(['LOG_OUT_USER']),
    ...mapMutations(['SET_QUERY',
                     'SET_RESULT_INDEX',
                     'SET_NOTES',
                     'SET_ACTIVE_NOTE',
                     'SET_ACTIVE_KEY'
    ]),
    
    onLogOut () {
      this.SET_QUERY('')
      this.SET_RESULT_INDEX(-1)
      this.SET_NOTES([])
      this.SET_ACTIVE_NOTE(null)
      this.SET_ACTIVE_KEY(null)

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    onSignUp() {
      this.$router.push({ name: 'signup'})
    },

    onLogIn () {
      this.$router.push({ name: 'login'})
    },

    randomMessage () {
      const to = 0
      const from = this.messages.length - 1
      const index = Math.floor(Math.random() * (to - from + 1) + from)
      return this.messages[index]
    }
  }

}
</script>
