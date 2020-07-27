<template>
<div class="singleFeedback">
	<div class="singleFeedback__header">
		<div class="icon icon-feed_person"></div>
		<h3>{{ name }}</h3>
	</div>
	<div class="singleFeedback__content">
		<h4 v-html="text" />
	</div>
</div>	
</template>

<script>
export default {
	name: 'feedback-grid',
	components: {

	},
	props: [
		"name",
		"text"
	],
	data: () => ({

	}),
}
</script>

<style lang="less">
@import '../../less/variables';

.singleFeedback {
	display: flex;
	padding-bottom: 40px;
	break-inside: avoid-column;
	flex-flow: column;

	h3 {
		line-height: 90px;
	}

	h3, h4 {
		text-align: left;
	}

	.icon {
		flex-shrink: 0;
		margin-right: 20px;
		width: 90px;
		height: 90px;
		background-color: @bg;
		border-radius: 50%;
		background-size: auto;

		.up(@sm;{
			margin-right: 30px;
		});
	}

	&__header {
		display: flex;
	}

	&__content {
		margin-top: 20px;

		.up(@sm;{
			margin-top: 0;
			padding-left: 120px;
		});
	}

	.up(@sm;{
		padding-bottom: 80px;
	})
}
</style>