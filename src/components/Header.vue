<template>
    <div class="header">
        <van-nav-bar
            title="QC"
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
        >
            <div slot="title"> 
                <span class="type-btn" @click="goOpen">{{currentType}}
                    <van-icon :name="showSelType===true?'xiaosanjiaoup':'xiaosanjiaodown'"></van-icon>
                </span>    
                <div class="type-layer" v-if="showSelType">
                    <div class="type-info">
                        <span @click="goSelect(item)" v-for="(item, index) in dataList" :key="index">
                            <img :src="item.icon_url" alt="">
                            {{item.symbol}}
                        </span>
                    </div>
                </div>
            </div>
        </van-nav-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { NavBar, Icon } from 'vant'
    Vue.use(NavBar).use(Icon);

    import { listQc } from '@/service/getData'
    export default {
        data() {
            return {
                token: '',
                showSelType: false,
                dataList: [],
                currentType: 'QC'
            }
        },
        created() {
            this.token = localStorage.getItem('token')
            this.getList()
        },
        methods: { 
            async getList() {
                let data = await listQc(this.token)
                if(data.status===200) {
                    this.dataList = data.data
                }
            }, 
            goOpen() {
                if(this.showSelType) {
                    this.showSelType = false
                }else {
                    this.showSelType = true
                }
            },
            goSelect(item) {
                // console.log(item)
                this.showSelType = false
                this.currentType = item.symbol
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
    .header {
        /deep/ .van-nav-bar {
            z-index: 5 !important;
            position: fixed;
            top: 0;
            width: 100%;
        }
        /deep/ .van-nav-bar__title {
            max-width: 100%;
        }
        .type-btn {
            display: inline-block;
            padding: 0 20px;
            .van-icon {
                top: -5px;
            }
        }
        .type-layer {
            width: 100%;
            height: 100vh;
            border-bottom: 1px solid #ddd;
            background: rgba(0,0,0,.5);
            .type-info {
                background-color: white;
                padding: 30px 20px;
                // white-space: normal;
                // word-break: break-word;
                // text-overflow: initial;
                // text-align: left;    
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                >span {
                    display: inline-block;
                    font-size: 14px;
                    text-align: center;
                    margin: 0 15px;
                    >img {
                        display: block;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>


