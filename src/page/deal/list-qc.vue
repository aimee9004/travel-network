<template>
    <div class="list-qc">
        <header-bar :showHeadList="false"></header-bar>

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
                                    <p>量：{{getProperNum(item.dealCount)}}</p>
                                </van-col>
                            </van-row>
                        </van-col>
                        <van-col span="14">
                            <van-row type="flex" align="center">
                                <van-col span="16" class="align-r" :class="{'red-info': item.QCChange<0, 'green-info': item.QCChange>=0}">
                                    <h2>CEEC{{getProperNum(item.QCPrice)}}</h2>
                                    <p>¥{{getProperNum(item.HYDPrice)}}</p>
                                </van-col>
                                <van-col span="8" class="list-tip">
                                    <van-button :type="item.QCChange>=0?'primary':'danger'" size="small">{{Math.ceil(item.QCChange*100)/100}}%</van-button>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </div>
                <div class="outer-layer">
                    <!-- <img src="../../assets/linePic.png" alt=""> -->
                    <img :src="kChart" alt="">
                    <div class="layer">
                        <!-- <p>图表还在路上...</p> -->
                    </div>
                </div>
                <div class="buy-sell-btn">
                    <van-button type="default" plain @click="goDetail(item)">买入/卖出{{item.symbol}}</van-button>
                </div>
            </van-collapse-item>
        </van-collapse>
        <div class="explain">
            <h2>
                使用说明
            </h2>
            <p>
                1. 兑换功能是Travel Network（中文名称：节点旅行）为了解决旅行生态中，繁琐汇率而设计的一个极简汇率兑换功能，资产和信息存储在分布式数据库上面，交易通过转账形式实现，兑换功能只做撮合交易层服务，资产与交易引擎隔离。没有资产沉淀在兑换平台，避免挪用个人资产现象发生，请大家信任使用。
            </p>
            <p>
                2. 使用兑换功能服务无任何手续费产生。
            </p>
            <p>
                3. 使用兑换功能必须先完成实名认证。
            </p>
            <p>
                4. 钱包密码为六位数字，请妥善保管，如果丢失，钱包里的资产将无法找回。
            </p>
            <p>
                5. 如需开通更多兑换品种，请去旅行页面，话题板块，发起讨论，提出增加某个兑换品种的理由，开发方会看见您的建议并做出选择性的决定。
            </p>
        </div>
        
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
    import { getProperNum } from '@/config/mUtils'

    export default {
        data() {
            return {
                token: '',
                activeName: '',
                dataList: [],
                firstAssetId: '',       // 列表的第一条数据 id
                kChart: require('../../assets/linePic2.png'),
                getProperNum: getProperNum,
                timer: null
            }
        },
        components: {
            HeaderBar, FooterBar
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.firstAssetId = from.params.id
            })
        },
        beforeRouteLeave(to, from, next) {
            clearInterval(this.timer)
            next()
        },
        created() {
            this.$toast.loading({mask: true, message: '加载中...', duration: 0})
            // this.goTest()
            this.token = this.$route.query.token
            
            if (process.env.NODE_ENV == 'development') {
                this.token = 'c0RFeGNMcXBySDJkL2xmTjFSaUlTdjlNNlB0ZTV4MnlFd0dyMXhCUzRyWG1ncUN6Rlh4dlEvYnRqcThVaHNnazFEcmVydHM0akd5cFpCR2RMYjdTL2Z1ZElRT3dwT1FQOWlHYmVUcHYrc2JxeUVHTENoRjNmaHRSa1FxQnc1S3Z6R2FIN29jU1MrYmdwdGcvMENlSW4vU0FzazJUQ3FnTXN5Z3o5Wm5QSlBJPQ=='
            }else if(process.env.NODE_ENV == 'production'){
                if(!this.token) {
                    this.token = localStorage.getItem('token')
                }
            }
            
            localStorage.setItem('token', this.token)
            this.init()
        },
        methods: {
            init() {
                this.getList()
                this.timer = setInterval(() => {
                    this.getList()
                }, 10000)
            },
            async goTest(){
                let data = await testjj('123', '456');
                
                let data2 = await testjj2(0, 0)
            },
            async getList() {
                let data = await listQc(this.token)
                if(data.status===200) {
                    this.$toast.clear()
                    this.dataList = data.data
                    if(!this.firstAssetId) {
                        this.firstAssetId = this.dataList[0].id
                    }
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
    .list-qc {
        padding-bottom: 1rem;
    }
    .van-collapse {
        margin-top: .88rem;
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
                    // background: rgba(255, 255, 255, .5);
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
                // background-color: #0057ff;
                border: 1px solid #0057ff;
                color: #0057ff;
                border-radius: 5px;
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
    .explain {
        font-size: .26rem;
        background-color: white;
        padding: .3rem .2rem;
        text-align: left;
        >h2 {
            font-size: .36rem;
            font-weight: bold;
        }
        >p {
            margin: .2rem 0;
        }
    }
</style>
