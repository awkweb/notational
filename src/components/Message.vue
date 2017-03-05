<template>
  <div class="message">
    <span class="text">{{ text }}</span>
    <span class="close"
          @click="closeMessage"></span>
  </div>
</template>

<script>
export default {
  name: 'message',

  props: ['text'],

  methods: {
    closeMessage () {
      this.$emit('closeMessage')
    }
  }

}
</script>
