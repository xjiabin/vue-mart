import { Toast, Dialog } from 'cube-ui'
import Vue from 'vue'

Vue.use(Toast)


/**
 * 定义普通js可用的Toast弹框
 * @param {*} txt toast提示文本
 * @param {*} type toast类型
 * @param {*} time 时间
 */
export function $Toast({ txt, type = 'correct', mask = false, time = 2000 }) {
    return Toast.$create({
        txt,
        type,
        mask,
        time,
    });
}
/**
 * 定义普通js可用的 Alert 弹框
 * @param {*} title 标题
 * @param {*} content 内容
 */
export function $Alert({ title='提示', content, icon='cubeic-alert' }) {
    return Dialog.$create({
        type: 'alert',
        title,
        content,
        icon
    }).show();
}
/**
 * 定义普通js可用的 Alert 弹框
 * @param {*} title 标题
 * @param {*} content 内容
 */
export function $Confirm({ title='提示', content, icon='cubeic-alert' }, callback) {
    return Dialog.$create({
        type: 'confirm',
        icon,
        title,
        content,
        confirmBtn: {
            text: '确定',
            active: true,
            href: 'javascript:;'
        },
        cancelBtn: {
            text: '取消',
            active: false,
            href: 'javascript:;'
        },
        onConfirm: () => {
            callback && callback('confirm')
        },
        onCancel: () => {
            callback && callback('cancel')
        }
    }).show()
}
