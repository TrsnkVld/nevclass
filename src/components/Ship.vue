<template>
    <main class="wrapper shipPage">
        <main-section :pageData="page"/>
        <excursion-info-list :listData="listRow"/>
        <half-section
                type="tour"
                :frame="shipData['3D_CODE']"
                :data="shipData"
                :specs="specifications"
        />
        <text-block
                :title="`Особенности ${isSingleShip} «${shipData.NAME}»`"
                :textDataL="shipData.FULL_1"
                :textDataR="shipData.FULL_2"
                class="white"
        />
        <scroll-btn-wrap
                v-in-viewport
                tag="section"
                scroll-to=".formWrap .sectionTitle"
                btnText="Забронировать"
        >
            <el-container
                    id="info"
                    class="shipInfo"
                    data-aos="bg-anim"
                    direction="vertical"
                    data-aos-delay="400"
            >
                <h2 style="padding-top: 50px" v-if="tariffInfoCard && tariffInfoCard.length">Тарифы на аренду теплохода
                    «{{ shipData.NAME }}»</h2>
                <tariff-info :data="tariffInfoCard" data-aos="fade-down"
                             v-if="tariffInfoCard && tariffInfoCard.length"/>
            </el-container>
            <ship-form :shipName="shipData.NAME"></ship-form>
        </scroll-btn-wrap>
        <gallery-section :data="shipData.slider"/>
        <text-block
                title="Преимущества бронирования теплохода в Невской Классике"
                :textDataL="shipData.FULL_3"
                :textDataR="shipData.FULL_4"
                class="yellow"
        />
        <map-section
                mapId="mapContacts"
                :coords="['31.16', '59.95']"
                :mapZoom="10"
                class="mapContacts"
                data-aos="flip-down"
        />
    </main>
</template>

<script>
    import mainSection from "./excursion/main-section";
    import mapSection from "./home/map-section";
    import textBlock from "./elements/text-block";
    import gallerySection from "./home/gallery-section";
    import halfSection from "./elements/half-section";
    import shipForm from "./elements/order-forms/ship-form";
    import scrollBtnWrap from "./elements/scroll-btn-wrap";
    import tariffInfo from "./tariffs/tariff-info";
    import excursionInfoList from "./excursion/excursion-info-list";
    import {monthsSorted} from "@/utils/date";

    export default {
        name: "ship",
        components: {
            mainSection,
            mapSection,
            gallerySection,
            textBlock,
            halfSection,
            excursionInfoList,
            shipForm,
            scrollBtnWrap,
            tariffInfo,
        },
        data: () => ({
            excurs: [
                {
                    id: 1,
                    title: "Круиз в «Петергоф»",
                    price: "от 300 руб./час",
                    img: "peterhof-min.jpg",
                },
                {
                    id: 2,
                    title: "Круиз в «Кронштадт»",
                    price: "от 400 руб./час",
                    img: "kronstadt-min.jpg",
                },
                {
                    id: 3,
                    title: "Круиз в крепость «Орешек»",
                    price: "от 200 руб./час",
                    img: "nutlet-min.jpg",
                },
                {
                    id: 4,
                    title: "Речные круизы по России",
                    price: "от 385 руб./час",
                    img: "cruises-min.jpg",
                },
                {
                    id: 5,
                    title: "Экскурсии по рекам и каналам Петербурга",
                    price: "от 123 руб./час",
                    img: "excursions-min.jpg",
                },
                {
                    id: 6,
                    title: "Ночные экскурсии на развод мостов",
                    price: "от 856 руб./час",
                    img: "bridges-min.jpg",
                },
            ],
            benefits: {
                title: "Особенности теплохода «Нота»",
                text: [
                    "Однопалубный теплоход VIP-класса «Нота» (судно проекта «Р-118») – самый лучший вариант для проведения незабываемого торжественного мероприятия на воде. Здесь все создано для того, чтобы вы могли полностью расслабиться, отдохнуть, наслаждаясь потрясающей прогулкой по водным просторам Санкт-Петербурга. Приглашайте своих самых дорогих и близких людей и отправляйтесь в уникальное путешествие по Неве и ее каналам.",
                    [
                        "Судно предназначено для прогулочных рейсов, организации экскурсий, а также проведения важных торжеств: свадеб, дней рождения, банкетов, небольших корпоративов и других мероприятий.",
                        "Интерьер салона выполнен в элегантном, классическом стиле. Большие окна и прозрачная крыша обеспечивают панорамный обзор. Ночью включается красивейшая подсветка. Дополнительно по вашему желанию судно можно торжественно украсить.",
                        "Судно может вместить на своем борту до 50 человек, на открытой палубе может находиться до 40 человек. Внутренний салон рассчитан на 30-36 персон, вместимость для проведения банкета – 25 человек.",
                        "Теплоходы «Нота» оборудованы барной стойкой, холодильником, комфортабельными диванами, стульями и столиками. Возможна различная расстановка мебели.",
                        "Имеется туалетная комната, горячая и холодная вода, радиотрансляция и электроустановка на 220 В, а также ЖК телевизор и DVD проигрыватель с функцией караоке. Салон имеет хорошую шумоизоляцию.",
                        "Среди дополнительных услуг – фуршетное обслуживание, организация концертных и развлекательных программ.",
                        "Экскурсии могут проводиться на русском или иностранном языке.",
                    ],
                    "Арендовать теплоход «Нота» можно в период с 15 апреля по 15 октября. При этом вы можете составить индивидуальный маршрут путешествий или выбрать любой вариант из предложенных:",
                    [
                        "по Мойке, Фонтанке, Крюкову каналу;",
                        "ночная прогулка под разведенными мостами по Неве;",
                        "путешествие по Неве в сторону Елагина острова;",
                        "Синий мост – Исаакиевская площадь ( базовый причал – набережная Мойки, д. 62).",
                    ],
                ],
                img: "nota.png",
            },
            about: {
                title: "Преимущества бронирования теплохода в Невской Классике",
                text: [
                    "Теплоход «Метеор» на подводных крыльях – самый быстрый и увлекательный способ попасть из Санкт-Петербурга в Петергоф. Закажите билеты онлайн и в назначенный день приходите на живописный причал напротив переулка Мошкова на Дворцовой набережной. Посадка начинается точно в срок, современное судно обеспечивает полный комфорт во время плавания. Покупка билетов на получасовую водную экскурсию в Петергоф позволяет насладиться видами и избежать пробок.",
                    "Маршрут теплохода проходит мимо значимых объектов культурного и исторического ландшафта Санкт-Петербурга – Эрмитажа, Адмиралтейства, Стрелки Васильевского острова, Петропавловской крепости. Во время водной экскурсии с палуб открывается завораживающий вид на Неву, Финский залив и город, раскинувшийся по берегам.",
                ],
            },
            gallery: [
                {
                    src: "about_gallery.jpg",
                },
                {
                    src: "about_gallery.jpg",
                },
                {
                    src: "about_gallery.jpg",
                },
                {
                    src: "about_gallery.jpg",
                },
                {
                    src: "about_gallery.jpg",
                },
            ],
        }),
        methods: {
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
        },
        computed: {
            pageData() {
                if (!this.$store.state.page || !this.$store.state.page.ShipPage)
                    return null;
                return this.$store.state.page.ShipPage;
            },
            shipData() {
                if (!this.pageData) return null;

                return this.pageData.item;
            },
            page() {
                return {
                    title: this.shipData.NAME,
                    subtitle: this.shipData.TYPE,
                    bg: this.shipData.mainImage,
                };
            },
            listRow() {
                return [
                    {
                        title: `${this.shipData.TABLES} ${this.num2str(
                            this.shipData.TABLES,
                            ["стол", "стола", "столов"]
                        )}`,
                        desc: "к Вашим услугам",
                        icon: "icon-tableBlack",
                    },
                    {
                        title: "Wi-Fi",
                        desc: `${
                            this.shipData.WITH_DINNER
                                ? "в любой точке теплохода"
                                : "отсутсвует"
                            }`,
                        icon: "icon-wifiBlack",
                    },
                    {
                        title: `до ${this.shipData.CAPACITY} человек`,
                        desc: "вместимость судна",
                        icon: "icon-peopleBlack",
                    },
                    {
                        title: "Кейтеринг",
                        desc: `${
                            this.shipData.WITH_DINNER ? "включён в счёт" : "отсутсвует"
                            }`,
                        icon: "icon-cutleryBlack",
                    },
                ];
            },
            specifications() {
                return [
                    {
                        specName: "Длина",
                        specValue: `${this.shipData.LENGTH} м`,
                    },
                    {
                        specName: "Ширина",
                        specValue: `${this.shipData.WIDTH} м`,
                    },
                    {
                        specName: "Высота",
                        specValue: `${this.shipData.HEIGHT} м`,
                    },
                    {
                        specName: "Осадка (глубина погружения)",
                        specValue: `${this.shipData.DEEP} м`,
                    },
                    {
                        specName: "Скорость",
                        specValue: `${this.shipData.SPEED} км/ч`,
                    },
                    {
                        specName: "Вместимость",
                        specValue: `до ${this.shipData.CAPACITY} человек`,
                    },
                    {
                        specName: "Сезон",
                        specValue: this.season,
                    },
                    {
                        specName: "Стандартные маршруты",
                        specValue: this.shipData.STANDART_WAY,
                    },
                ];
            },
            tariffInfoCard() {
                return Object.values(this.shipData.offersInfo)[0];
            },

            isSingleShip() {
                if (this.shipData.NAME.search("/") != -1) {
                    return "теплоходов";
                } else {
                    return "теплохода";
                }
            },
            season() {
                console.log("Offers: ", this.shipData.offers);
                const unicSeason = this.shipData.offers.reduce((acc, {SEASON}) => {
                    if (!SEASON) return acc;
                    Object.values(SEASON).forEach((s) => {
                        acc.add(s);
                    });
                    return acc;
                }, new Set());
                let months = [...unicSeason];
                return monthsSorted(months).join(', ');
            },
        },
        created() {
        },

        mounted() {
            this.$store.state.shipOrderForm.shipId = this.shipData.ID;
        },
    };
</script>

<style lang="less">
    @import "../less/variables";

    .shipPage {
        .doubleCarousel {
            padding-top: 40px;
            background-color: @disabled;

            .up(@sm; { padding-top: 80px; });
        }

        .tariffInfo {
            margin: 40px -20px 0;

            .up(@sm; { margin: 60px 0 0; width: 100%; });

            .up(@md; { max-width: 2200px; margin: 60px auto 0; });
        }

        .shipInfo {
            background: linear-gradient(0deg, #ffffff 50%, #f2f4fa 0%);
            background-size: 100% 200%;
            background-position: 100% 100%;
            animation-fill-mode: forwards !important;
        }
    }
</style>
