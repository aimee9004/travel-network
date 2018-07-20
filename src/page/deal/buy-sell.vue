<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="active" swipeable >
            <van-tab title="买入">
                买入
                <header>
                    <span title="档位" class="first">档位1</span>
                    <span title="价格" class="second">价格</span>
                    <span title="数量" class="third">数量</span>
                </header>
            </van-tab>
            <van-tab title="卖出">
                卖出
                <header>
                    <span title="档位" class="first">档位2</span>
                    <span title="价格" class="second">价格</span>
                    <span title="数量" class="third">数量</span>
                </header>
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
        /deep/ .van-tabs__wrap {
            width: 50%;
        }
        header {
            display: inline-block;
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 44px;
            font-size: 15px;
            line-height: 44px;
            background-color: white;
            .first {
                float: left;
                margin-left: 20px;
            }
            .second {
                float: left;
                margin-left: 15px;
            }
            .third {
                float: right;
                margin-right: 20px;
            }
        }
    }
</style>
