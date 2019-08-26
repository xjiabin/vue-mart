<template>
    <div>
        <k-header title="个人中心"></k-header>

        <cube-button @click="clickHandler" v-if="!isLogin">去登录</cube-button>


    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters(['isLogin'])
        },
        methods: {
            clickHandler() {
                this.$router.push({ name: 'login' })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>