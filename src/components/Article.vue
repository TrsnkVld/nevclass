<template>
<main class="wrapper articlePage">
	<main-section :pageData="page" />
	<text-block
		:textDataL="publication.TEXT_1"
		:textDataR="publication.TEXT_2"
		class="white"
	/>
	<gallery-section :data="publication.slider" />
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

export default {
	name: 'Article',
	components: {
		mainSection,
		textBlock,
		gallerySection,
		mapSection
	},
	data: () => ({
	}),
	computed: {
		
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.PubPage) return null;
            return this.$store.state.page.PubPage;
		},
		publication() {
			if (!this.pageData) return null;

			return this.pageData.item;
		},
		page() {
			return {
				title: this.publication.NAME,
				subtitle: this.publication.ACTIVE_FROM,
				bg: this.publication.image,
			}
		},
	}, 
	mounted() {
		console.log(this.publication)
	}
}
</script>

<style lang="less">

</style>