<template>
<main class="wrapper errorPage">
	<error-section :data="pageData" />
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
import mapSection from './home/map-section';
import errorSection from './error/error-section';

export default {
	name: 'UnderDevel',
	components: {
		mapSection,
		errorSection,
	},
	data: () => ({
		pageData: {
			title: 'Страница в разработке',
			subtitle: 'Извините, мы все еще работаем над данной страницей покажем ее вот-вот!',
			bg: 'error.jpg',
		},
	}),
}
</script>

<style lang="less">
@import "../less/variables";

</style>
