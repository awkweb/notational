<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="scss">
	@import './scss/_variables.scss';

	body {
		text-rendering: optimizeLegibility;
		background-color: palette(white);
		margin: 0;
	}

	#app {
		width: 100vw;
		font: {
			family: $sans-serif;
			size: 18px;
		}
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.text-center {
  	text-align: center;
	}
</style>