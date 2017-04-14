<template>
	<div class="spinner">
		<div class="icon icon--ei-spinner-2 icon--m">
			<div class="icon__spinner">
				<img class="icon__cnt"
					 :src="`../assets/spinner-${theme}.svg`">
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'spinner',

	computed: {
    	...mapGetters(['theme'])
  	}
}
</script>