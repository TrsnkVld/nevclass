<template>
	<div class="listItemIcon">
		<i class="icon" :class="icon"></i>
		<h4>{{ title }}</h4>
	</div>
</template>

<script>
export default {
	name: 'list-item-icon',
	components: {},
	props: [
		'icon',
		'title'
	],
	data: () => ({

	}),
	methods: {}	
}
</script>

<style lang="less">
@import "../../less/variables";

.listItemIcon {
	text-align: center;
	max-width: 260px;
	margin: 0 auto;

	.icon {
		width: 90px;
		height: 90px;
		margin-bottom: 30px;

		.up(@sm;{
			margin-bottom: 40px;
		});
	}

	h4 {
		margin-bottom: 20px; 

		.up(@sm;{
			max-width: 180px;
			min-height: 120px;
			margin: 0 auto;
		});
	}
}

</style>