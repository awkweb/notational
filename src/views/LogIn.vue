<template>
  <div id="login" class="auth">
    <h1 class="auth__title text-center">Notational Velocity</h1>
    
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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'login',

  data: () => ({
  	email: null,
  	password: null,
  }),

  computed: {
    ...mapGetters([
        'user',
    ])
  },

  methods: {
  	onLogIn () {
      if (this.email != null && this.password != null) {
        const vm = this;
        const data = {
          email: this.email,
          password: this.password,
        }
        vm.$store.dispatch('LOG_IN_USER', data).then(() => {
          vm.$store.dispatch('FETCH_NOTES', vm.user.uid).then(() => {
            vm.$router.push({ name: 'main'})
          })
        })
      } 
  	},
  },

}
</script>
