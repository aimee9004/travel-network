<template>
    <div class="header">
        <van-nav-bar
            title="QC"
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
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

        }
    }
</script>

<style lang="scss" scoped>
    .header {
        /deep/ .van-nav-bar {
            z-index: 5;
            position: fixed;
            top: 0;
            width: 100%;
        }
    }
</style>


