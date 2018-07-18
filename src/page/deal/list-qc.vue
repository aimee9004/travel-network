<template>
    <div>
        <header-bar></header-bar>

        <van-collapse v-model="activeName" accordion>
            <van-collapse-item name="1" class="list-item">
                <div slot="title">
                    <van-row>
                        <van-col span="10">
                            <van-row type="flex" align="center">
                                <van-col span="7" class="list-logo">
                                    <img src="@/assets/logo.png" alt="">
                                </van-col>
                                <van-col span="17">
                                    <h1>ZB</h1>
                                    <p>量：2381.67万</p>
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="14">
                            <van-row type="flex" align="center">
                                <van-col span="16" class="align-r">
                                    <h2>QC4.6488</h2>
                                    <p>¥4.6488</p>
                                </van-col>
                                <van-col span="8" class="list-tip">
                                    <van-button type="primary" size="small">-3.77%</van-button>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </div>
                提供多样店铺模板，快速搭建网上商城
            </van-collapse-item>
            <van-collapse-item title="有赞零售" name="2">
                网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失
            </van-collapse-item>
            <van-collapse-item title="有赞美业" name="3">
                线上拓客，随时预约，贴心顺手的开单收银
            </van-collapse-item>
        </van-collapse>

        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Collapse, CollapseItem, Row, Col, Button } from 'vant'
    Vue.use(Collapse).use(CollapseItem).use(Row).use(Col).use(Button);

    import HeaderBar from '@/components/Header'
    import FooterBar from '@/components/Footer'

    export default {
        data() {
            return {
                activeName: ''
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
    .list-item {
        .van-col {
            >h1 {

            }
            >h2 {
                color: green;
            }
            >p {
                font-size: 12px;
            }
        }
        /deep/ .van-cell__right-icon {
            font-size: 0;
            margin-left: 0;
        }
        .list-tip {
            margin-left: 5px;
            /deep/ .van-button__text {
                color: white;
            }
        }
        .list-logo {
            >img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>
