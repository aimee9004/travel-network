<template>
    <div>
        <header-bar :dataList="dataList"></header-bar>

        <van-collapse v-model="activeName" accordion>
            <van-collapse-item v-for="(item, index) in dataList" :key="index" :name="index" class="list-item">
                <div slot="title">
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
                                <van-col span="16" class="align-r" :class="{'red-info': item.QCChange>=0, 'green-info': item.QCChange<0}">
                                    <h2>QC{{parseFloat(item.QCPrice)}}</h2>
                                    <p>¥{{parseFloat(item.HYDPrice)}}</p>
                                </van-col>
                                <van-col span="8" class="list-tip">
                                    <van-button v-if="item.QCChange<0" type="primary" size="small">{{item.QCChange}}%</van-button>
                                    <van-button v-if="item.QCChange>=0" type="danger" size="small">{{item.QCChange}}%</van-button>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </div>
                <div class="outer-layer">
                    <img src="../../assets/linePic.png" alt="">
                    <div class="layer"><p>图表还在路上...</p></div>
                </div>
                <div class="buy-sell-btn">
                    <van-button type="primary" @click="goDetail(item)">买入/卖出{{item.symbol}}</van-button>
                </div>
            </van-collapse-item>
        </van-collapse>
        
        <footer-bar :firstAssetId="firstAssetId"></footer-bar>

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
                token: '',
                activeName: '',
                dataList: [],
                firstAssetId: '',       // 列表的第一条数据 id
            }
        },
        components: {
            HeaderBar, FooterBar
        },
        created() {
            // this.goTest()
            this.token = this.$route.query.token
            let baseUrl = this.$route.query.apiUrl
            
            if (process.env.NODE_ENV == 'development') {
                this.token = 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4Mnk4UTNkQitIcnVVcFhjc0IxSFhMSEpkT3RHRzBTTUxDeWtsaEJMRVFKbEVvTG1ab1RsbHo5S2Z1ZElRT3dwT1FQbEFvVlJ4c0tpVHBEdXh5eXRabERqOXdob0ViRzhDS0ZTYVJYTlZadk9YVmVXTmtuK2NEWDdLQ1FBT1BXeGxFUDN6eW1Id0tZenNVPQ=='
            }else if(process.env.NODE_ENV == 'production'){
                if(!this.token) {
                    this.token = localStorage.getItem('token')
                }
                if(!baseUrl) {
                    baseUrl = localStorage.getItem('apiUrl')
                }
            }
            
            localStorage.setItem('token', this.token)
            localStorage.setItem('apiUrl', baseUrl)
            this.getList()
        },
        methods: {
            async goTest(){
                let data = await testjj('123', '456');
                
                let data2 = await testjj2(0, 0)
            },
            async getList() {
                let data = await listQc(this.token)
                if(data.status===200) {
                    this.dataList = data.data
                    this.firstAssetId = this.dataList[0].id
                    console.log('firstAssetId: ', this.firstAssetId)
                }
            },
            goDetail(item) {
                console.log(item)
                this.$router.push({
                    name: 'buySell',
                    params: {
                        id: item.id
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .van-collapse {
        margin-top: .88rem;
        margin-bottom: 1rem;
    }
    .list-item {
        /deep/ .van-cell {
            padding: 10px;
        }
        .van-col {
            >h1 {
                font-size: .32rem;
            }
            >h2 {
                // color: green;
                font-size: .32rem;
            }
            >p {
                font-size: .24rem;
            }
            &.red-info {
                >h2 {
                    color: #f44;
                }
            }
            &.green-info {
                >h2 {
                    color: green;
                }
            }
        }
        /deep/ .van-cell__right-icon {
            font-size: 0;
            margin-left: 0;
        }
        .list-tip {
            margin-left: .2rem;
            .van-button {
                color: white;
                font-size: .28rem;
            }
        }
        .list-logo {
            margin-right: .2rem;
            >img {
                width: .7rem;
                height: .7rem;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        /deep/ .van-collapse-item__content {
            padding: 0;
            .outer-layer {
                position: relative;
                >img {
                    width: 100%;
                    display: block;
                }
                .layer {
                    position: absolute;
                    background: rgba(255, 255, 255, .5);
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    top: 0;
                    text-align: center;
                    >p {
                        transform: translateY(-50%);
                        top: 50%;
                        position: relative;
                        font-size: .24rem;
                    }
                }
            }
            .van-button {
                margin-bottom: 20px;
                font-size: .28rem;
                line-height: .28rem;
                height: .74rem;
                width: 2.7rem;
                background-color: #0057ff;
                border: 1px solid #0057ff;
                margin-top: 20px;
                &+.van-button {
                    margin-left: 30px;
                }
            }
        }
        .buy-sell-btn {
            .van-button {
            }
        }
    }
</style>
