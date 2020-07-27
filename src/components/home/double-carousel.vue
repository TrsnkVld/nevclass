<template>
<el-row tag="section" class="doubleCarousel">
    <el-container v-if="type=='excursionsPage' || type=='servicesPage'">
        <h2 data-aos="fade-down" :data-aos-delay="200+itemsDelay" v-if="type=='servicesPage'" class="sectionTitle">{{ topTitle.text }}</h2>
        <el-col data-aos="fade-down" :data-aos-delay="(index+1)*150+itemsDelay" data-aos-anchor=".doubleCarousel" :span="24" :lg="{span: 12}" class="sliderWrap sliderWrap-single" v-for="(card, index) in data" :key="index">
            <router-link :to="(type=='excursionsPage') ? `/excursions/${card.CODE}` : `/services/${card.CODE}`">
                <h2 v-if="card.subtitle" class="sectionTitle">{{ card.subtitle }}</h2>
                <div class="sliderWrap-single__wrap">
                    <div class="img-wrap swiper-slide" v-lazy:background-image="setCardImage(card)">
                        <h3 class="swiper-slide__title">{{ card.NAME }}</h3>
                    </div>
                    <el-button v-if="type=='excursionsPage'" type="primary" class="el-button">от  {{parseInt(card.minPrice) | nf }} руб.</el-button>
                    <el-button v-else type="primary" class="el-button">от {{ parseInt(card.PRICE) | nf }} руб./час</el-button>
                </div>
            </router-link>
        </el-col>
    </el-container>

    <el-container v-if="type=='homePage'">
        <el-col :span="24" :lg="{span: 12}" class="sliderWrap" v-for="card in data" :key="card.id">
            <h2 class="sectionTitle">{{ card.title }}</h2>
            <swiper :options="typesSwiperOption" @slideChange="changeSwiperIndex" ref="nevSwiper">
                <swiper-slide class="img-wrap" v-for="item in card.cards" :key="item.id">
                    <h3 class="swiper-slide__title">{{ item.title }}</h3>
                </swiper-slide>
            </swiper>
            <el-button type="primary" class="el-button--nav">
                <div class="swiper-button-prev"></div>от 300 руб./час<div class="swiper-button-next"></div>
            </el-button>
        </el-col>
    </el-container>
</el-row>
</template>

<script>
export default {
    name: 'double-carousel',
    data: () => ({
        typesSwiperOption: {
            slidesPerView: 1,
            navigation: {
                nextEl: `.swiper-button-next`,
                prevEl: '.swiper-button-prev',
            },
        },
        servicesSwiperOption: {
            slidesPerView: 1,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
        events: [{
                id: "1",
                title: "Кейтеринг",
                price: "от 200 руб./час",
            },
            {
                id: "2",
                title: "Кейтеринг2",
                price: "от 300 руб./час",
            },
            {
                id: "3",
                title: "Кейтеринг3",
                price: "от 400 руб./час",
            },
        ],
    }),
    props: {
        type: {
            type: String,
            default: ''
        },
        data: {
            type: Array,
            default: function () {return []}
        },
        topTitle: {
            type: Object,
            default: function () {
                return {}
            }
        },
        itemsDelay: {
            type: Number,
            default: 0
        }
    },
    methods: {
        changeSwiperIndex() {
            //console.log(this.$refs.nevSwiper.swiper.activeIndex);
        },

        setCardImage(card) {
            return card.imageOptimized || card.image;
        }
    },

    computed: {
        image() {
			if ( this.shipData.imagesOptimized && this.shipData.imagesOptimized.length ) return this.shipData.imagesOptimized.slice(0, 4);
			return (this.shipData.images && this.shipData.images.length > 4) ? this.shipData.images.slice(0, 4) : this.shipData.images;
		}
    }

}
</script>

<style lang="less">
@import "../../less/variables";

.doubleCarousel {
    //padding: 0 10px 70px;
    //padding: 0 10px 0;
    padding-top: 35px;

    .el-container {
        flex-flow: wrap;
        justify-content: center;
        padding: 0;

        &>h2 {
            width: 100%;
            padding-top: 0;
        }

        .up(@lg; {
                margin: 0 -10px;
                padding: 0 20px;
            }

        );
    }

    .swiper {
        &-slide {
            overflow: hidden;
            padding: 0;
            background-image: url('../../assets/img/wedding.jpg');
            background-size: cover;
            background-position: center;

            &__title {
                //height: 100%;
                box-sizing: border-box;
                position: absolute;
                width: 100%;
                text-align: center;
                bottom: 80px;
                left: 0;
                z-index: 1;
                color: @white;

                .up(@sm; {
                        //padding-top: 37%;
                    }

                );
            }

            &::after {
                display: block;
                content: '';
                width: 100%;
                padding-top: 50%;
                background: linear-gradient(180deg, rgba(0, 16, 33, 0) 50.52%, #001021 100%);
                transition: .2s;
                border-radius: 20px;

                .down(@xs; {
                        padding-top: 100%;
                    }

                );

                .up(@sm; {
                        padding-top: 50%;
                    }

                );
            }

            &:first-child {
                border-radius: 20px 0 0 20px;
            }

            &:last-child {
                border-radius: 0 20px 20px 0;
            }
        }

        &-container {
            border-radius: 20px;
            //padding: 0 20px;
            box-sizing: border-box;
        }
    }

    .sectionTitle {
        padding-bottom: 35px;

        .up(@sm; {
                padding-bottom: 75px;
            }

        );
    }

    .el-col {
        padding: 0 20px;
        margin-bottom: 70px;

        .up(@sm; {
                margin-bottom: 110px;
            }

        );

        .up(@lg; {
                padding: 0 10px;
            }

        );
    }

    .up(@sm; {
            padding-top: 75px;
        }

    );

    .up(@lg; {
            display: flex;
            justify-content: center;
            align-items: center;
        }

    );
}

.sliderWrap {
    position: relative;

    .el-button {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 5;
        width: auto;
    }

    &-single {

        .sectionTitle {
            padding: 0 0 40px 0;

            .up(@sm; {
                    padding: 0 0 80px 0;
                    //padding-top: 30px;
                    //padding-bottom: 60px;
                }

            );
        }

        &__wrap {
            cursor: pointer;

            .img-wrap {
                border-radius: 20px !important;
                height: auto;

                &::before {
                    display: block;
                    content: "";
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: @active;
                    opacity: 0;
                    z-index: 1;
                    transition: .2s;
                    border-radius: 20px;
                }
            }

            &:hover {
                .img-wrap::before {
                    opacity: .5;
                }

                .img-wrap::after {
                    opacity: .5;
                }

                .el-button {
                    box-shadow: 0px 10px 10px rgba(0, 21, 53, 0.15);
                }
            }
        }
    }
}
</style>
