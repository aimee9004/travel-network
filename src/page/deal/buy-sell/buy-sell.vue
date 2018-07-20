<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="active" swipeable >
            <van-tab title="买入">
                买入11
                <children-index></children-index>
            </van-tab>
            <van-tab title="卖出">
                卖出22
                <children-index></children-index>
            </van-tab>
            
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

    import ChildrenIndex from './children/index'

    export default {
        data() {
            return {
                active: '1'
            }
        },
        components: {
            HeaderBar, FooterBar, ChildrenIndex
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .buy-sell {
        /deep/ .van-tabs__wrap {
            width: 50%;
            border-bottom: 1px solid #ddd;
        }
    }
</style>
