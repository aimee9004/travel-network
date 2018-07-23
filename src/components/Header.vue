<template>
    <div>
        <van-nav-bar
            title="标题"
            left-text="返回"
            right-text="按钮"
            left-arrow
            @click-left="$router.go(-1)"
            @click-right="onClickRight"
        />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { NavBar } from 'vant'
    Vue.use(NavBar);
    export default {
        data() {
            return {

            }
        },
        methods: {   
            onClickRight() {
                
                let dd = {
                    "status":403,
                    "message":"请先登录！",
                    "data":""
                }
                // this.showLogin()
                android.toLogin(JSON.stringify(dd))
            },

            showLogin() {
                android.toLogin({a: '123'})
            }
        }
    }
</script>


