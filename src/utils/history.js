/**
 * 自定义History堆栈模式，用于页面顶部返回按钮的操作
 */
const History = {
    _history: [], // 历史记录(路径)堆栈

    /**
     * 提供给Vue注册使用的插件函数，用于获取 History 对象
     * this.$routerHistory => History
     * @param {*} Vue Vue实例
     */
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get() {
                return History; // 返回该 History
            }
        })
    },

    /**
     * 入栈操作(保存路径)
     * @param {*} path 历史纪录路径
     */
    push(path) {
        this._history.push(path);
    },

    /**
     * 出栈操作
     */
    pop() {
        this._history.pop();
    },

    /**
     * 是否可以返回
     * 当历史纪录堆栈中还有路径，则可以返回，否则不可返回
     */
    canBack() {
        return this._history.length > 1;
    }
}

export default History;
