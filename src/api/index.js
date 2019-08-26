import axios from 'axios'
import qs from 'qs'
import { $Toast } from '../plugin/index'
import store from '../store/store'
import router from '../routers/router';

let toast = null;
// 请求拦截器 
axios.interceptors.request.use(config => {
    // 在请求发出之前进行一些操作

    // 配置token
    store.state.token ? (config.headers['token'] = store.state.token) : '';

    // 显示loding
    toast = $Toast({ txt: '加载中...', type: 'loading', mask: true, time: 0 });
    return config;
})
// 响应拦截器
axios.interceptors.response.use(resp => {
    // 在这里对返回的数据进行处理
    toast.hide();
    toast = null;

    // 如果code是-1，说明用户已注销或者token过期
    // 此时需要重新登录，并且还要清除本地缓存的信息
    if (resp.status == 200) {
        const { data } = resp;
        if (data.code == -1) {
            handleToken()
        }
    }

    return resp;
}, err => {
    toast.hide();
    toast = null;

    if (err.response.status === 401) {
        handleToken()
    }
})

function handleToken() {
    store.commit('setToken', '');
    window.localStorage.removeItem('token');

    $Toast({ txt: '登录失效，请重新登录', type: 'warn'});

    // 跳转至登录页
    router.push({
        path: '/login',
        query: {
            redirect: router.currentRoute.path
        }
    })
}

// 登录
export const Login = async (opt) => await axios.post('/api/login', qs.stringify(opt));

// 登出
export const Logout = async () => await axios.get('/api/logout');

// 获取首页数据
export const GetGoods = async () => await axios.get('/api/goods');