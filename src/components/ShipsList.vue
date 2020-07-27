<template>
<main class="wrapper shipsListPage">
	<main-section :pageData="page" />
	<excursion-info-list 
		:listData="listRow"
	/>
	<boat-rental type="noTitle" :boatsDelay="2700" :shipsList="items" />
	<gallery-section :data="gallery" />
	<text-block
		title="Преимущества бронирования теплохода в Невской Классике" 
		class="yellow"
		:textDataL="pageData.FULL_1"
		:textDataR="pageData.FULL_2"
	/>
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
import boatRental from './home/boat-rental';
import gallerySection from './home/gallery-section';
import textBlock from './elements/text-block';
import excursionInfoList from './excursion/excursion-info-list';


export default {
	name: 'ships-list',
	components: {
		mainSection,
		mapSection,
		boatRental,
		gallerySection,
		textBlock,
		excursionInfoList,
	},
	data: () => ({
		page: {
			title: 'Наши теплоходы',
			subtitle: 'Незабываемые впечатления, доступные каждому',
			bg: require(`../assets/img/shipsPage.jpg`),
		},
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
				title: '6 месяцев',
				desc: 'длительность сезона',
				icon: 'icon-calendarBlack',
			},
		],
	}),
	computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Ships) return null;
            return this.$store.state.page.Ships;
		},

		items() {
			if (!this.pageData) return null;

			return this.pageData.items;	
		},

		gallery() {
			if (!this.pageData) return null;

			return this.pageData.slider;	
		},
	}
}
</script>

<style lang="less">
.shipsListPage {
	.boatRental {
		animation-delay: 1.9s;
	}
	.filterBtns[data-aos].aos-animate {
		transition-delay: 2.3s;
	}
}
</style>
