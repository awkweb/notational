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
