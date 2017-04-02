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
      inner: 'Merp! Not Found'
    }
  }

}
</script>

