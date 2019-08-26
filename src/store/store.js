import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: JSON.parse(window.localStorage.getItem('token')) || '',
        cart: JSON.parse(window.localStorage.getItem('cart')) || []
    },
    getters: {
        isLogin: state => !!state.token,
        cartTotal: state => {
            let num = 0;
            state.cart.forEach(v => {
                num += v.count;
            });
            return num;
        },
        total: state => state.cart.reduce((num, v) => num += v.count * v.price, 0)
    },
    mutations: {
        setToken: (state, token) => {
            state.token = token
        },
        addToCart: (state, item) => {
            // 查找购物车中是否有该商品
            const good = state.cart.find(v => v.id === item.id);

            if (good) { // 有 商品数量 +1
                good['count'] += 1;
            } else { // 没有 添加1件商品
                state.cart.push({
                    ...item,
                    count: 1
                })
            }
        },
        countMinus: (state, index) => {
            const good = state.cart[index];
            if (good.count > 1) {
                good.count -= 1;
            } else {
                state.cart.slice(index, 1);
            }
        },
        countAdd: (state, index) => {
            const good = state.cart[index];
            good.count += 1;
        },
    },
    actions: {

    }
})

// 订阅 mutation 中数据的变化
store.subscribe((mutation, state) => {
    switch (mutation.type) {
        case 'setToken':
            window.localStorage.setItem('token', JSON.stringify(state.token));
            break;
        case 'addToCart':
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
            break;
    }
})

export default store
