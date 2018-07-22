<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="activeName" @click="activeClick">
            <van-tab title="买入">
                <children-index :activeName="activeName" :dataList="dataList"></children-index>
            </van-tab>
            <van-tab title="卖出">
                <children-index :activeName="activeName" :dataList="dataList"></children-index>
            </van-tab>
            
        </van-tabs>

        <van-row class="bottom-tabs">
            <van-col :class="{on: orderType==='current'}" span="6"><van-button @click="goOrderList('current')">当前委托</van-button></van-col>
            <van-col :class="{on: orderType==='deal'}" span="6"><van-button @click="goOrderList('deal')">历史委托</van-button></van-col>
            <van-col span="6"><van-icon name=""></van-icon></van-col>
        </van-row>
        <div class="bottom-list" :class="{buyClass: activeName===0, sellClass: activeName===1}">
            <van-row v-for="(item, index) in currentList" :key="index">
                <van-col class="first" span="10">
                    <p><span class="speci1">卖出</span><span class="speci2">EOS 1159.65</span></p>
                    <p><span>委托价格</span><span class="speci3">QC 55.17</span></p>
                </van-col>
                <van-col class="second" span="11">
                    <p><span>成交数量</span><span class="speci4">EOS 1159.65</span></p>
                    <p><span>成交价格</span><span class="speci4">QC 55.170</span></p>
                </van-col>
                <van-col class="third" span="3">06:26<br>16:17</van-col>
            </van-row>
        </div>
        
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

    import { buySellList, currentOrder, dealOrder } from '@/service/getData'

    export default {
        data() {
            return {
                activeName: 0,
                buySellType: 'buy',
                dataList: [],
                currentList: [],
                accessToken: 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4MnlFMjFuTGFjQlBpamlHOEpENkR6K0ZYNGo3TTJlS0svc2tsaEJMRVFKbEVvTG1ab1RsbHo5S2Z1ZElRT3dwT1FQNnR1blZXblpydFJNcCs0b2pVRHN4c3E5eWhybnVnYUNyMG1va0NySFZQVzJ3S2ZGVGFRWWczblZqS2MxWEtOMGplUm55OVZIa1lzPQ==',
                assetId: this.$route.params.id,
                orderType: 'current'
            }
        },
        components: {
            HeaderBar, FooterBar, ChildrenIndex
        },
        created() {
            this.getList()
            this.getCurrentList()
        },
        methods: {

            goOrderList(type) {
                console.log(type)
                this.orderType = type
                this.$emit('orderChange', type)
            },
            activeClick(index, title) {
                this.activeName = index
                this.orderType = 'current'
                if(this.activeName === 1) {
                    this.buySellType = 'sell'
                }else {
                    this.buySellType = 'buy'
                }
                this.getList()
                this.getCurrentList()
            },
            async getList() {                
                let data = await buySellList(this.accessToken, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.dataList = data.data
                }
            },
            async getCurrentList() {
                let data = await currentOrder(this.accessToken, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },
            async getDealList() {
                let data = await dealOrder(this.accessToken, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },
            orderChange(type) {
                if(type === 'current') {
                    this.getCurrentList()
                }else {
                    this.getDealList()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .buy-sell {
        .van-tabs {
            // margin-bottom: 50px;
        }
        /deep/ .van-tabs__wrap {
            width: 50%;
            border-bottom: 1px solid #ddd;
        }
    }

    .bottom-tabs {
        margin-bottom: 60px;
        &.van-row {
            height: 50px;
            font-size: 14px;
            line-height: 50px;
            border-top: 1px solid #ddd;
            margin-bottom: 50px;
            background-color: white;
            button {
                border: none;
            }
        }
        .on {
            /deep/ .van-button__text {
                color: red;
            }
        }
    }
</style>
