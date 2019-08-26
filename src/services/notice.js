import Vue from 'vue';
import Notice from '@/components/Notice.vue';

Notice.getInstance = props => {
    const instance = new Vue({
        render: h => h(Notice, { props })
    }).$mount();

    document.body.appendChild(instance.$el);

    const component = instance.$children[0];

    return component;
}

let msgInstance = null;
function getInstance() {
    msgInstance = msgInstance || Notice.getInstance();

    return msgInstance;
}

export default {
    info({ content = '', duration = 2000 }) {
        getInstance().add({
            content, duration
        })
    }
}