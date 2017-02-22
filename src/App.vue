<template>
  <div id="app">
    <header>Hello, World!</header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  
  }
}
</script>
