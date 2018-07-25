<template>
    <div class="header">
        <van-nav-bar
            title="QC"
            left-text="返回"
            left-arrow
            @click-left="$router.go(-1)"
        >
            <div slot="title"> 
                <span class="type-btn" @click="goOpen">QC
                    <van-icon :name="showSelType===true?'xiaosanjiaoup':'xiaosanjiaodown'"></van-icon>
                </span>    
                <div class="type-layer" v-if="showSelType">
                    <div class="type-info">
                        <span @click="goSelect(item)" v-for="(item, index) in 13" :key="index">TNW/QC{{index}}</span>
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
    export default {
        data() {
            return {
                showSelType: false
            }
        },
        methods: {  
            goOpen() {
                if(this.showSelType) {
                    this.showSelType = false
                }else {
                    this.showSelType = true
                }
            },
            goSelect(item) {
                console.log(item)
                this.showSelType = false
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
                white-space: normal;
                word-break: break-word;
                text-overflow: initial;
                >span {
                    &+span {
                        margin-left: 20px;
                    }
                }
            }
        }
    }
</style>


