<template>
    <div class="footer">
        <van-tabbar v-model="active">
            <van-tabbar-item icon="market"
                :to="{ name: 'listQc' }"
            >
                <span>行情</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? marketIcon.active : marketIcon.normal"
                >
            </van-tabbar-item>
            <van-tabbar-item icon="cach"
                :to="{ name: 'buySell', params: {id: firstAssetId} }"
            >
                <span>现货</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? cachIcon.active : cachIcon.normal" alt="">
            </van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>
    import Vue from 'vue'
    import { Tabbar, TabbarItem } from 'vant'
    Vue.use(Tabbar).use(TabbarItem)
    export default {
        props: {
            firstAssetId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                active: 0,
                marketIcon: {
                    normal: require('@/assets/marketNo.png'),
                    active: require('@/assets/marketSel.png')
                },
                cachIcon: {
                    normal: require('@/assets/cachNo.png'),
                    active: require('@/assets/cachSel.png')
                }
            }
        },
        mounted() {
            let curName = this.$route.name
            if(curName === 'buySell') {
                this.active = 1
            }else {
                this.active = 0
            }
        },
        methods: {    

        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        .van-tabbar {
            height: 1rem;
        }
        /deep/ .van-tabbar-item {
            font-size: .22rem;
        }
    }
</style>


