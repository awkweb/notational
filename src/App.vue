<template>
  <div id="app"
  	   :class="theme">
   	<router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',

  computed: {
    ...mapGetters(['theme'])
  }
}
</script>