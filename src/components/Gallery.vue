<template>
<main class="wrapper galleryPage">
	<gallery-section :data="images" :textData="text" class="galleryFull" />
	<map-section
		mapId="mapContacts"
		:coords="['31.16','59.95']"
		:mapZoom="10.2"
		class="mapContacts"
	/>
</main>
</template>

<script>
import mapSection from './home/map-section';
import gallerySection from './home/gallery-section';


export default {
	name: 'gallery',
	components: {
		mapSection,
		gallerySection,
	},
	data: () => ({
		gallery: [
			{
				src: 'party.jpg',
				title: 'Корпоратив на теплоходе "Москва-212"',
			},
			{
				src: 'party.jpg',
				title: 'Корпоратив на теплоходе "Москва-212"',
			},
			{
				src: 'party.jpg',
				title: 'Корпоратив на теплоходе "Москва-212"',
			},
			{
				src: 'party.jpg',
				title: 'Корпоратив на теплоходе "Москва-212"',
			},
			{
				src: 'party.jpg',
				title: 'Корпоратив на теплоходе "Москва-212"',
			},
		],
	}),
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Gallery) return null;
            return this.$store.state.page.Gallery;
		},

		images() {
			if (!this.pageData) return null;

			return this.pageData.content[0].images;
		},

		text() {
			if (!this.pageData) return null;

			return this.pageData.content[0].images_info;
		},
    },
}
</script>

<style lang="less">
@import "../less/variables";

</style>
