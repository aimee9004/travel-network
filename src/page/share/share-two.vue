<template>
    <div class="share-one">
        <img class="logo" src="../../assets/share-two2.png" alt="">
        <p class="describe">节点旅行是基于 MiXinNetwork开发的一款旅行生态社群平台, 通过底层协议链接资源方与消费者。</p>
        <div class="middle-info">
            <div>
                <div>
                    <p class="total-title">平台总收益</p>
                    <p class="total-price">6970.000</p>
                    <ul class="middle-ul clear">
                        <li>
                            <p class="first">已分配</p>
                            <p class="second">3033.267</p>
                        </li>
                        <li>
                            <p class="first">即将分配</p>
                            <p class="second">1073.335</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h1 class="title-cn">节点旅行</h1>
        <p class="title-en">Travel Network</p>
        <div class="bottom-btn-div">
            <a href="https://www.travel-network.xin/attachment/mixin/app/tnw-release_latest.apk" download="travel-network">iPhone版下载</a>
            <a href="javascript:;" @click="getAndroid">Android版下载</a>
        </div>
        <p class="bottom-info">人人参与, 人人共享</p>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Button, Toast } from 'vant'
    Vue.use(Button).use(Toast);
    export default {
        data() {
            return {

            }
        },
        methods: {
            getAndroid() {
                Toast('即将上线，敬请期待...')
            }
        }   
    }
</script>

<style lang="scss" scoped>
    .share-one {
        text-align: center;
        background: white url('../../assets/share-twoBg.png') no-repeat center -1.3rem;
        background-size: 100% 100%;
        min-height: 100%;
        .logo {
            width: .85rem;
            height: .85rem;
            margin: .8rem 0 .25rem;
        }
        .describe {
            font-size: .24rem;
            color: white;
            padding: 0 .75rem;
        }
        .middle-info {
            border-radius: .1rem;
            margin: 0 1.75rem;
            background-color: white;
            padding: .35rem .15rem;
            margin-top: .45rem;
            >div {
                background: url('../../assets/share-twoBg2.png') no-repeat top center;
                background-size: 100%;
                padding-bottom: 2rem;
                >div {
                    -webkit-transform: scale(0.7,0.7);
                    -moz-transform: scale(0.7,0.7);
                    -o-transform: scale(0.7,0.7);
                    transform: scale(0.7,0.7);
                    .total-title {
                        font-size: .2rem;
                        color: white;
                        margin-bottom: .3rem;
                        padding-top: .2rem;
                    }
                    .total-price {
                        font-size: .4rem;
                        color: white;
                        margin-bottom: .3rem;
                    }
                    .middle-ul {
                        >li {
                            color: white;
                            float: left;
                            width: 50%;
                            p.first {
                                font-size: .2rem
                            }
                            p.second {
                                font-size: .3rem;
                            }
                        }
                    }
                }
            }
        }
        .title-cn {
            font-size: .32rem;
            margin-top: .6rem;
        }
        .title-en {
            font-size: .24rem;
            margin: .1rem 0 .5rem;
        }
        .bottom-btn-div {
            >a {
                width: 3rem;
                height: .88rem;
                line-height: .88rem;
                border-radius: .15rem;
                font-size: .28rem;
                color: white;
                background-color: black;
                display: inline-block;
                &+a {
                    background-color: blue;
                    margin-left: .3rem;
                }
            }
        }
        .bottom-info {
            font-size: .24rem;
            margin-top: .9rem;
            padding-bottom: .5rem;
        }
    }
</style>


