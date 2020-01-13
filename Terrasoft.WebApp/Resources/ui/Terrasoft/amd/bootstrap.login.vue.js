import Vue from 'vue'
import VueResources from 'vue-resource'
import LoginApp from '@/amd/login/vue/LoginApp.vue'

Vue.use(VueResources);

const root = document.createElement("div");
document.body.appendChild(root);

new Vue({
	el: root,
	render: h => h(LoginApp)
});