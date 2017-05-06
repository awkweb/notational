<template>
  <div id="profile"
       class="profile"
       :class="theme">
    <h1>Hello, Profile</h1>
  
    <div class="button-group">
      <button @click="onClickChangeTheme('light')"
              class="button">
        Light
      </button>
      <button @click="onClickChangeTheme('dark')"
              class="button">
        Dark
      </button>
    </div>

    <button @click="onLogOut"
            class="button">
      Log Out
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../../mixins'

export default {
  name: 'profile',

  mixins: [localStorageMixin],

  computed: {
    ...mapGetters([
      'user',
      'theme'
    ])
  },

  methods: {
    ...mapActions(['RESET_APP',
                   'LOG_OUT_USER',
                   'UPDATE_THEME'
    ]),
    
    onLogOut () {
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    onClickChangeTheme (theme) {
      if (this.theme !== theme) {
        this.UPDATE_THEME(theme)        
      }
    }
  }

}
</script>

