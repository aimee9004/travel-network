<template>
    <div class="buy-sell">
        <header-bar :headTitle="curInfo.symbol"></header-bar>

        <van-tabs v-model="activeName" @click="activeClick">
            <van-tab title="买入">
                <children-index :activeName="activeName" :deepData="deepData" :curInfo="curInfo" :percentageVal="percentageVal"></children-index>
            </van-tab>
            <van-tab title="卖出">
                <children-index :activeName="activeName" :deepData="deepData" :curInfo="curInfo" :percentageVal="percentageVal"></children-index>
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
                    <p><span class="speci1">卖出</span><span class="speci2">EOS {{getProperNum(item.depute_amount)}}</span></p>
                    <p><span>委托价格</span><span class="speci3">QC {{getProperNum(item.depute_price)}}</span></p>
                </van-col>
                <van-col class="second" span="11">
                    <p><span>成交数量</span><span class="speci4">EOS {{getProperNum(item.deal_amount)}}</span></p>
                    <p><span>成交价格</span><span class="speci4">QC {{getProperNum(item.deal_price)}}</span></p>
                </van-col>
                <van-col v-cloak v-if="orderType==='current'" class="third" span="3">{{timeProcess(item.created_time)}}</van-col>
                <van-col v-cloak v-if="orderType==='deal'" class="third" span="3">{{timeProcess(item.deal_time)}}</van-col>
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

    import { assetOrderDeepInfo, myCurOrders, myDealOrders, assetCurInfo } from '@/service/getData'
    import { getProperNum } from '@/config/mUtils'

    export default {
        data() {
            return {
                token: '',
                activeName: 0,
                buySellType: 'buy',
                deepData: {
                    sellList: [],
                    buyList: []
                },
                curInfo: {},
                currentList: [],
                assetId: '',
                orderType: 'current',
                percentageVal: 0,
                timer: null,
                getProperNum: getProperNum
            }
        },
        components: {
            HeaderBar, FooterBar, ChildrenIndex
        },
        beforeRouteUpdate (to, from, next) {
            this.assetId = to.params.id
            this.getCurrentList()
            this.getCurInfo()
            this.getDeepList()
            next()
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(this.timer)
            next()
        },
        created() {
            this.token = localStorage.getItem('token')
            this.assetId = this.$route.params.id

            this.loadProgress()

        },
        mounted() {

        },
        methods: {
            loadProgress(cb) {
                this.getCurrentList()
                this.getCurInfo()
                this.getDeepList()

                // loading progress
                setTimeout(() => {
                    this.cycleLoadingBar()
                }, 300)

                this.timer = setInterval(() => {
                    this.getCurInfo()
                    this.getDeepList()

                    this.cycleLoadingBar()

                }, 5000)
            },
            async getDeepList() {

                let buyList = await assetOrderDeepInfo(this.token, this.assetId, 'buy')
                let sellList = await assetOrderDeepInfo(this.token, this.assetId, 'sell')

                if(buyList.status === 200) {
                    this.deepData.buyList = buyList.data
                    let list = this.deepData.buyList
                    if(list.length <= 0) {
                        return
                    }
                    let max = +(list[0].amount)
                    this.deepData.buyMax = this.getMax(list, max)

                }
                if(sellList.status === 200) {
                    this.deepData.sellList = sellList.data
                    let list = this.deepData.sellList
                    if(list.length <= 0) {
                        return
                    }
                    let max = +(list[0].amount)
                    this.deepData.sellMax = this.getMax(list, max)
                }
            },
            async getCurInfo() {
                let curInfo = await assetCurInfo(this.token, this.assetId)
                if(curInfo.status === 200) {
                    if(!!curInfo.data) {
                        this.curInfo = curInfo.data
                        console.log('curInfo: ', this.curInfo)
                        this.curInfo.QCPrice = this.getProperNum(this.curInfo.QCPrice)
                        this.curInfo.HYDPrice = this.getProperNum(this.curInfo.HYDPrice)
                    }
                }
            },

            // 订单 当前 历史切换事件
            goOrderList(type) {
                console.log(type)
                this.orderType = type
                if(this.orderType === 'current') {
                    this.getCurrentList()
                }else {
                    this.getDealList()
                }
            },

            async getCurrentList() {
                let data = await myCurOrders(this.token, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },
            async getDealList() {
                let data = await myDealOrders(this.token, this.assetId, this.buySellType)
                if(data.status === 200) {
                    this.currentList = data.data
                }
            },

            // tabs 页签切换
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

            timeProcess(timestamp) {
                let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes();
                return M+D+'\n'+h+m;
            },
            getMax(list, initMax) {
                let max = initMax
                if(list.length > 1) {
                    for(let i = 1; i < list.length; i++) {
                        if(max < +list[i].amount) {
                            max = +list[i].amount
                        }
                    }
                    return max
                }
            },
            cycleLoadingBar() {
                let timerIn = setInterval(() => {
                    this.percentageVal++; 
                    // console.log(this.percentageVal); 
                    if (this.percentageVal == 100) { 
                        this.percentageVal = 0
                        clearInterval(timerIn); 
                    } 
                }, 50)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .buy-sell {
        .van-tabs {
            margin-top: .88rem;
            /deep/ .van-tabs__wrap {
                width: 50%;
                border-bottom: 1px solid #ddd;
                z-index: 0;
            }
            /deep/ .van-tab {
                font-size: .32rem;
            }
        }
    }

    .bottom-tabs {
        &.van-row {
            height: 1rem;
            font-size: 14px;
            line-height: 1rem;
            border-top: 1px solid #ddd;
            // margin-bottom: 50px;
            background-color: white;
            button {
                border: none;
            }
        }
        .on {
            /deep/ .van-button__text {
                color: #0057ff;
            }
        }
    }

    .bottom-list {
        margin: 10px;
        margin-bottom: 50px;
        .van-row {
            font-size: .24rem;
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
                    font-size: .34rem;
                    margin-right: 3px;
                }
                .speci2 {
                    font-size: .32rem;
                    color: #333;
                }
                .speci3 {
                    font-size: .3rem;
                    color: #333;
                    margin-left: 3px;
                }
                .speci4 {
                    font-size: .3rem;
                    // color: rgb(0, 159, 80);
                    margin-left: 3px;
                }
                &.second {
                    margin-top: .08rem;
                }
                &.third {
                    font-size: .24rem;
                    margin-top: .12rem;
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
