import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

import axiosPluginInit from '@/plugins/axios';

Vue.config.productionTip = false;

const app = {
    router,
    vuetify,
    render: (h: any) => h(App),
};

axiosPluginInit(app);

new Vue(app).$mount('#app');
