<template>
<main class="wrapper articlesPage">
	<main-section :pageData="page" />
	<articles-row :items="articlesList" :eventsDelay="1400" noBtn />
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
import articlesRow from './home/articles-row';
import mapSection from './home/map-section';

export default {
	name: 'articles',
	components: {
		mainSection,
		articlesRow,
		mapSection
	},
	data: () => ({
		page: {
			title: 'Наши статьи',
			bg: require(`../assets/img/bg1.jpg`),
		},
		articles: [
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
				img: 'article.jpg',
			},
			{
				title: 'Акция на аренду теплоходов',
				date: '04.11.2019',
			},
			{
				title: 'Эксклюзивное меню для вашего мероприятия',
				text: 'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями...',
				date: '04.11.2019',
			},
		],
	}),
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Articles ) return null;
            return this.$store.state.page.Articles;
		},

		articlesList() {
			if (!this.pageData) return null;

			return this.pageData.items;
		},
	},
}
</script>

<style lang="less">
@import "../less/variables";

.articlesPage {
	.swiper-wrapper {
		flex-flow: wrap;
		transform: unset !important;
	}
	.swiper-container {
		padding-bottom: 20px;

		.up(@sm;{
			padding-bottom: 60px;
		});

	}

	.ourEvents {
		animation-delay: 1s;
	}

	.availableEvents {
		.swiper-pagination {
			display: none;
		}

		.el-button {
			display: block;
		}
	}
}
</style>