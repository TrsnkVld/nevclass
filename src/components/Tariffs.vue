<template>
<main class="wrapper tariffsPage">
    <main-section :pageData="page" />
    <boat-rental ref="boatRental" type="noTitle" filterType="tariffs" :filterData="filter" cardNoLoad :shipsList="filterOffers">
        <transition mode="out-in" name="anim-wrap">
            <tariffs-filter v-if="!$store.state.isCardOpened" :data="offers" />
        </transition>
        <tariffs-boats :boatsDelay="1000" :shipsList="shipsList" :offers="offers" :offersInfo="offersInfo" />
    </boat-rental>
	<scroll-btn-wrap v-in-viewport tag="section" scroll-to=".formWrap" btnText="Забронировать">
        <ship-form :shipsList="shipsList" :shipName="($store.state.currentShip) ? $store.state.currentShip : null"/>
	</scroll-btn-wrap>
    <gallery-section :data="items.slider" />
    <text-block
        title="Дополнительные условия аренды" 
		:textDataL="pageData.FULL_1"
		:textDataR="pageData.FULL_2"
    />
    <text-block
        class="yellow"
        title="Преимущества бронирования теплохода в Невской Классике" 
		:textDataL="pageData.FULL_3"
		:textDataR="pageData.FULL_4"
    />
    <map-section mapId="mapContacts" :coords="['31.16','59.95']" :mapZoom="10.2" class="mapContacts" data-aos="flip-down" />
</main>
</template>

<script>
import Vue from 'vue';

import mainSection from './excursion/main-section';
import mapSection from './home/map-section';
import boatRental from './home/boat-rental';
import gallerySection from './home/gallery-section';
import textBlock from './elements/text-block';
import tariffsFilter from './tariffs/tariffs-filter';
import tariffsBoats from './tariffs/tariffs-boats';
import shipForm from './elements/order-forms/ship-form';
import scrollBtnWrap from './elements/scroll-btn-wrap';

export default {
    name: 'tariffs',
    components: {
        mainSection,
        mapSection,
        boatRental,
        gallerySection,
        textBlock,
        tariffsFilter,
        tariffsBoats,
        shipForm,
        scrollBtnWrap
    },
    data: () => ({
        filteredShips: [],
        page: {
            title: 'Тарифы',
            subtitle: `Стоимость аренды теплохода в ${new Date().getFullYear()} году`,
			bg: require(`../assets/img/shipsPage.jpg`),
        },
        about: {
            title: 'О наших теплоходах',
            text: [
                'Теплоход «Метеор» на подводных крыльях – самый быстрый и увлекательный способ попасть из Санкт-Петербурга в Петергоф. Закажите билеты онлайн и в назначенный день приходите на живописный причал напротив переулка Мошкова на Дворцовой набережной. Посадка начинается точно в срок, современное судно обеспечивает полный комфорт во время плавания. Покупка билетов на получасовую водную экскурсию в Петергоф позволяет насладиться видами и избежать пробок.',
                'Маршрут теплохода проходит мимо значимых объектов культурного и исторического ландшафта Санкт-Петербурга – Эрмитажа, Адмиралтейства, Стрелки Васильевского острова, Петропавловской крепости. Во время водной экскурсии с палуб открывается завораживающий вид на Неву, Финский залив и город, раскинувшийся по берегам.',
            ],
        },
        filter: {
            time: [
                '10:00-23:00',
                '23:00-10:00',
            ],
            months: [
                'Апрель, Май, Сентябрь, Октябрь',
                'Июнь, Июль, Август',
            ],
            days: [
                'Пт, Сб, Праздники',
                'Вс, Пн, Вт, Ср, Чт',
            ],
        }
    }),
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Tarifs) return null;
            return this.$store.state.page.Tarifs;
		},
		shipsList() {
			if (!this.pageData) return null;

			return this.pageData.ships;
		},
		items() {
			if (!this.pageData) return null;

			return this.pageData.items;
        },
        offers() {
			if (!this.pageData) return null;
            return this.items.offers;
        },
        offersInfo() {
			if (!this.pageData) return null;
            return this.items.offersInfo;
        },
        filterOffers() {
            return this.offers.concat(this.shipsList);
        },
        boatSection() {
            return this.$refs.boatRental;
        },

    },
    mounted() {	    
        /*
        let array=[];

        this.offers.filter((el) => {
            if(el.CML2_LINK === '34' && el.DAYS === 'воскр.-четверг' && el.SEASON.includes('АПРЕЛЬ')) {
                console.log(el);
            }
        });

        */
        //console.log(this.filterOffers);
    }
}
</script>

<style lang="less">
@import "../less/variables";

.tariffsPage {
    .textBlock {
        p.textBlock__rows-item {
            padding-left: 38px;
        }

        .textBlock__rows-item {
            margin-bottom: 15px;
        }

        &.yellow {
            p.textBlock__rows-item {
                padding-left: 0;
            }

            .textBlock__rows-item {
                margin-bottom: 40px;
            }
        }
    }

    .boatRental {
        animation-delay: 1.2s;
    }
}
</style>
