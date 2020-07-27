<template>
    <el-row ref="excursWrap" class="excursionExpandedWrap" :class="`excursionExpandedWrap-${index}`">
        <el-col class="excursionInfo" :span="24" :lg="{span: 12, offset: 12}">
            <h2>
                <div class="excursionInfo__icon" v-html="data.icon"></div>
                {{ data.title }}
                <div class="close" @click="onItemClick">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M49.7069 0.292894C49.3164 -0.0976298 48.6832 -0.0976298 48.2927 0.292895L0.295009 48.2907C-0.0955151 48.6813 -0.0955142 49.3144 0.29501 49.7049C0.685534 50.0955 1.3187 50.0955 1.70922 49.7049L49.7069 1.70711C50.0974 1.31658 50.0974 0.683419 49.7069 0.292894Z"
                              fill="white"/>
                        <path d="M0.294846 0.292893C0.685371 -0.0976311 1.31854 -0.0976311 1.70906 0.292893L49.7067 48.2907C50.0972 48.6813 50.0972 49.3144 49.7067 49.7049C49.3162 50.0955 48.683 50.0955 48.2925 49.7049L0.294846 1.70711C-0.095678 1.31658 -0.095678 0.683418 0.294846 0.292893Z"
                              fill="white"/>
                    </svg>
                </div>
            </h2>
            <el-row tag="ul" class="itemsList">
                <el-col tag="li" :span="24" :sm="{span: 12}" class="itemsList__item">
                    <i class="icon icon-calendarBlack"></i>
                    <p class="itemsList__item-text">
                        <span><b>Ближайший рейс</b></span>
                        <span>{{early}}</span>
                    </p>
                </el-col>
                <el-col tag="li" :span="24" :sm="{span: 12}" class="itemsList__item">
                    <i class="icon icon-markerBlack"></i>
                    <p class="itemsList__item-text">
                        <span><b>Причал</b></span>
                        <span>{{data.prichal}}</span>
                    </p>
                </el-col>
                <el-col tag="li" :span="24" :sm="{span: 12}" class="itemsList__item">
                    <i class="icon icon-timeBlack"></i>
                    <p class="itemsList__item-text">
                        <span><b>Продолжительность</b></span>
                        <span>{{duration}}</span>
                    </p>
                </el-col>
                <el-col tag="li" :span="24" :sm="{span: 12}" class="itemsList__item">
                    <i class="icon icon-shipBlack"></i>
                    <p class="itemsList__item-text">
                        <span><b>Теплоход</b></span>
                        <span>{{data.ship}}</span>
                    </p>
                </el-col>
            </el-row>
            <div class="excursionAbout">
                <div v-html="data.programText"></div>
                <router-link :to="{name: 'excursion', params: {code: data.code}}">Подробнее</router-link>
            </div>
            <div class="excursionPurchase">
                <router-link :to="{name: 'excursion', params: {code: data.code},	hash: '#form'}">
                    <el-button type="primary">Купить билет</el-button>
                </router-link>
                <!-- @click="buyTicket" -->

                <h5>от {{data.price | nf}} руб.
                    <div class="label label-yellow" v-if="data.hot">- {{data.hot}}%</div>
                </h5>
            </div>
            <span class="back" @click="onItemClick">Вернуться</span>
        </el-col>
    </el-row>
</template>

<script>
    import {hm} from '@/utils/string';

    export default {
        name: 'contacts-block',
        props: [
            'data',
            'index'
        ],
        methods: {
            onItemClick() {
                this.$emit("itemClick", false);
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
            /*
            buyTicket() {
                //this.$refs.excursWrap.classList.remove('aos-animate');
                this.$emit("ticketClick");

            }
            */
        },
        computed: {
            offers() {
                return this.data.offers;
            },
            dateBase() {

                const b = this.offers.filter((el) => {
                    return el;
                }).map(el => {
                    return el.TIME;
                });
                let a = [...new Set(b)];

                let s = a.filter((el) => {
                    return el
                }).map(el => {
                    let b = el.split(' ');
                    let c = b[0].split('.').reverse();
                    return `${c.join('-')}T${b[1]}`
                });

                return new Date(s[0]);
            },
            earlyDate() {
                return [this.dateBase.toLocaleString("ru", {
                    month: 'long',
                    day: 'numeric',
                }), this.dateBase.toLocaleString("ru", {hour: 'numeric', minute: 'numeric',})]
            },
            time() {
                return this.data.time
            },
            early() {
                return `${this.earlyDate[0]} в ${this.earlyDate[1]}`;
            },
            duration() {
                return hm(this.time);
                //(${this.earlyDate[1]} - ${new Date(this.dateBase.setMinutes(this.dateBase.getMinutes() + parseFloat(this.time.replace(/\,/g,'.'))*60)).toLocaleString("ru", {hour: 'numeric', minute: 'numeric',})})
                //return `${this.time} ${this.num2str(this.time, ['час', 'часа', 'часов'])}`
            },
        },
        mounted() {
            console.log(this.data.time);
        }

    }
</script>

<style lang="less">
    @import '../../less/variables.less';

    .excursionExpandedWrap {
        //padding: 450px 20px 20px;
        pointer-events: none;
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 20px 0;
        width: 100%;

        h2 {
            text-align: left;
            margin-bottom: 40px;

            .up(@sm; { margin-bottom: 70px; });
        }

        .up(@sm; { padding: 20px 10px; });

        .up(@lg; { //padding: 20px;
        });

        .down(@sm; { margin: 0 -22px; width: auto; padding-bottom: 0; });
    }

    .excursionInfo {
        background-color: @white;
        padding: 70px;
        border-radius: 20px;
        pointer-events: all;
        display: flex;
        flex-flow: column;

        &__icon {
            margin-right: 30px;
            display: flex;

            svg {
                width: 60px;
                height: auto;
                margin: auto;
            }

            path {
                fill: @black;
            }
        }

        h2 {
            display: flex;
            align-items: center;
            flex-flow: row;
        }

        a,
        .back {
            color: @active;
            cursor: pointer;

            &.back {
                font-weight: bold;
                margin: 0 auto;
                display: block;
                margin-top: 40px;
                text-align: center;

                .up(@sm; { margin-top: 70px; });

                .up(@sm; { display: none; });
            }
        }

        a {
            transition: .3s;

            &:hover {
                color: @btn_hover;
            }
        }

        .itemsList {
            &__item {
                margin: 0;

                &-text {
                    span {
                        &:last-child {
                            .up(@sm; { min-height: 60px; });
                        }
                    }
                }

                &:last-child {
                    padding-bottom: 30px;
                }

                .up(@md; { //width: 50%;
                });
            }
        }

        .close {
            width: 50px;
            height: 50px;
            margin-left: auto;
            cursor: pointer;
            display: none;

            path {
                fill: @black;
                transition: .3s;
            }

            &:hover {
                path {
                    fill: @active;
                }
            }

            .up(@sm; { display: block; });
        }

        .up(@lg; { max-width: 820px; min-width: 720px; margin-left: auto; max-height: 100%; });

        .down(@xs; { });

        .down(@sm; { padding: 30px 20px 40px; border-radius: 0; });
    }

    .excursionAbout {
        font-size: 20px;
        line-height: 24px;
        flex: 1;
        overflow: auto;

        p {
            margin-bottom: 24px;
        }

        ul {
            margin-bottom: 24px;
            display: none;

            li {
                margin-bottom: 15px;
                display: flex;

                &::before {
                    content: "—";
                    margin-right: 20px;
                }

                &:last-child {
                    margin-bottom: 0;
                }
            }

            .up(@lg; { display: block; });
        }
    }

    .excursionPurchase {
        display: flex;
        align-items: center;
        flex-flow: column-reverse;
        padding-top: 70px;

        h5 {
            display: flex;
            align-items: center;
            width: 260px;
            position: relative;
            margin: 0 0 40px 0;
            justify-content: center;

            .label {
                margin: 0;
                position: absolute;
                bottom: 40px;
                right: 0;

                .up(@sm; { margin: 0 25px; position: unset; });
            }

            .up(@sm; { width: auto; margin: 0 0 0 70px; justify-content: flex-start; });
        }

        .up(@sm; { flex-flow: row; });
    }

</style>

