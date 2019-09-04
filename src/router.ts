import Vue from "vue";
import Router from "vue-router";
import starshipPage from '@/views/starshipPage/index.vue';
import starshipsList from '@/views/starshipsList/index.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/starship/list',
        },
        {
            path: '/starship/list',
            name: 'list',
            component: starshipsList,
            props: (route) => ({ query: route.query.search || '' }),
        },
        {
            path: '/starship/item_:id',
            name: 'starship',
            component: starshipPage,
            props: (route) => ({ id: Number(route.params.id) }),
        },
    ],
});
