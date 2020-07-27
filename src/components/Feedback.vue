<template>
<main class="wrapper feedbackPage">
	<main-section :pageData="page" />
	<feedback-form data-aos="bg-anim" />
	<feedback-grid :data="claims" />
	<gallery-section :data="gallery" />
	<text-block
		title="Преимущества наших услуг" 
		:textDataL="pageData.FULL_1"
		:textDataR="pageData.FULL_2"
		class="yellow"
	/>
	<text-block
		title="О наших услугах"
		:textDataL="pageData.FULL_3"
		:textDataR="pageData.FULL_4"
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
import gallerySection from './home/gallery-section';
import mapSection from './home/map-section';
import textBlock from './elements/text-block';
import feedbackForm from './elements/order-forms/feedback-form';
import feedbackGrid from './feedback/feedback-grid';

export default {
	name: 'feedback',
	components: {
		mapSection,
		gallerySection,
		mainSection,
		textBlock,
		feedbackForm,
		feedbackGrid,
	},
	data: () => ({
		page: {
			title: 'Клиенты о нас',
			subtitle: 'Расскажите о своём опыте',
			bg: require(`../assets/img/bg3.jpg`),
		},
	}),
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Claims) return null;
            return this.$store.state.page.Claims;
		},

		claims() {
			if (!this.pageData) return null;

			return this.pageData.items;
		},

		gallery() {
			if (!this.pageData) return null;

			return this.pageData.slider;
		}
    },
}
</script>

<style lang="less">
.feedbackPage {
	.formWrap {
		animation-delay: 1s;
		
		.el-container[data-aos].aos-animate {
			transition-delay: 1.2s;
		}
	}
}
</style>