import Button from './components/button.vue';
import Editable from './components/editable.vue';
import Grid from './components/grid.vue';

const button = Button;
const editable = Editable;
const grid = Grid;

define("vue-components", ["vue"], Vue => {
	Vue.component('btn', button);
	Vue.component('editable', editable);
	Vue.component('grid', grid);
});
