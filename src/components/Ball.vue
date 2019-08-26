<template>
    <div class="ball-wrap">
        <transition
            mode="out-in"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
        >
            <div class="ball" v-show="ball.show">
                <div class="inner">
                    <div class="cubeic-add"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'ball',
    props: ['el'], // 将点击的加购按钮传递进来
    data() {
        return {
            ball: {
                // 购物车小球
                show: false, // 控制小球显示
                el: this.el // 点击的元素（商品中的“加号”元素）
            }
        };
    },
    methods: {
        start() { // 开启动画
            this.ball.show = true;
        },
        beforeEnter(el) {
            // 动画初始值的设置
            // 1. 获取dom坐标
            const dom = this.ball.el;
            const rect = dom.getBoundingClientRect();

            // 2. 计算点击坐标
            const x = rect.left - window.innerWidth / 2;
            const y = -(window.innerHeight - rect.top - 30);
            console.log(x, y);

            // 显示小球
            el.style.display = "block";
            // 设置动画起点位置
            // el.style.transform = `translate3d(${x}px, ${y}px, 0)`;

            // 抛物线动画
            // ball移动y
            el.style.transform = `translate3d(0, ${y}px, 0)`;

            // inner移动x
            const inner = el.querySelector('.inner');
            inner.style.transform = `translate3d(${x}px, 0, 0)`;

        },
        enter(el, done) {
            // 坑: 必须执行该代码触发重绘
            document.body.offsetHeight;

            el.style.transform = "translate3d(0, 0, 0)";
            const inner = el.querySelector('.inner');
            inner.style.transform = "translate3d(0, 0, 0)";

            el.addEventListener("transitionend", done);
        },
        afterEnter(el) {
            // console.log('afterEnter');
            this.ball.show = false;
            el.style.display = "none";

            // 派发动画结束事件
            this.$emit('transitionend');
        }
    }
};
</script>

<style lang="scss" scoped>
.ball-wrap {
    .ball {
        position: fixed;
        left: 50%;
        bottom: 10px;
        z-index: 100000;
        color: red;
        transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

        .inner {
            width: 16px;
            height: 16px;
            transition: all 0.5s linear;

            .cubeic-add {
                font-size: 22px;
            }
        }
    }
}
</style>