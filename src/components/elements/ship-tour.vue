<template>
<div class="shipTour">
	<iframe :src="`/3d/${frame}/`" frameborder="0"></iframe>
</div>
</template>

<script>
export default {
	name: 'ship-tour',
	data: () => ({}),
	props: ['frame']
}
</script>

<style lang="less">
@import "../../less/variables";

.shipTour {
	flex: 1;
    position: relative;

	iframe {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	&::after {
		content: "";
		display: block;
		width: 100%;
		padding-top: 63.95%;

		.down(@xs;{
			padding-top: 100%;
		});

		.up(@lg;{
			display: none;
		});
	}

	.up(@lg;{
		width: 50%;
	});
}
</style>