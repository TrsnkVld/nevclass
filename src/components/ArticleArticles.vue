<template>
<main class="wrapper articlePage">
	<main-section :pageData="page" />
	<text-block
		:textDataL="article.TEXT_1"
		:textDataR="article.TEXT_2"
		class="white"
	/>
	<gallery-section :data="article.slider" />
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
import textBlock from './elements/text-block';
import gallerySection from './home/gallery-section';
import mapSection from './home/map-section';
//import { Pano } from 'vuejs-vr';

export default {
	name: 'article-articles',
	components: {
		mainSection,
		textBlock,
		gallerySection,
		mapSection,
		//Pano
	},
	data: () => ({	
		benefits : {
			text: [
				'Компания «Невская классика» организует увлекательные прогулки и мероприятия на теплоходах и метеорах. По вашему желанию повара приготовят индивидуальное меню с изысканными угощениями.',
				'Яркий отдых и незабываемые праздники',
				'В распоряжении нашей компании десятки судов. Вы можете совместить корпоративное мероприятие или свадьбу, юбилей или выпускной с прогулкой или экскурсией на теплоходах и метеорах разной вместимости. Такое водное приключение оставит теплые воспоминания у всех участников праздника.',
				'Мы не запрещаем своим клиентам пользоваться услугами любых кейтеринговых компаний или самостоятельно организовывать банкет. Однако заказ ресторанного обслуживания у нас – это гарантия своевременной подачи свежеприготовленных блюд, внимание ко всем пожеланиям клиента, вежливое общение с гостями.',
				'Если вы решили заказать банкет в компании «Невская классика», сообщите об этом нашему менеджеру. Специалист проконсультирует вас по составлению индивидуального меню, расскажет обо всех вариантах организации банкета, предоставит подробную смету расходов на ресторанное обслуживание. Мы поможем вам организовать незабываемое мероприятие!',
			],
		},
		urls: [
			'../assets/img/equirectangular.jpg',
		],
		index: 0
	}),
	computed: {
		
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.ArticlePage) return null;
            return this.$store.state.page.ArticlePage;
		},
		article() {
			if (!this.pageData) return null;

			return this.pageData.item;
		},
		page() {
			return {
				title: this.article.NAME,
				subtitle: this.article.ACTIVE_FROM,
				bg: this.article.image,
			}
		},
	}, 
	mounted() {
	},
}
</script>

<style lang="less">

.tour {
	width: 500px;
	height: 500px;
    position: relative;
}
</style>