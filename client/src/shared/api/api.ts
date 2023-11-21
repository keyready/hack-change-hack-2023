import axios from 'axios';
import { UserCookieJWT } from 'shared/const';
import Cookie from 'js-cookie';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${Cookie.get(UserCookieJWT)}` || '';
    }

    return config;
});
