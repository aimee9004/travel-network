<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="active" swipeable :swipe-threshold="5">
            <van-tab title="买入">
                买入
            </van-tab>
            <van-tab title="卖出">
                卖出
            </van-tab>
            <van-tab title="档位" :disabled="true">档位</van-tab>
            <van-tab title="价格" :disabled="true">价格</van-tab>
            <van-tab title="数量" :disabled="true">数量</van-tab>
        </van-tabs>
        
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Tab, Tabs } from 'vant'
    Vue.use(Tab).use(Tabs);

    import HeaderBar from '@/components/Header'
    import FooterBar from '@/components/Footer'

    export default {
        data() {
            return {
                active: '1'
            }
        },
        components: {
            HeaderBar, FooterBar
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .buy-sell {
        
    }
</style>
