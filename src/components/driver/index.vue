<template lang="">
    <div id="guide" @click.prevent.stop="handleGuide">
         <img src="@/assets/guide.png" alt="" class="guide"></img>
    </div>
   
</template>
<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
// import { steps } from './steps'
// import i18n from '@/i18n'
export default {
    name: 'Guide',
    data() {
        return {
            driver: null,
            steps: null,
        }
    },
    mounted() {
        // setTimeout(() => {
        //     this.initDriver()
        // }, 1000)
        this.initDriver(),
            this.initSteps()
    },
    methods: {
        initDriver() {
            this.driver = new Driver({
                animate: false,
                opacity: 0.75,
                padding: 0,
                allowClose: true,
                overlayClickNext: false,          // Whether the click on overlay should move next
                doneBtnText: this.$t('driver.doneBtnText'),
                closeBtnText: this.$t('driver.closeBtnText'),
                stageBackground: '#ffffff',
                nextBtnText: this.$t('driver.nextBtnText'),
                prevBtnText: this.$t('driver.prevBtnText'),
            })
        },

        initSteps() {
            this.steps = [{
                element: '#guide',
                popover: {
                    title: this.$t('driver.guideBtn'),
                    // description: 'Body of the popover',
                    position: 'left'
                }
            },
            {
                element: '#language',
                popover: {
                    title: this.$t('driver.langBtn'),
                    // description: 'Body of the popover',
                    position: 'left'
                }
            },
            {
                element: '#hamburger',
                popover: {
                    title: this.$t('driver.hamburgerBtn'),
                    // description: 'Body of the popover',
                    position: 'bottom'
                }
            },
            ]
        },

        handleGuide() {
            this.driver.defineSteps(this.steps)
            this.driver.start()
        }
    },
    watch: {
        "$store.state.tab.lang": {
            handler: function (newVal) {
                // this.$nextTick(
                //     () => {
                //         this.initDriver()
                //     }
                // )
                this.initSteps()
                this.initDriver()
            }
        },
    },
}
</script>
<style lang="less" scoped>
.guide {
    width: 28px;
    height: 28px;
    margin-right: 10px;
    margin-top: 3px;
    vertical-align: middle;
}
</style>