<template>
     <div class="list">
        <van-row>
            <van-col>

            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { Row, Col, Icon } from 'vant'
    Vue.use(Row).use(Col).use(Icon)
    export default {
        data() {
            return {

            }
        }   
    }
</script>

<style lang="scss" scoped>
    .list {
        padding: 10px;
        .van-row {
            margin-bottom: 5px;
            border-bottom: 1px solid rgb(0, 159, 80)
        }
    }
</style>
