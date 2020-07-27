<template>
    <div class="tariffInfo">
        <div class="close" v-if="$route.name==='tariffs'"
             @click="$store.state.isCardOpened=false; $store.state.currentShip=''; $store.state.shipOrderForm.shipId=''">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.7069 0.292894C49.3164 -0.0976298 48.6832 -0.0976298 48.2927 0.292895L0.295009 48.2907C-0.0955151 48.6813 -0.0955142 49.3144 0.29501 49.7049C0.685534 50.0955 1.3187 50.0955 1.70922 49.7049L49.7069 1.70711C50.0974 1.31658 50.0974 0.683419 49.7069 0.292894Z"
                      fill="white"/>
                <path d="M0.294846 0.292893C0.685371 -0.0976311 1.31854 -0.0976311 1.70906 0.292893L49.7067 48.2907C50.0972 48.6813 50.0972 49.3144 49.7067 49.7049C49.3162 50.0955 48.683 50.0955 48.2925 49.7049L0.294846 1.70711C-0.095678 1.31658 -0.095678 0.683418 0.294846 0.292893Z"
                      fill="white"/>
            </svg>
        </div>
        <div v-for="(season, index) in normalizeData" :key="index" class="tariffInfo__data">
            <h3>{{ sortedSeason(season) }}</h3>
            <el-row :gutter="80">
                <el-col :span="24" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}"
                        v-for="(week, index) in season.week" :key="index">
                    <h4 class="weekday">{{ sortedWeek(week) }}</h4>
                    <ul class="tariffInfo-links">
                        <li v-for="({price, time}, index) in week.times" :key="index" class="tariffInfo-links__item">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 0.000488281C5.832 0.000488281 0 5.83249 0 13.0005C0 20.169 5.832 26.0005 13 26.0005C20.1685 26.0005 26 20.169 26 13.0005C26 5.83249 20.1685 0.000488281 13 0.000488281ZM17.707 17.7075C17.5115 17.903 17.256 18.0005 17 18.0005C16.744 18.0005 16.4885 17.903 16.293 17.7075L12.293 13.7075C12.1055 13.52 12 13.2655 12 13.0005V6.00049C12 5.44849 12.448 5.00049 13 5.00049C13.552 5.00049 14 5.44849 14 6.00049V12.586L17.707 16.2935C18.0975 16.684 18.0975 17.317 17.707 17.7075Z"
                                      fill="#001535"/>
                            </svg>
                            <h4>{{time}}</h4>
                            <h5 v-scroll-to="'.formWrap .sectionTitle'">{{parseInt(price) | nf}} руб./час</h5>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {monthsSorted} from "@/utils/date";

    export default {
        name: 'tariff-info',
        props: ['data'],
        data: () => ({}),
        computed: {
            normalizeData() {
                return this.data;
            },
            fall() {
                return this.data.filter(el => {
                    if (el.SEASON.includes('Апрель')) return el
                });
            },
            fallWeekday() {
                return this.fall.filter(el => {
                    if (el.DAYS.includes('Чт')) return el
                });
            },
            fallWeekend() {
                return this.fall.filter(el => {
                    if (el.DAYS.includes('Пт')) return el
                });
            },
            summer() {
                return this.data.filter(el => {
                    if (el.SEASON.includes('Июнь')) return el
                });
            },
            summerWeekday() {
                return this.summer.filter(el => {
                    if (el.DAYS.includes('Чт')) return el
                });
            },
            summerWeekend() {
                return this.summer.filter(el => {
                    if (el.DAYS.includes('Пт')) return el
                });
            },
        },
        methods: {
            sortedSeason(season) {
                return monthsSorted(season.season.split(/,/)).join(', ');
            },
            sortedWeek(week) {
                return week.week.split(/,/).join(', ');
            },
        }
    }
</script>

<style lang="less">
    @import "../../less/variables";

    .tariffInfo {
        background: @white;
        padding: 60px 20px;
        height: calc(100% - 20px);
        box-sizing: border-box;
        position: relative;

        &__data {
            margin-bottom: 70px;
        }

        h2, h3 {
            text-align: left;
            //margin-bottom: 35px;
        }

        .weekday {
            text-align: left;
            font-weight: bold;
            padding: 20px 0;

            word-break: break-word;
        }

        .el-row {
            margin-bottom: 35px;
            // max-width: 800px;

            &:last-of-type {
                margin-bottom: 0;
            }
        }

        h3 {
            margin-bottom: 15px;
        }

        h4, h5 {
            padding-bottom: 3px;
        }

        h4 {
            margin-right: auto;
        }

        h5 {
            cursor: pointer;
            transition: color .3s;

            &:hover {
                color: @active;
            }
        }

        &-links {
            //margin-bottom: 35px;

            &__item {
                padding: 2px 0 7px;
                border-bottom: 1px solid @disabled;
                display: flex;
                align-items: center;
                justify-content: space-between;

                svg {
                    width: 20px;
                    height: 20px;
                    margin-right: 10px;

                    path {
                        fill: @bg;
                    }
                }

                &:last-child {
                    border: none;
                }
            }
        }

        .close {
            margin-left: auto;
            cursor: pointer;
            position: absolute;
            top: 30px;
            right: 30px;

            svg {
                width: 30px;
                height: 30px;
            }

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

            .up(@lg; { top: 60px; right: 70px; })
        }

        .el-row {
            &:last-child {
                ul {
                    margin-bottom: 0;
                }
            }
        }

        .up(@sm; { border-radius: 20px; padding: 60px 70px; });
    }
</style>