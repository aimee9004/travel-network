<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="activeName" @click="activeClick">
            <van-tab title="买入">
                <children-index :activeName="activeName" :dataList="dataList"></children-index>
            </van-tab>
            <van-tab title="卖出">
                <children-index :activeName="activeName"></children-index>
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

    import { buyList } from '@/service/getData'

    export default {
        data() {
            return {
                activeName: 0,
                dataList: []
            }
        },
        components: {
            HeaderBar, FooterBar, ChildrenIndex
        },
        created() {
            this.getList()
        },
        methods: {
            activeClick(index, title) {
                this.activeName = index
                this.getList()
            },
            async getList() {
                let accessToken = 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4MnlFMjFuTGFjQlBpamlHOEpENkR6K0ZYNGo3TTJlS0svc2tsaEJMRVFKbEVvTG1ab1RsbHo5S2Z1ZElRT3dwT1FQNnR1blZXblpydFJNcCs0b2pVRHN4c3E5eWhybnVnYUNyMG1va0NySFZQVzJ3S2ZGVGFRWWczblZqS2MxWEtOMGplUm55OVZIa1lzPQ=='
                let assetId = this.$route.params.id
                let type = 'buy'
                if(this.activeName === 1) {
                    type = 'sell'
                }
                let data = await buyList(accessToken, assetId, type)
                if(data.status === 200) {
                    this.dataList = data.data
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .buy-sell {
        .van-tabs {
            margin-bottom: 50px;
        }
        /deep/ .van-tabs__wrap {
            width: 50%;
            border-bottom: 1px solid #ddd;
        }
    }
</style>
