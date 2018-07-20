<!-->dfdf<-->

<template>
    <div>
        <header>
            <span title="档位" class="first">档位1</span>
            <span title="价格" class="second">价格</span>
            <span title="数量" class="third">数量</span>
        </header>
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
    header {
        display: inline-block;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 44px;
        font-size: 15px;
        line-height: 44px;
        background-color: white;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        .first {
            float: left;
            margin-left: 20px;
        }
        .second {
            float: left;
            margin-left: 15px;
        }
        .third {
            float: right;
            margin-right: 20px;
        }
    }
</style>

