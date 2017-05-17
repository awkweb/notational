<template>
  <div
  class="field__group"
  :class="{ active: isActive }"
  @click="onClick">
  <label class="field__group__label">{{ name }}</label>

  <input
  v-if="type === 'password'"
  v-focus="autofocus"
  class="field__group__input" 
  :placeholder="placeholder"
  :autofocus="autofocus"
  :value="value"
  @input="onInput($event.target.value)"
  @focus="isActive = true"
  @blur="isActive = false"
  type="password"
  spellcheck="false">
  <input
  v-else
  v-focus="autofocus"
  class="field__group__input" 
  :placeholder="placeholder"
  :autofocus="autofocus"
  :value="value"
  @input="onInput($event.target.value)"
  @focus="isActive = true"
  @blur="isActive = false"
  type="text"
  spellcheck="false">

</div>
</template>

<script>
  export default {
    name: 'field',

    props: [
    'name',
    'value',
    'type',
    'placeholder',
    'autofocus'
    ],

    data: () => ({
      isActive: false
    }),

    methods: {
      onClick () {
        const input = this.$el.children[1]
        input.focus()
      },

      onInput (value) {
        this.$emit('input', value)
      }
    }

  }
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';
  @import '../scss/_mixins.scss';

  .field {
    &__group {
      display: flex;
      flex-direction: column; 
      flex: 1;
      margin-bottom: 10px;
      @include border(palette(gray, light));
      box-shadow: $box-shadow;
      padding: {
        bottom: 6px;
        right: 10px;
        left: 10px;
        top: 6px;
      }
      transition: border-color $transition;

      &.active {
        border-color: palette(orange);
      }

      &__label {
        color: palette(black);
        font: {
          family: $sans-serif;
          size: .8rem;
          weight: 500;
        }
        margin-bottom: 1px;
        transition: color $transition;
      }

      &__input {
        border: 0;
        padding: 0;
        color: palette(black);
        background-color: transparent;
        font: {
          family: $sans-serif;
          size: 1rem;
        }
        outline: 0;

        &::placeholder {
          color: palette(gray);  
          transition: color $transition;
        }
      }
    }
  }

  .dark .field {
    &__group {
      @include border(palette(dark, light));

      &.active {
        border-color: palette(blue);
      }

      &__label {
        color: palette(white);
      }

      &__input {
        color: palette(white);

        &::placeholder {
          color: palette(dark, x-light);  
        }
      }
    }
  }
</style>
