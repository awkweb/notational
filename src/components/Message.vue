<template>
  <div class="message">
    <span class="text">
      {{ text }}
    </span>

    <span
      class="close"
      @click="closeMessage"
    >
    </span>
  </div>
</template>

<script>
export default {
  name: 'message',
  props: ['text'],
  methods: {
    closeMessage() {
      this.$emit('closeMessage');
    },
  },
};
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';

  .message {
    border: {
      color: palette(blue);
      radius: $border-radius;
      style: solid;
      width: 1px;
    }
    box-shadow: $box-shadow;
    color: palette(blue);
    display: flex;
    font: {
      family: $sans-serif;
      size: .9rem;
      weight: 500;
    }
    justify-content: space-between;
    margin: {
      bottom: 1rem;
      left: 0;
      right: 0;
      top: 1rem;
    }
    padding: {
      bottom: .75rem;
      left: .75rem;
      right: .75rem;
      top: .75rem;
    }

    .text {
      flex: 1;
    }

    .close {
      background: {
        image: url("../assets/close.svg");
        position: 95%;
        repeat: no-repeat;
        size: 22px;
      }
      cursor: pointer;
      width: 22px;
    }
  }
</style>
