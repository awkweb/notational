export const utilsMixin = {
  methods: {
    selectElement (id) {
      return document.querySelector(`${id}`)
    }
  }
}