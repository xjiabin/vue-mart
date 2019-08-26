<template>
    <div>
        <h1>登录</h1>
        <cube-form
            :model="model"
            :schema="schema"
            @validate="handleValidate"
            @submit="handleLogin">
        </cube-form>

    </div>
</template>

<script>
    import { Login } from '@/api/index'

    export default {
        data() {
            return {
                model: {
                    name: '',
                    password: ''
                },
                schema: {
                    fields: [
                        {
                            type: 'input',
                            modelKey: 'name',
                            label: '用户名',
                            props: {
                                placeholder: '请输入用户名'
                            },
                            rules: {
                                required: true
                            },
                            trigger: 'blur',
                            messages: {
                                required: '用户名不能为空'
                            }
                        },
                        {
                            type: 'input',
                            modelKey: 'password',
                            label: '密码',
                            props: {
                                placeholder: '请输入密码',
                                type: 'password',
                                eye: { open: false },
                            },
                            rules: {
                                required: true
                            },
                            trigger: 'blur',
                            messages: {
                                required: '密码不能为空'
                            }
                        },
                        {
                            type: 'submit',
                            label: '登录'
                        }
                    ]
                }
            }
        },
        methods: {
            async handleLogin(e) {
                e.preventDefault();
                // console.log('登录');

                try {
                    const resp = await Login({
                        username: this.model.name,
                        password: this.model.password
                    });
                    if (resp) {
                        const { code, token, message } = resp.data;

                        if (code === 0) { // 登录成功
                            // 保存token
                            window.localStorage.setItem('token', token);
                            this.$store.commit('setToken', token);

                            // 设置回跳
                            let redirect = this.$route.query.redirect || '/';
                            this.$router.push(redirect);
                        } else {
                            this.$toast({txt: message, type: 'error'}).show();
                        }
                    }
                } catch (error) {
                    this.$toast({txt: error.toString(), type: 'error'}).show();
                }
            },
            handleValidate(res) {
                console.log(res);
            }
        },
    }
</script>

<style lang="scss" scoped>
h1 {
    padding: 20px 0;
    font-weight: bold;
    font-size: 32px;
}
</style>