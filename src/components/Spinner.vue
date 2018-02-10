<template>
  <div class="spinner">
    <div class="icon icon--ei-spinner-2 icon--m">
      <div class="icon__spinner">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon__cnt" viewBox="0 0 50 50">
          <circle cx="25" cy="10" r="2"/>
          <circle opacity=".3" cx="25" cy="40" r="2"/>
          <circle opacity=".3" cx="32.5" cy="12" r="2"/>
          <circle opacity=".3" cx="17.5" cy="38" r="2"/>
          <circle opacity=".93" cx="17.5" cy="12" r="2"/>
          <circle opacity=".3" cx="32.5" cy="38" r="2"/>
          <circle opacity=".65" cx="10" cy="25" r="2"/>
          <circle opacity=".3" cx="40" cy="25" r="2"/>
          <circle opacity=".86" cx="12" cy="17.5" r="2"/>
          <circle opacity=".3" cx="38" cy="32.5" r="2"/>
          <circle opacity=".44" cx="12" cy="32.5" r="2"/>
          <circle opacity=".3" cx="38" cy="17.5" r="2"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
};
</script>

<style lang="scss">
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20vh;
  }
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
  .icon {
    position: relative;
    display: inline-block;
    width: 25px;
    height: 25px;
    overflow: hidden;
  }
  .icon__cnt {
    width: 100%;
    height: 100%;
    background: inherit;
    fill: palette(orange);
    pointer-events: none;
    transform: translateX(0);
  }
  .dark {
    .icon__cnt { fill: palette(blue); }
  }
  .icon--m {
    width: 50px;
    height: 50px;
  }
  .icon__spinner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .icon--ei-spinner .icon__spinner,
  .icon--ei-spinner-2 .icon__spinner {
    animation: spin 1s steps(12) infinite;
  }
</style>
