<template>
<main class="wrapper servicesPage">
	<main-section :pageData="page"/>
	<excursion-info-list 
		:listData="listRow"
	/>
	<double-carousel 
		type="servicesPage"
		:data="items"
		:topTitle="{text: 'Ваш праздник на теплоходе'}"
		data-aos="bg-anim"
		:itemsDelay="2500"
	/>
	<text-block
		class="yellow"
		title="Преимущества наших услуг" 
		:textDataL="pageData.FULL_1"
		:textDataR="pageData.FULL_2"
	/>
	<text-block
		title="О наших услугах"
		:textDataL="pageData.FULL_3"
		:textDataR="pageData.FULL_4"
	/>
	<gallery-section :data="images" />
	<map-section
		mapId="mapContacts"
		:coords="['31.16','59.95']"
		:mapZoom="10"
		class="mapContacts"
		data-aos="flip-down" 
	/>
</main>
</template>

<script>
import mainSection from './excursion/main-section';
import mapSection from './home/map-section';
import doubleCarousel from './home/double-carousel';
import textBlock from './elements/text-block';
import gallerySection from './home/gallery-section';
import excursionInfoList from './excursion/excursion-info-list';

export default {
	name: 'services',
	components: {
		mainSection,
		mapSection,
		gallerySection,
		doubleCarousel,
		textBlock,
		
		excursionInfoList,
	},
	data: () => ({
		page: {
			title: 'Наши услуги',
			subtitle: 'Широкий спектр услуг в области водного туризма и организации корпоративных мероприятий на борту комфортабельных теплоходов и катеров',
			bg: require(`../assets/img/bg2.jpg`),
		},
		listRow: [
			{
				title: '9 теплоходов',
				desc: 'к Вашим услугам',
				icon: 'icon-shipBlack',
			},
			{
				title: 'Множество маршрутов и меню',
				desc: 'на любой вкус',
				icon: 'icon-markerBlack',
			},
			{
				title: 'Длительный сезон',
				desc: 'никогда не поздно',
				icon: 'icon-calendarBlack',
			},
		],
		servicesList: [
			{
				id: 1,
				title: 'Свадьба на теплоходе',
				price: 'от 300 руб./час',
				img: 'wedding.jpg',
			},
			{
				id: 2,
				title: 'Retro party',
				price: 'от 400 руб./час',
				img: 'retro.png',
			},
			{
				id: 3,
				title: 'В гостях у сказки',
				price: 'от 200 руб./час',
				img: 'tales.jpg',
			},
			{
				id: 4,
				title: 'Организация Вашего праздника',
				price: 'от 385 руб./час',
				img: 'service.jpg',
			},
			{
				id: 5,
				title: 'Кейтеринг',
				subtitle: 'Питание',
				price: 'от 123 руб./час',
				img: 'food.jpg',
			},
			/*
			{
				id: 6,
				title: 'Теплоход на футбольные матчи ФК «Зенит»',
				subtitle: 'На футбол',
				price: 'от 856 руб./час',
				img: 'zenit.jpg',
			}
			*/
		],
	}),
	computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Hots) return null;
            return this.$store.state.page.Hots;
		},

		items() {
			if (!this.pageData) return null;

			return this.pageData.items;
		},
		images() {
			if (!this.pageData) return null;

			return this.pageData.slider;
		}
	}
}
</script>

<style lang="less">
@import "../less/variables";

.servicesPage {
	.doubleCarousel {
		padding-top: 35px;
		//background-color: @disabled;
		
		
		background: linear-gradient(0deg, #ffffff 50%, #F2F4FA 0%);
		background-size: 100% 200%;
		background-position: 100% 100%;
		animation-delay: 1.9s;

		.up(@sm;{
			padding-top: 75px;
		});
	}
}
</style>