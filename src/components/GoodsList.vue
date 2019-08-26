<template>
    <div>
        <div class="item" v-for="item in goods" :key="item.id">
            <router-link :to="`/detail/${item.id}`">
                <div class="left">
                    <!-- 点击图片显示预览图 -->
                    <img :src="item.img" alt @click.stop.prevent="imgPreview(item.img)" />
                </div>
                <div class="right">
                    <div class="title">{{ item.title }}</div>
                    <div class="info">
                        <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
                        <span>{{ item.count }}人购买</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    props: ["goods"],
    computed: {
        ...mapGetters(['isLogin'])
    },
    methods: {
        ...mapMutations(['addToCart']),
        imgPreview(img) {
            this.$createImagePreview({
                imgs: [img]
            }).show();
        },
        addCart($event, item) {
            // 判断是否登录
            if (!this.isLogin) {
                this.$confirm({content: '未登录, 是否去登录？', icon: 'cubeic-wrong'}, (type) => {
                    if (type === 'confirm') this.$router.push({ name: 'login' })
                })
                return;
            }
            this.addToCart(item);

            // 将点击的元素派发出去
            this.$emit('addCart', $event.target);
        }
    },
}
</script>

<style lang="scss" scoped>
.item {
    padding: 10px;
    overflow: hidden;
    .left {
        width: 100px;
        float: left;
        img {
            width: 100%;
        }
    }
    .right {
        margin-left: 120px;
        text-align: left;
        .title {
            line-height: 30px;
        }
        .cubeic-add {
            font-size: 22px;
        }
    }
}
</style>