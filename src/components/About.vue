<template>
<main class="wrapper aboutPage">
	<main-section :pageData="page" />
	<text-block
		:textDataL="pageContent.FULL_1"
		:textDataR="pageContent.FULL_2"
		class="white"
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
import textBlock from './elements/text-block';
import gallerySection from './home/gallery-section';
import mapSection from './home/map-section';

export default {
	name: 'about',
	components: {
		mainSection,
		textBlock,
		gallerySection,
		mapSection
	},
	data: () => ({
		page: {
			title: 'О компании',
			bg: require(`../assets/img/about.jpg`),
		},
	}),
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.About) return null;
            return this.$store.state.page.About;
		},

		pageContent() {
			if (!this.pageData) return null;
			return this.pageData.content[0];
		},

		gallery() {
			if (!this.pageData) return null;
			return this.pageContent.images;
		},
    },
}
</script>

<style lang="less">
.aboutPage {
	.textBlock__rows[data-aos].aos-animate {
		transition-delay: 1.2s;
	}
}
</style>