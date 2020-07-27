<template>
<main class="wrapper contactsPage">
	<map-section
		mapId="mapContacts"
		:mapZoom="11"
		class="mapContacts"
	/>
</main>
</template>

<script>
import mapSection from './home/map-section';

export default {
	name: 'contacts',
	components: {
		mapSection,
	},
	data: () => ({
		newClass: 'QQQ',
	}),
}
</script>

<style lang="less">
@import "../less/variables";

.contactsPage {
    display: flex;
    flex-flow: column;
	flex: 1;

	.mapSection {
		display: flex;
		flex-flow: column;
		flex: 1;
		height: 100%;
		padding-top: 120px;

		.up(@lg;{
			flex-flow: wrap;
		});
	}
}

</style>
