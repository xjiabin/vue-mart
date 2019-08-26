import Vue from 'vue';

function create(Component, props) {
    const instance = new Vue({
        render: h => h(Component, { props })
    }).$mount();

    document.body.appendChild(instance.$el);

    const component = instance.$children[0];
    component.remove = () => {
        // 销毁实例
        instance.$destroy();
        // 将元素从body中移除
        document.body.removeChild(instance.$el);
    }

    return component;
}

export default create;
