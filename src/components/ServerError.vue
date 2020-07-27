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
	name: 'server-error',
	components: {
		mapSection,
		errorSection,
	},
	data: () => ({
		pageData: {
			title: 'Ошибка сервера',
			subtitle: 'Повторите попытку чуть позже',
			bg: 'error_server.jpg',
		},
	}),
}
</script>

<style lang="less">
@import "../less/variables";
</style>
