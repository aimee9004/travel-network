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

                <h2 class="title">QC 4.6488</h2>
                <p class="title-small">¥ 4.64</p>
                <van-cell-group>
                    <van-field class="input-class"
                        v-model="trustPrice"
                        clearable
                        placeholder="委托价格"
                    >
                        <span slot="button">QC</span>
                    </van-field>
                </van-cell-group>
                <p class="sub-title clear">折合CNY <span>¥ 0.00</span></p>
                <van-cell-group>
                    <van-field class="input-class"
                        v-model="trustNum"
                        clearable
                        placeholder="委托数量"
                    >
                        <span slot="button">ZB</span>
                    </van-field>
                </van-cell-group>
                <p class="sub-title clear">交易额 <span>0.00 QC</span></p>

                <van-button v-if='activeName===0' class="red-btn">买入 BTC</van-button>
                <van-button v-if='activeName===1' class="green-btn">卖出 BTC</van-button>

                <van-cell-group class="marginTB10">
                    <van-field class="input-class" :class="{colorRed: activeName===0, colorGreen: activeName===1}"
                        v-model="dealZb"
                        disabled
                        placeholder="可买ZB"
                    >
                        <span slot="button">0</span>
                    </van-field>
                </van-cell-group>
                <van-cell-group>
                    <van-field class="input-class" :class="{colorRed: activeName===0, colorGreen: activeName===1}"
                        v-model="dealQc"
                        disabled
                        placeholder="可用QC"
                    >
                        <span slot="button">0</span>
                    </van-field>
                </van-cell-group>

            </van-col>
            <van-col span="12" class="right-content">
                <van-row v-for="(item, index) in 10" :key="'green'+index" class="green-list">
                    <van-col class="first" span="10">
                        <span class="span-first">{{index+1}}</span>4.6732
                    </van-col>
                    <van-col class="second" span="14">
                        <span class="span-second"></span>30.34
                    </van-col>
                </van-row>

                <van-progress :percentage="20" :show-pivot="false" color="#f44"></van-progress>

                <van-row v-for="(item, index) in 10" :key="'red'+index" class="red-list">
                    <van-col class="first" span="10">
                        <span class="span-first">{{index+1}}</span>4.6732
                    </van-col>
                    <van-col class="second" span="14">
                        <span class="span-second"></span>30.34
                    </van-col>
                </van-row>
            </van-col>
        </van-row>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { Row, Col, Field, CellGroup, Button, Progress, Icon } from 'vant'
    Vue.use(Row).use(Col).use(Field).use(CellGroup)
    .use(Button).use(Progress).use(Icon)



    export default {
        props: {
            activeName: {
                type: Number,
                default: 0
            },
            dataList: {
                type: Array,
                default: function() {
                    return []
                }
            },
            currentList: {
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        data() {
            return {
                trustPrice: '',
                trustNum: '',
                dealZb: '可买ZB',
                dealQc: '可用QC',
            }
        },
        created() {
            
        },
        methods: {

        }   
    }
</script>

<style lang="scss" scoped>
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
        font-size: 15px;
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
            font-size: 20px;
            color: #f44;
        }
        .title-small {
            font-size: 14px;
            margin-bottom: 10px;
            color: #f44;
        }
        .left-content {
            padding: 10px;
            text-align: left;
            .sub-title {
                font-size: 14px;
                margin: 15px 0;
                >span {
                    float: right;
                    color: #f44;
                }
            }
            .van-button--default {
                width: 100%;
            }
            .red-btn {
                border: 1px solid #f44;
                /deep/ .van-button__text {
                    color: #f44;
                }
            }
            .green-btn {
                border: 1px solid rgb(0, 159, 80);
                /deep/ .van-button__text {
                    color: rgb(0, 159, 80);
                }
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
                font-size: 12px;
                &.first {
                    padding-right: 5px;
                    >span {
                        width: 18px;
                        height: 18px;
                        line-height: 18px;
                        color: white;
                        margin-right: 5px;
                        // background-color: rgb(135, 217, 189);
                        border-radius: 5px;
                        display: inline-block;
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
                        height: 18px;
                        right: 0;
                        position: absolute;
                    }
                }
            }
            .van-progress {
                margin: 10px 5px 10px 0;
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
    .bottom-list {
        margin: 10px;
        .van-row {
            font-size: 12px;
            padding: 5px 10px;
            text-align: left;
            margin-bottom: 5px;
            background-color: white;
            border-bottom: 1px solid rgb(0, 159, 80);
            &:last-child {
                margin-bottom: 60px;
            }
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

