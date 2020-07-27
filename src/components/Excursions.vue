<template>
<main class="wrapper excursionsPage">
	<main-section :pageData="page"/>
	<excursion-info-list :listData="listRow"/>
	<double-carousel data-aos="bg-anim" type="excursionsPage" :data="items" :itemsDelay="2100" />
	<text-block
		:textDataL="pageData.FULL_1"
		:textDataR="pageData.FULL_2"
		title="Преимущества бронирования экскурсий в Невской Классике"
		class="yellow"
	/>
	<gallery-section :data="gallery" />
	<map-section
		mapId="mapContacts"
		:coords="['31.16','59.95']"
		:mapZoom="10.2"
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
	name: 'excursions',
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
			title: 'Наши круизы и экскурсии',
			subtitle: 'Высокий уровень сервиса, яркие впечатления и лучшие цены — это лишь малая часть того, что получают наши клиенты.',
			bg: require(`../assets/img/bg1.jpg`),
		},
		listRow: [
			{
				title: '9 теплоходов',
				desc: 'к Вашим услугам',
				icon: 'icon-shipBlack',
			},
			{
				title: 'Множество маршрутов',
				desc: 'на любой вкус',
				icon: 'icon-markerBlack',
			},
			{
				title: 'Длительный сезон',
				desc: 'никогда не поздно',
				icon: 'icon-calendarBlack',
			},
		],
		excurs: [
			{
				id: 1,
				title: 'Круиз в «Петергоф»',
				price: 'от 2 000 руб.',
				img: 'peterhof-min.jpg',
			},
			{
				id: 2,
				title: 'Круиз в «Кронштадт»',
				price: 'от 2 000 руб.',
				img: 'kronstadt-min.jpg',
			},
			{
				id: 3,
				title: 'Круиз в крепость «Орешек»',
				price: 'от 1 200 руб.',
				img: 'nutlet-min.jpg',
			},
			{
				id: 4,
				title: 'Речные круизы по России',
				price: 'от 0 000 руб.',
				img: 'cruises-min.jpg',
			},
			{
				id: 5,
				title: 'Экскурсии по рекам и каналам Петербурга',
				price: 'от 1 000 руб.',
				img: 'excursions-min.jpg',
			},
			{
				id: 6,
				title: 'Ночные экскурсии на развод мостов',
				price: 'от 500 руб.',
				img: 'bridges-min.jpg',
			}
		],
		benefits : {
			title: 'Преимущества бронирования экскурсий в Невской Классике',
			text: [
				'Судоходная компания "Невская классика" рада предложить Вам широкий спектр услуг в области водного туризма и организации корпоративных мероприятий на борту комфортабельных теплоходов и катеров.',
				'Успешный многолетний опыт и огромные возможности компании "Невская классика" позволят создать для Вас не только приятный и незабываемый отдых, но и отличное позитивное настроение на долгое время!',
				'Наши теплоходы отвечают всем современным требованиям безопасности, полностью застрахованы и оснащёны всеми необходимыми спасательными средствами. Экипаж теплохода квалифицирован и надёжен. Гостеприимная атмосфера и прекрасное обслуживание помогут Вам отдохнуть и хорошо провести время.',
			],
		},
		about : {
			title: 'О наших круизах',
			text: [
				'ООО «Невская классика» предлагает заказать теплоход на свадьбу. Мы гарантируем комплексное решение организационных вопросов и оптимальную стоимость проведения свадьбы на теплоходе. Такое торжество запомнится надолго!',
				'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви, а во-вторых, такое торжество соединяет двух людей на всю оставшуюся жизнь, поэтому оно должно стать действительно запоминающимся. Сегодня существует невероятное количество сценариев, по которым может проходить свадьба, и множество мест в Петербурге, где она может отмечаться, однако проведение банкета на теплоходе набирает все большую популярность.',
				'Заказывая свадьбу на теплоходе в компании «Невская классика», Вы можете выбрать одну из трех программ — «Люкс», «Стандарт» или «Эконом». Стоимость каждой зависит как от месяца проведения мероприятия, так и от типа судна, предоставленного в аренду. Однако мы гарантируем, что предлагаемые нами цены смогут приятно удивить всех, кто задумывается о проведении свадьбы на теплоходе.',
				'Узнайте больше о данной услуге, позвонив по телефону, номер которого указан на сайте. Консультанты компании расскажут, по какому сценарию можно провести свадьбу на теплоходе, сколько стоит ее организация и как заказать судно.',
			],
		},
	}),
	computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Excursions) return null;
            return this.$store.state.page.Excursions;
		},

		items() {
			if (!this.pageData) return null;

			return this.pageData.items;	
		},

		gallery() {
			if (!this.pageData) return null;

			return this.pageData.slider;	
		},
	}, 
	mounted() {
		console.log(this.pageData)
	}
}
</script>

<style lang="less">
@import "../less/variables";

.excursionsPage {
	.doubleCarousel {
		padding-top: 40px;
		
		background: linear-gradient(0deg, #ffffff 50%, #F2F4FA 0%);
		background-size: 100% 200%;
		background-position: 100% 100%;
		animation-delay: 1.9s;

		.up(@sm;{
			padding-top: 80px;
		});
	}
}
</style>