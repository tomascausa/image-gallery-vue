import Vue from 'vue';
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.min.css';
// import VueZoomer from 'vue-zoomer';

import App from './App.vue';
// import { routes } from './routes';
// import store from './store/store';

Vue.use(VueRouter);
Vue.use(Vuetify);
// Vue.use(VueZoomer)

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    el: '#app',
    router,
    store,
    vuetify: new Vuetify(),
    render: h => h(App)
})