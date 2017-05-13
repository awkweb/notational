<template>
  <div
    class="dropdown"
    v-click-outside="hideDropdown">
    <button
      @click="isActive = !isActive"
      class="button-icon user">
    </button>
    
    <ul
      v-show="isActive"
      class="dropdown__menu">
      <template v-if="user">
        <li @click="onUpgrade">Upgrade to Pro</li>
        <li @click="onLogOut">Log Out</li>
      </template>
      <template v-else>
        <li @click="onLogIn">Log In</li>
        <li @click="onSignUp">Sign Up</li>    
      </template>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../mixins'

export default {
  name: 'dropdown',

  mixins: [localStorageMixin],

  props: [
    'data'
  ],

  data: () => ({
    isActive: false
  }),

  computed: {
    ...mapGetters([
      'user',
      'activeNote',
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'RESET_APP',
      'LOG_OUT_USER',
    ]),

    hideDropdown () {
      this.isActive = false
    },

    onUpgrade () {
      this.hideDropdown()
    },

    onLogOut () {
      this.hideDropdown()
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    onSignUp() {
      this.$router.push({ name: 'signup' })
    },

    onLogIn () {
      this.$router.push({ name: 'login'})
    }
  }

}
</script>
