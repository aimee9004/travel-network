<template>
    <div class="buy-sell">
        <header-bar></header-bar>

        <van-tabs v-model="activeName" @click="activeClick">
            <van-tab title="买入">
                <children-index :activeName="activeName" :deepData="deepData" :curInfo="curInfo"></children-index>
            </van-tab>
            <van-tab title="卖出">
                <children-index :activeName="activeName" :deepData="deepData" :curInfo="curInfo"></children-index>
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
                    <p><span>成交数量</span><span class="speci4">EOS {{parseFloat(item.deal_amount)}}</span></p>
                    <p><span>成交价格</span><span class="speci4">QC {{parseFloat(item.deal_price)}}</span></p>
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

    import { buySellList, currentOrder, dealOrder, assetCurInfo } from '@/service/getData'

    export default {
        data() {
            return {
                activeName: 0,
                buySellType: 'buy',
                deepData: {},
                curInfo: {},
                currentList: [],
                assetId: this.$route.params.id,
                orderType: 'current'
            }
        },
        components: {
            HeaderBar, FooterBar, ChildrenIndex
        },
        created() {
            this.getCurrentList()
        },
        mounted() {
            this.getList()
        },
        methods: {

            goOrderList(type) {
                console.log(type)
                this.orderType = type
                if(this.orderType === 'current') {
                    this.getCurrentList()
                }else {
                    this.getDealList()
                }
            },
            activeClick(index, title) {
                this.activeName = index
                this.orderType = 'current'
                if(this.activeName === 1) {
                    this.buySellType = 'sell'
                }else {
                    this.buySellType = 'buy'
                }
                this.getCurrentList()
            },
            async getList() {                
                let buyList = await buySellList(this.GLOBAL.token, this.assetId, 'buy')
                let sellList = await buySellList(this.GLOBAL.token, this.assetId, 'sell')
                let curInfo = await assetCurInfo(this.GLOBAL.token, this.assetId)
                if(buyList.status === 200) {
                    this.deepData.buyList = buyList.data
                }
                if(sellList.status === 200) {
                    this.deepData.sellList = sellList.data
                }
                if(curInfo.status === 200) {
                    this.curInfo = curInfo.data
                }
                console.log(this.deepData)
            },
            async getCurrentList() {
                let data = await currentOrder(this.GLOBAL.token, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },
            async getDealList() {
                let data = await dealOrder(this.GLOBAL.token, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },
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
        &.van-row {
            height: 50px;
            font-size: 14px;
            line-height: 50px;
            border-top: 1px solid #ddd;
            // margin-bottom: 50px;
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
    
    .bottom-list {
        margin: 10px;
        margin-bottom: 50px;
        .van-row {
            font-size: 12px;
            padding: 5px 10px;
            text-align: left;
            margin-bottom: 5px;
            background-color: white;
            border-bottom: 1px solid rgb(0, 159, 80);
            .van-col {
                >p {
                    >span {
                        color: rgb(183, 183, 183);
                    }
                }
                .speci1 {
                    // color: rgb(0, 159, 80);
                    font-size: 16px;
                    margin-right: 3px;
                }
                .speci2 {
                    font-size: 15px;
                    color: #333;
                }
                .speci3 {
                    font-size: 14px;
                    color: #333;
                    margin-left: 3px;
                }
                .speci4 {
                    font-size: 14px;
                    // color: rgb(0, 159, 80);
                    margin-left: 3px;
                }
                &.third {
                    text-align: right;
                    color: rgb(183, 183, 183);
                }
            }
        }
        &.buyClass {
            .van-row {
                border-bottom: 1px solid #f44;
                .van-col {
                    .speci1, .speci4 {
                        color: #f44;
                    }
                }
            }
        }
        &.sellClass {
            .van-row {
                border-bottom: 1px solid rgb(0, 159, 80);
                .van-col {
                    .speci1, .speci4 {
                        color: rgb(0, 159, 80);
                    }
                }
            }
        }
    }
</style>
