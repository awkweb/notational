import Vue from 'vue'

Vue.directive('focus', {
	inserted: function (el, binding) {
		if (binding.value) {
			el.focus()			
		}
	}
});

Vue.directive('click-outside', {
	bind: function (el, binding, vnode) {
		el.event = function (event) {
			if (!(el == event.target || el.contains(event.target))) {
				vnode.context[binding.expression](event)
			}
		}
		document.body.addEventListener('click', el.event)
	},
	unbind: function (el) {
		document.body.removeEventListener('click', el.event)
	}
});