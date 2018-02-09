<template>
  <div id="notfound"
    class="notfound">
    <h1 class="notfound__headline">
      Looking for something?
    </h1>

    <h2 class="notfound__subline">
      Unfortunately it's not here. Good luck on your wanderings.
    </h2>

    <router-link :to="{ name: 'home'}"
      class="button primary large">
      Back to safety
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'notfound',
  head: {
    title: {
      inner: 'Merp! Not Found',
    },
  },
};
</script>

<style lang="scss">
  @import '../scss/_variables.scss';
  @import '../scss/_functions.scss';

  .notfound {
    margin: {
      top: 4rem;
    }
    &__headline {
      color: palette(black);
      font: {
        size: 2rem;
        weight: 700;
      }
      margin: {
        top: 0;
        bottom: .5rem;
      }
    }

    &__subline {
      color: palette(gray);
      font: {
        size: 1.5rem;
        weight: 500;
      }
      margin: {
        top: 0;
        bottom: 2rem;
      }
    }
    a { text-decoration: none; }
  }
</style>
