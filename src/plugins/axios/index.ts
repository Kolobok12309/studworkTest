import Vue, { ComponentOptions } from 'vue';
import { AxiosRequestConfig } from 'axios';

import MyAxiosClass from './class';

declare module 'vue/types/vue' {
    interface Vue {
        $Net: MyAxiosClass
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        $Net?: MyAxiosClass;
    }
}

declare global {
    interface Window {
        net: MyAxiosClass,
    }
}

const config:AxiosRequestConfig = {
    baseURL: 'https://swapi.co',
};

export const net = new MyAxiosClass(config);
window.net = net;

export default function(app: ComponentOptions<Vue>) {
    const key = '$Net';
    app[key] = net;

    Vue.use(() => {
        if (Vue.prototype.hasOwnProperty(key)) {
            return;
        }
        Object.defineProperty(Vue.prototype, key, {
            get() {
                return this.$root.$options[key];
            },
        });
    })
};
