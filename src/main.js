import 'element-ui/lib/theme-chalk/display.css';
import 'swiper/dist/css/swiper.css';
import './plugins/element.js';	
import './plugins/vue-lazyload.js';	
import './plugins/vue-check-view.js';
import './scss/aos.scss'
import './scss/index.scss';
import './less/index.less';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import Mapbox from 'mapbox-gl-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueScrollTo from 'vue-scrollto';
import inViewportDirective from 'vue-in-viewport-directive';
import AOS from 'aos';
import vueMixins from '@/utils/vueMixins';
import vueFilters from '@/utils/vueFilters.js';

Vue.config.productionTip = false;

Vue.directive('in-viewport', inViewportDirective);
Vue.use(VueAwesomeSwiper);
Vue.use(VueScrollTo);
Vue.use(vueFilters);
Vue.mixin(vueMixins);

Vue.component('loading',{ template: '<h1>Loading!</h1>'});

// @see https://github.com/chrisvfritz/prerender-spa-plugin#tips--troubleshooting
const root = new Vue({
	created() {
		AOS.init({
			//startEvent: 'OnMapLoad',
			disable: false,
			useClassNames: false,
			duration: 800,
			offset: 0,
			once: true,
			mirror: false,
		});
	},
	mounted() {
		//document.querySelector('header .el-container').classList.add('aos-init');
	},
    components: {
		'mapbox': Mapbox,
    },
	router,
	store,
	render: h => h(App)
});
root.$mount('#app');
document.addEventListener('DOMContentLoaded', function () {
  root.$mount('#app')
})