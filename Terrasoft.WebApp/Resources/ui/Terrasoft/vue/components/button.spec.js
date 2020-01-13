import Vue from 'vue';
import Button from './button.vue';

describe('Button tests', () => {
	it('when mount components than display correct caption', () => {
		const Constructor = Vue.extend(Button);
		const vm = new Constructor({
			propsData: {
				caption: "test caption"
			}
		}).$mount();
		expect(vm.$el.textContent).toBe("test caption");
	})
});