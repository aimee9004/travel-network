<template>
    <div>
        <header-bar></header-bar>

        <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item, index) in dataList" :key="index" :name="index" class="list-item">
                <div slot="title" @click="goDetail(item)">
                    <van-row>
                        <van-col span="10">
                            <van-row type="flex" align="center">
                                <van-col class="list-logo">
                                    <!-- <img src="@/assets/logo.png" alt=""> -->
                                    <img :src="item.icon_url" alt="">
                                </van-col>
                                <van-col class="col1" span="17">
                                    <h1>{{item.symbol}}</h1>
                                    <p>量：{{parseFloat(item.dealCount)}}</p>
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="14">
                            <van-row type="flex" align="center">
                                <van-col span="16" class="align-r">
                                    <h2>QC{{parseFloat(item.QCPrice)}}</h2>
                                    <p>¥{{parseFloat(item.HYDPrice)}}</p>
                                </van-col>
                                <van-col span="8" class="list-tip">
                                    <van-button type="primary" size="small">{{item.QCChange}}</van-button>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </div>
                <!-- 提供多样店铺模板，快速搭建网上商城 -->
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

    import { listQc, testjj, testjj2 } from '@/service/getData'

    export default {
        data() {
            return {
                activeName: '',
                dataList: []
            }
        },
        components: {
            HeaderBar, FooterBar
        },
        created() {
            // this.goTest()
            this.getList()
        },
        methods: {
            async goTest(){
                let data = await testjj('123', '456');
                
                let data2 = await testjj2(0, 0)
            },
            async getList() {
                let data = await listQc()
                if(data.status===200) {
                    this.dataList = data.data
                }
            },
            goDetail(item) {
                console.log(item)
                this.$router.push({
                    name: 'buySell',
                    params: {
                        id: item.id
                    },
                    query: {
                        price: parseFloat(item.QCPrice)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-item {
        /deep/ .van-cell {
            padding: 10px;
        }
        .van-col {
            >h1 {
                font-size: 18px;
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
            margin-right: 10px;
            >img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        /deep/ .van-collapse-item__content {
            padding: 0;
        }
    }
</style>
