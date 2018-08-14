<template>
    <div class="share-one">
        <img class="top-img" src="../../assets/share2.png" alt="">
        <div class="main-info">
            <p class="tip"></p>
            <p class="big-tip"></p>
            <p class="describe"></p>
            <van-button type="primary">立即获得</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }   
    }
</script>

<style lang="scss" scoped>
    .share-one {
        background: url('../../assets/shareBg.png') no-repeat top center;
        background-size: cover;
        .top-img {
            width: 100%;
            display: block;
            position: relative;
            z-index: 1;
        }
        .main-info {

        }
    }
</style>


