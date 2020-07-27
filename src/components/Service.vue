<template>
<main class="wrapper servicePage">
	<main-section :pageData="page" />
	<excursion-info-list 
		:listData="listRow"
	/>
	<half-section :data="sliderInfo" />
	<scroll-btn-wrap v-in-viewport tag="section" scroll-to=".boatRental">
		<boat-rental :shipsList="shipsList" />
		<ship-form :shipsList="shipsList" />
		<!--
			<service-form />
		-->
		<gallery-section :data="item.slider" />
	</scroll-btn-wrap>
	<text-block
		title="Преимущества аренды теплохода"
		:textDataL="item.TEXT_1"
		:textDataR="item.TEXT_2"
		class="yellow"
	/>
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
import boatRental from './home/boat-rental';
import gallerySection from './home/gallery-section';
import textBlock from './elements/text-block';
import excursionInfoList from './excursion/excursion-info-list';
import shipForm from './elements/order-forms/ship-form';
import halfSection from './elements/half-section';
import scrollBtnWrap from './elements/scroll-btn-wrap';

import buyButton from './elements/buy-button';


export default {
	name: 'service',
	components: {
		mainSection,
		mapSection,
		boatRental,
		gallerySection,
		textBlock,
		excursionInfoList,
		shipForm,
		halfSection,
		buyButton,
		scrollBtnWrap
	},
	data: () => ({
		listRow: [
			{
				title: '9 теплоходов',
				desc: 'к Вашим услугам',
				icon: 'icon-shipBlack',
			},
			{
				title: 'До 120 человек',
				desc: 'максимальный заказ',
				icon: 'icon-people',
			},
			{
				title: 'Разнообразное меню',
				desc: ' ',
				icon: 'icon-calendarBlack',
			},
		],
		benefits : {
			title: 'Преимущества аренды теплохода на свадьбу',
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
            if (!this.$store.state.page || !this.$store.state.page.HotPage) return null;
            return this.$store.state.page.HotPage;
		},
		item() {
			if (!this.pageData) return null;

			return this.pageData.item;
		},
		page() {
			return {
				title: this.item.NAME,
				subtitle: 'Такое торжество запомнится надолго!',
				bg: this.item.image,
			}
		},
		sliderInfo() {
			return {
				programText: this.item.DETAIL_TEXT,
				images: this.item.slider,
				PRICE_EC: this.item.PRICE_EC,
				PRICE_ST: this.item.PRICE_ST,
				PRICE_LU: this.item.PRICE_LU,
			}
		},
		shipsList() {
			if (!this.pageData) return null;
			return this.pageData.ships
		}
	},
}
</script>

<style lang="less">
@import "../less/variables";

.servicePage {
	.filterBtns {
		background-color: @bg;
		margin: 0;

		.el-container {
			padding: 0 10px;

			.up(@sm;{
				padding: 0 80px;
			});
		}

		.el-select {
			margin-left: 0;
			margin-right: 0;
		}

		&__group {
			padding: 0 10px;
		}
	}

	.boatRental {
		.sectionTitle {
			padding-bottom: 0;
		}

		.filterBtns {
    		margin: 0 -10px;
			background: none;
			justify-content: flex-start;

			.el-select {
				display: none;
			}

			.up(@md;{
			});

			.up(@lg; {
				justify-content: center;
			});
		}
	}

	.sectionTitle {
		padding-bottom: 35px;

		.up(@sm;{
			padding-bottom: 75px;
		});
	}
}
</style>
