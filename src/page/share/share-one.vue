<template>
    <div class="share-one">
        <img class="top-img" src="../../assets/share1.png" alt="">
        <div class="main-info">
            <p class="tip">现在加入即可获得</p>
            <p class="big-tip">1200TNW</p>
            <p class="describe">
                <strong v-if="msg!=='' && !!msg">邀请码：{{msg}}</strong> <br /> 让我们一起建设节点旅行, 开启旅行新玩法！
            </p>
            <van-button @click="goGet" class="bottom-btn" type="primary">立即获得</van-button>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Button } from 'vant'
    Vue.use(Button);
    export default {
        data() {
            return {
                msg: ''
            }
        },
        created() {
            if (process.env.NODE_ENV == 'development') {
                this.msg = this.$route.query.code
            }else if(process.env.NODE_ENV == 'production'){
                this.msg = this.$route.query.code
            }
        },
        methods: {
            goGet() {
                this.$router.push({
                    name: 'shareTwo'
                })
            }
        }   
    }
</script>

<style lang="scss" scoped>
    .share-one {
        min-height: 100%;
        background: url('../../assets/shareBg.png') no-repeat top center;
        background-size: cover;
        padding: 0 .3rem;
        padding-bottom: .45rem;
        .top-img {
            width: 100%;
            display: block;
            position: relative;
            z-index: 1;
            padding-top: .4rem;
        }
        .main-info {
            margin: 0 .15rem;
            background: url('../../assets/shareBg2.png') no-repeat top center;
            background-size: 100% 100%;
            text-align: center;
            padding-bottom: .75rem;
            margin-top: -.25rem;
            .tip {
                font-size: .24rem;
                color: #dba12b;
                padding: .8rem .35rem;
                &::after, &::before {
                    content: '';
                    display: inline-block;
                    position: relative;
                    background: url('../../assets/share2.png') no-repeat center center;
                    background-size: 100%;
                    width: 55px;
                    height: .2rem;
                }
                &::before {
                    margin-right: .2rem;
                }
                &::after {
                    margin-left: .2rem;
                }
            }
            .big-tip {
                font-size: 1rem;
                color: #f16e6a;
            }
            .describe {
                font-size: .24rem;
                color: #f9ddaf;
                margin: 1.25rem .5rem;
                line-height: .5rem;
                >strong {
                    font-size: .36rem;
                }
            }
            .bottom-btn {
                font-size: .36rem;
                color: #ec4742;
                width: 5.4rem;
                height: .9rem;
                border-radius: .45rem;
                display: inline-block;
                line-height: .9rem;
                background-color: #efd7a6;
                border: 0;
            }
        }
    }
</style>


