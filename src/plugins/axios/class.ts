import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class MyAxiosClass {
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);
    }

    _send(url: string, config?: AxiosRequestConfig) {
        return new Promise((res, rej) => {
            this.instance({
                url,
                ...config,
            }).then(response => {
                if (response && response.data) {
                    res(response.data);
                } else {
                    console.error(response);
                    rej(response);
                }
            })
            .catch((err) => {
                console.error = err;
                rej(err);
            });
        });
    }

    get(url: string, config?: AxiosRequestConfig) {
        return this._send(url, config);
    }
}