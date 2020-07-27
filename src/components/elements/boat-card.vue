<template>
    <div class="boatCard"> <!-- @mouseleave="setDefaultImage" -->
        <div class="boatCard__labels">
            <span v-if="shipData.HOT" class="label label-yellow">- {{shipData.HOT}} %</span>
            <span v-if="shipData.IS_HIT" class="label label-green">ХИТ!</span>
        </div>
        <router-link :to="clickRoute" class="boatCard__img">
            <swiper class="boatCard__img-container" :options="swiperOption">
                <swiper-slide class="boatImg"
                              v-for="(img, index) in shipImages"
                              :key="index"
                              :data-background="img"
                              :class="{ 'boatImg-active': activeImage === index, 'swiper-lazy': true }"
                >
                    <div class="swiper-lazy-preloader"></div>
                </swiper-slide>
            </swiper>
            <div class="swiper-pagination" :class="`swiper-pagination-${ind}`"></div>
            <div class="custom-pagination" @mouseleave="setDefaultImage">
                <div class="custom-pagination-block"
                     :class="{ 'custom-pagination-block-active': activeImage === index }"
                     v-for="(imageSrc, index) in shipImages"
                     :key="index"
                     @mouseover="showImage(index)"> <!-- product.images.slice(0, 8) -->
                    <div class="custom-pagination-block__bullet"></div>
                </div>
            </div>
            <h3 class="boatCard__name">{{shipData.NAME}}</h3>
        </router-link>
        <div class="wrap">
            <div class="boatCard__info">
                <span class="label rent-people"><span>до {{shipData.CAPACITY}} чел.</span></span>
                <span class="label rent-tables"><span>{{`${shipData.TABLES} ${num2str(shipData.TABLES, ['стол', 'стола', 'столов'])}`}}</span></span>
            </div>
            <div class="boatCard__info">
                <span :class="{'none': !shipData.WITH_TOILET}" class="label"
                      :title="shipData.WITH_TOILET  ? 'Есть туалет' : 'Туалет отсутсвует'"
                      :style="{ backgroundImage: `url('${require(`../../assets/icons/rent_wc_icon.svg`)}')` }"></span>
                <span :class="{'none': !shipData.WITH_MUSIC}" class="label"
                      :title="shipData.WITH_MUSIC  ? 'Есть музыкальное оборудование' : 'Музыкальное оборудование отсутсвует'"
                      :style="{ backgroundImage: `url('${require(`../../assets/icons/rent_music_icon.svg`)}')` }"></span>
                <span :class="{'none': !shipData.WITH_WIFI}" class="label"
                      :title="shipData.WITH_WIFI  ? 'Есть Wi-Fi' : 'Wi-Fi отсутсвует'"
                      :style="{ backgroundImage: `url('${require(`../../assets/icons/rent_wifi_icon.svg`)}')` }"></span>
                <span :class="{'none': !shipData.WITH_DINNER}" class="label"
                      :title="shipData.WITH_DINNER  ? 'Есть кейтеринг' : 'Кейтеринг отсутсвует'"
                      :style="{ backgroundImage: `url('${require(`../../assets/icons/rent_catering_icon.svg`)}')` }"></span>
            </div>
            <div class="boatCard__load" v-if="cardNoLoad == false">
                <h6>Загрузка на неделю</h6>
                <div class="congestion">
                    <span v-for="(day, index) in weekdays" :key="index" :class="loadColor(day.value)"
                          :title="loadTitle(day.value)">{{day.name}}</span>
                </div>
            </div>
            <slot>
                <router-link :to="{name: 'ship', params: {code: shipData.CODE},	hash: '#info'}">
                    <el-button type="primary">от {{price | nf}} руб./час</el-button>
                </router-link>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'boat-card',
        components: {},
        props: {
            cardNoLoad: {
                type: Boolean,
                default: false,
            },
            name: {
                type: String,
                default: 'Теплоход',
            },
            images: Array,
            info: Array,
            labels: Array,
            tables: Number,
            capacity: Number,
            ind: Number,
            shipData: Object,
            to: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                swiperOption: {
                    //effect: 'fade',
                    pagination: {
                        el: `.swiper-pagination-${this.ind}`,
                    },
                    slidesPerView: "auto",
                    // Disable preloading of all images
                    preloadImages: false,
                    // Enable lazy loading
                    lazy: true,
                    watchSlidesVisibility: true,
                    /*
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    speed: 500,
                    */
                },
                activeImage: 0,
                imageIndex: '',
                isActive: false,
                weekdays: [
                    {
                        id: 1,
                        name: 'пн',
                        value: 0,
                    },
                    {
                        id: 2,
                        name: 'вт',
                        value: 0,
                    },
                    {
                        id: 3,
                        name: 'ср',
                        value: 0,
                    },
                    {
                        id: 4,
                        name: 'чт',
                        value: 0,
                    },
                    {
                        id: 5,
                        name: 'пт',
                        value: 0,
                    },
                    {
                        id: 6,
                        name: 'сб',
                        value: 0,
                    },
                    {
                        id: 7,
                        name: 'вс',
                        value: 0,
                    }
                ]
            }
        },
        computed: {
            clickRoute() {
                if (this.to) return this.to;
                return {name: 'ship', params: {code: this.shipData.CODE}};
            },
            shipImages() {
                if (this.shipData.imagesOptimized && this.shipData.imagesOptimized.length) return this.shipData.imagesOptimized.slice(0, 4);
                return (this.shipData.images && this.shipData.images.length > 4) ? this.shipData.images.slice(0, 4) : this.shipData.images;
            },
            tariffsFilter() {
                return this.$store.state.tariffsFilter.times
            },
            price() {
                return parseInt(this.shipData.minPrice)
            }
        },
        methods: {
            mouseOver: function () {
                this.active = !this.active;
            },

            num2str(n, text_forms) {
                n = Math.abs(n) % 100;
                var n1 = n % 10;
                if (n > 10 && n < 20) {
                    return text_forms[2];
                }
                if (n1 > 1 && n1 < 5) {
                    return text_forms[1];
                }
                if (n1 == 1) {
                    return text_forms[0];
                }
                return text_forms[2];
            },

            showImage(imageIndex) {
                this.activeImage = imageIndex;
            },
            /* TODO: Проверить и убрать, если не нужно
                    days(){
                        for (let [key, value] of Object.entries(this.shipData.days)) {
                            this.weekdays[key-1].value = value;
                            //console.log(`${key}  ---  ${value}`);
                        }
                    },
                    */

            loadColor(booked) {
                if (booked > 1) return 'red';
                else if (booked < 1) return 'green';
                return 'yellow';
            },

            loadTitle(booked) {
                if (booked > 1) return 'Почти всё занято';
                else if (booked < 1) return 'Минимальная';
                return 'Средняя';
            },

            setDefaultImage() {
                this.activeImage = 0;
            }
        }
    }
</script>

<style lang="less">
    @import "../../less/variables";

    .custom-pagination {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        z-index: 6;
        display: none;
        flex-direction: row;
        justify-content: center;

        &-block {
            position: relative;
            width: 50px;
            height: 100%;
            margin-right: 20px;

            &-active {
                .custom-pagination-block__bullet {
                    &:before {
                        opacity: 1;
                    }
                }
            }

            &__bullet {
                position: absolute;
                width: 100%;
                height: 43px;
                bottom: 0;
                z-index: 6;

                &:before {
                    content: '';
                    position: absolute;
                    display: block;
                    top: 0;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    margin: auto;
                    width: 100%;
                    border-radius: 100px;
                    height: 3px;
                    opacity: .25;
                    background-color: @white;
                    transition: all .3s ease;
                }
            }

            &:last-child {
                margin-right: 0;
            }
        }

        .up(@md; { display: flex; });
    }

    .boatCard {
        position: relative;
        overflow: hidden;
        transition: .3s;
        background-color: @white;
        z-index: 2;

        &__name {
            position: absolute;
            bottom: 60px;
            left: 0;
            width: 100%;
            color: @white;
            z-index: 5;
            pointer-events: none;
        }

        .wrap {
            padding: 30px 20px 40px;
            box-sizing: border-box;
            max-width: 280px;
            margin: 0 auto;
            box-sizing: content-box;

            .el-button {
                margin: 30px auto 0;
                display: block;
                width: 100%;
            }

            .up(@sm; { padding: 30px 40px 40px; });
        }

        &__labels {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            pointer-events: none;

            .up(@sm; { top: 0; left: 0; });
        }

        &__img {
            overflow: hidden;
            position: relative;
            cursor: pointer;
            display: block;

            .swiper-pagination {
                top: auto;
                bottom: 0;
                padding: 25px 0;
                position: absolute;
                width: 100%;

                &-bullet {
                    border-radius: 100px;
                    margin: 0 10px;
                    height: 3px;
                    opacity: .25;
                    width: 50px;
                    background: white;
                    box-shadow: none;

                    &-active {
                        opacity: 1;
                    }

                    &:nth-child(5) {
                        display: none;
                    }
                }

                .up(@md; { display: none; });
            }

            &-container {
                height: 100%;
                width: 100%;
                position: absolute !important;
                top: 0;
                left: 0;

                .boatImg {
                    flex-shrink: 0;
                    height: 100%;
                    width: 100%;
                    background-size: cover;
                    background-position: center;
                    opacity: 1;
                    transition: .2s;
                    top: 0;
                    left: 0;
                    padding: 0;

                    .up(@md; { position: absolute; opacity: 0; });

                    &-active {
                        opacity: 1;
                    }
                }

                .up(@sm; { border-radius: 20px 20px 0 0; });
            }

            &::after {
                display: block;
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(180deg, rgba(0, 21, 53, 0) 58.23%, rgba(0, 21, 53, 0.75) 100%);
                z-index: 4;
                pointer-events: none;
            }

            &::before {
                content: "";
                display: block;
                padding-top: 75%;
                width: 100%;
            }

            .imgWrap {
                position: relative;
            }

            img {
                position: absolute;
                top: 50%;
                left: 50%;
                height: 100%;
                transform: translate(-50%, -50%);
            }

            .swiper {
                &-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }

        &__info {
            display: flex;
            flex-flow: wrap;
            justify-content: space-between;
            align-items: center;
            margin: 0 -15px;

            .label {
                min-width: 40px;
                height: 40px;
                margin: 10px 15px;
                padding: 7px 0 11px 40px;
                font-weight: normal;
                background-position: left center;
                background-repeat: no-repeat;
                background-image: url("../../assets/icons/rent_people_icon.svg");

                span {
                    //padding-right: 15px;
                    width: 87px;
                    text-align: left;
                    display: inline-block;
                }

                &.rent-tables {
                    background-image: url("../../assets/icons/rent_tables_icon.svg");
                }

                &.rent-wc {
                    background-image: url("../../assets/icons/rent_wc_icon.svg");
                }

                &.rent-music {
                    background-image: url("../../assets/icons/rent_music_icon.svg");
                }

                &.rent-wifi {
                    background-image: url("../../assets/icons/rent_wifi_icon.svg");
                }

                &.rent-catering {
                    background-image: url("../../assets/icons/rent_catering_icon.svg");
                }

                &.none {
                    opacity: .3;
                }
            }

            &:first-child {
                margin: 0 -10px;

                .label {
                    margin: 10px;
                }
            }
        }

        &__load {
            padding: 30px 0 10px;
            margin: 0 -10px;
        }

        &.active {
            box-shadow: 0px 10px 10px rgba(0, 21, 53, 0.08);
        }

        &:hover {
            box-shadow: 0px 20px 20px rgba(0, 21, 53, 0.12);
        }

        .el-button {
            padding: 13px 30px 17px;
        }

        .up(@sm; { border-radius: 20px; });

    }

    .congestion {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //margin-top: 15px;
        flex-flow: wrap;
        justify-content: space-between;

        div {
            display: flex;
        }

        span {
            font-size: 20px;
            line-height: 25px;
            text-align: center;
            margin: 20px 10px 0;

            &::before {
                content: "";
                display: block;
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }

            &.green {
                &::before {
                    background-color: @success;
                }
            }

            &.yellow {
                &::before {
                    background-color: @warning;
                }
            }

            &.red {
                &::before {
                    background-color: @danger;
                }
            }
        }
    }

</style>