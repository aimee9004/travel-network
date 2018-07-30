<!-->dfdf<-->

<template>
    <div>
        <header>
            <span title="档位" class="first">档位</span>
            <span title="价格" class="second">价格</span>
            <span title="数量" class="third">数量</span>
        </header>

        <van-row class="middle-content">
            <van-col span="12" class="left-content">

                <h2 v-cloak class="title">QC {{curInfo.QCPrice}}</h2>
                <p class="title-small">¥ {{curInfo.HYDPrice}}</p>
                <van-cell-group>
                    <van-field class="input-class"
                        v-model="trustPrice"
                        clearable
                        placeholder="委托价格"
                    >
                        <span slot="button">QC</span>
                    </van-field>
                </van-cell-group>
                <p class="sub-title clear">折合CNY <span>¥ {{curInfo.HYDPrice}}</span></p>
                <van-cell-group>
                    <van-field class="input-class"
                        v-model="trustNum"
                        clearable
                        placeholder="委托数量"
                    >
                        <span slot="button">{{curInfo.symbol}}</span>
                    </van-field>
                </van-cell-group>
                <p class="sub-title clear">交易额 <span>{{getProperNum(+trustPrice*+trustNum)}} QC</span></p>

                <van-button @click="goBuy" type="danger" v-if='activeName===0'>买入 {{curInfo.symbol}}</van-button>
                <van-button @click="goSell" type="primary" v-if='activeName===1'>卖出 {{curInfo.symbol}}</van-button>

                <van-cell-group class="marginTB10">
                    <van-field v-if="!!curInfo.symbol" class="input-class" :class="{colorRed: activeName===0, colorGreen: activeName===1}"
                        :value="`可买${curInfo.symbol}`"
                        disabled
                    >
                        <span slot="button">{{curInfo.QCPrice===0?'--':getProperNum(curInfo.QCBalance/curInfo.QCPrice)}}</span>
                    </van-field>
                </van-cell-group>
                <van-cell-group>
                    <van-field class="input-class" :class="{colorRed: activeName===0, colorGreen: activeName===1}"
                        v-model="dealQc"
                        disabled
                        placeholder="可用QC"
                    >
                        <span slot="button">{{getProperNum(curInfo.QCBalance)}}</span>
                    </van-field>
                </van-cell-group>

            </van-col>
            <van-col span="12" class="right-content">
                <van-row v-for="(item, index) in deepData.sellList" :key="'green'+index" class="green-list">
                    <van-col class="first" span="10">
                        <span class="span-first">{{index+1}}</span>{{getProperNum(item.price)}}
                    </van-col>
                    <van-col class="second" span="14">
                        <span class="span-second" :style="{width: getProperNum(item.amount/deepData.sellMax*100)+'%'}"></span>{{getProperNum(item.amount)}}
                    </van-col>
                </van-row>

                <!-- <keep-alive> -->
                    <van-progress v-if="percentageVal>0 && (deepData.sellList.length>0 || deepData.buyList.length>0)" :percentage="percentageVal" :show-pivot="false" color="#f44"></van-progress>
                <!-- </keep-alive> -->

                <van-row v-for="(item, index) in deepData.buyList " :key="'red'+index" class="red-list">
                    <van-col class="first" span="10">
                        <span class="span-first">{{index+1}}</span>{{getProperNum(item.price)}}
                    </van-col>
                    <van-col class="second" span="14">
                        <span class="span-second" :style="{width: getProperNum(item.amount/deepData.buyMax*100)+'%'}"></span>{{getProperNum(item.amount)}}
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
<!-- :close-on-click-overlay="false"  -->
        <van-popup v-model="showPay" position="bottom"> 
            <iframe :src="newPayUrl"></iframe>
        </van-popup>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { Row, Col, Field, CellGroup, Button, Progress, Icon, Toast, Popup } from 'vant'
    Vue.use(Row).use(Col).use(Field).use(CellGroup)
    .use(Button).use(Progress).use(Icon).use(Toast).use(Popup)

    import { addBuy, addSell, paymentLink } from '@/service/getData'
    import { getProperNum } from '@/config/mUtils'

    export default {
        props: {
            activeName: {
                type: Number,
                default: 0
            },
            deepData: {
                type: Object,
                default: function() {
                    return {
                        sellList: [],
                        buyList: []
                    }
                }
            },
            curInfo: {
                type: Object,
                default: function() {
                    return {}
                }
            },
            percentageVal: {
                type: Number,
                default: 0
            }
        },
        computed: {
            
        },
        data() {
            return {
                token: '',
                trustPrice: '',
                trustNum: '',
                dealZb: '可买ZB',
                dealQc: '可用QC',
                assetId: this.$route.params.id,
                getProperNum: getProperNum,
                showPay: false,
                newPayUrl: ''
            }
        },
        created() {
            this.token = localStorage.getItem('token')
        },
        methods: {
            async goBuy() {
                let expPrice = /^[0-9]+([.]{1}[0-9]{1,6}){0,1}$/
                
                if(!this.trustPrice) {
                    Toast('价格不能为空')
                    return
                }
                if(!expPrice.test(this.trustPrice)) {
                    Toast('输入价格格式错误')
                    return
                }
                let expNum = /^([1-9][0-9]*)$/
                
                if(!this.trustNum) {
                    Toast('数量不能为空')
                    return
                }
                if(!expNum.test(this.trustNum)) {
                    Toast('输入数量格式错误')
                    return
                }
                this.getBuy()
            },
            async getBuy() {
                let data = await addBuy(this.token, this.assetId, this.trustPrice, this.trustNum)
                if(data.message !== '') {
                    Toast(data.message)
                }
            },

            goSell() {
                let expPrice = /^[0-9]+([.]{1}[0-9]{1,6}){0,1}$/
                
                if(!this.trustPrice) {
                    Toast('价格不能为空')
                    return
                }
                if(!expPrice.test(this.trustPrice)) {
                    Toast('输入价格格式错误')
                    return
                }
                let expNum = /^([1-9][0-9]*)$/
                
                if(!this.trustNum) {
                    Toast('数量不能为空')
                    return
                }
                if(!expNum.test(this.trustNum)) {
                    Toast('输入数量格式错误')
                    return
                }
                this.getSell()
            },
            async getSell() {
                let jsonStr = JSON.stringify({price: this.trustPrice})
                let memo = `以${this.trustPrice}QC的价格卖出${this.trustNum}${this.curInfo.symbol}`
                let data = await paymentLink(this.token, this.curInfo.asset2_uid, this.trustNum, memo, jsonStr)
                if(data.status === 200) {
                    this.newPayUrl = data.data
                    this.showPay = true
                    console.log('new pay url: ', this.newPayUrl)
                    // window.open(data.data,"_blank");
                }else {
                    Toast(data.message)
                }
            }
        }   
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .marginTB10 {
        margin: 10px 0;
    }
    .colorRed {
        /deep/ .van-field__control {
            color: #f44;
        }
        /deep/ .van-field__button {
            >span {
                color: #f44;
            }
        }
    }
    .colorGreen {
        /deep/ .van-field__control {
            color: rgb(0, 159, 80);
        }
        /deep/ .van-field__button {
            >span {
                color: rgb(0, 159, 80);
            }
        }
    }
    header {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 44px;
        font-size: .32rem;
        color: #9c9ea3;
        line-height: 44px;
        background-color: white;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
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
    .middle-content {
        background-color: white;
        .title {
            font-size: .36rem;
            color: #f44;
        }
        .title-small {
            font-size: .28rem;
            margin-bottom: 10px;
            color: #f44;
        }
        .left-content {
            padding: 10px;
            text-align: left;
            .sub-title {
                font-size: .24rem;
                margin: .18rem 0;
                >span {
                    float: right;
                    color: #f44;
                }
            }
            .van-button {
                width: 100%;
                height: .88rem;
                line-height: .86rem
            }
        }
        .right-content {
            border-left: 1px solid #ddd;
            padding: 10px 0 10px 5px;
            .van-row {
                margin: 5px 0;
                &.green-list {
                    .span-first {
                        background-color: rgb(135, 217, 189);
                    }
                    .span-second {
                        background-color: rgba(135, 217, 189, .5);
                    }
                }
                &.red-list {
                    .span-first {
                        background-color: #f44;
                    }
                    .span-second {
                        background-color: #f44;
                        opacity: .3;
                    }
                }
            }
            .van-col {
                font-size: .24rem;
                &.first {
                    padding-right: 5px;
                    text-align: left;
                    >span {
                        width: .33rem;
                        height: .33rem;
                        line-height: .33rem;
                        color: white;
                        font-size: .22rem;
                        margin-right: .2rem;
                        // background-color: rgb(135, 217, 189);
                        border-radius: 3px;
                        display: inline-block;
                        text-align: center;
                    }
                }
                &.second {
                    text-align: right;
                    padding-right: 10px;
                    color: rgb(154, 154, 154);
                    position: relative;
                    >span {
                        // background-color: rgba(135, 217, 189, .5);
                        display: inline-block;
                        width: 100%;
                        height: .33rem;
                        right: 0;
                        position: absolute;
                    }
                }
            }
            .van-progress {
                margin: 10px 5px 10px 0;
                height: 2px;
            }
        }
        .input-class {
            background-color: rgb(237, 241, 244);
            border-radius: 5px;
        }
        .van-hairline--top-bottom::after {
            border: 0;
        }
    }
    .bottom-tabs {
        &.van-row {
            height: 50px;
            font-size: 14px;
            line-height: 50px;
            border-top: 1px solid #ddd;
            margin-bottom: 10px;
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
    .van-popup--bottom {
        height: 75%;
        >iframe {
            height: 100%;
            border: none;
            width: 100%;
        }
    }
</style>

