<template>
    <div>
        <header-bar></header-bar>

        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { NavBar } from 'vant'
    Vue.use(NavBar);

    import HeaderBar from '@/components/Header'
    import FooterBar from '@/components/Footer'

    export default {
        data() {
            return {

            }
        },
        components: {
            HeaderBar, FooterBar
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>

</style>
