<template>
    <div>
        <k-header title="购物车"></k-header>

        <div class="good" v-for="(item,index) in cart" :key="item.id">
            {{ item.title }}
            <div class="right">
                <i class="cubeic-remove" @click="countMinus(index)"></i>
                <span>{{ item.count }}</span>
                <i class="cubeic-add" @click="countAdd(index)"></i>
            </div>
        </div>
        <div>总数量：{{ cartTotal }} &nbsp;&nbsp;&nbsp;&nbsp;总价：{{ total }}</div>

        <cube-button :disabled="true" v-if="total<minTotal">还差{{ minTotal - total }}可以购买</cube-button>
        <cube-button v-else>
            下单
            <span v-if="!token">(需要登录)</span>
        </cube-button>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            minTotal: 500,
        }
    },
    methods: {
        ...mapMutations(['countMinus', 'countAdd'])

    },
    computed: {
        ...mapState(['cart', 'token']),
        ...mapGetters(['total', 'cartTotal'])
    },
}
</script>

<style lang="scss" scoped>
.good {
    padding: 10px;
    text-align: left;
    .right {
        float: right
    }
    i {
        font-size: 18px
    }
}
</style>