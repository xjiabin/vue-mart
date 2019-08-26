<template>
    <div class="alert">
        <div class="alert-container" v-for="item in alerts" :key="item.id">
            <div class="alert-content">
                {{ item.content }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notice',
        data() {
            return {
                alerts: []
            }
        },
        created () {
            this.id = 0;
        },
        methods: {
            add(opt) {
                const id = 'id_' + (this.id++);
                const _alert = { ...opt, id: id }
                this.alerts.push(_alert);

                // 延迟关闭
                const duration = opt.duration || 2000;
                setTimeout(() => {
                    this.del(id);
                }, duration);
            },
            del(id) {
                for(let i = 0; i < this.alerts.length; i++) {
                    if (this.alerts[i].id === id) {
                        this.alerts.splice(i, 1);
                        break;
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.alert {
    width: 100%;
    position: fixed;
    top: 30px;
    left: 0;
    text-align: center;
    .alert-content {
        display: inline-block;
        padding: 8px;
        background-color: #fff;
        margin-bottom: 10px;
    }
}
</style>