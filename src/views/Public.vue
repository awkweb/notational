<template>
  <div id="public"
       class="public">
    Hello, World.
  </div>
</template>

<script>
export default {
  name: 'public',

  data: () => ({
    loading: true
  }),

  created () {
    if (this.$route.params.id) {
      this.getNote()
    }
  },

  methods: {
    getNote () {
      alert(this.$route.params.id)
    }
  },

  watch: {
    '$route': 'getNote'
  },

  head: {
    title: {
      inner: 'Public Note'
    }
  }

}
</script>
