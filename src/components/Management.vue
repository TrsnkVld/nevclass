<template>
<main class="wrapper managementPage">
	<main-section :pageData="page" />
	<management-section :teamData="specialist" :cardsDelay="1000" />
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
import managementSection from './management/management-section';
import mapSection from './home/map-section';


export default {
	name: 'management',
	components: {
		mainSection,
		mapSection,
		managementSection
	},
	data: () => ({
		page: {
			title: 'Руководство',
			bg: require(`../assets/img/table.jpg`),
		},
		team: [
			{
				id: 1,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
			{
				id: 2,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
			{
				id: 3,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
			{
				id: 4,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
			{
				id: 5,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
			{
				id: 6,
				name: 'Васильев Дмитрий Николаевич',
				position: 'Директор компании',
				email: 'vasiliev@bs.ru',
				img: 'person.jpg',
			},
		]
	}),
	computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Specialist) return null;
            return this.$store.state.page.Specialist;
		},

		specialist() {
			if (!this.pageData) return null;

			return this.pageData.specialist;
		},
	}
}
</script>

<style lang="less">
@import "../less/variables";

.servicePage {
	.filterBtns {
		background-color: @bg;
	}
}
</style>
