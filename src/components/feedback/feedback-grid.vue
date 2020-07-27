<template>
<section class="feedbackGrid">
	<el-container direction="vertical">
		<div class="feedbacks">
			<feedback-single 
				v-if="index < data.length"
				v-for="(item, index) in feedsToShow" 
				data-aos="fade-down"
				:key="index"
				:name="data[index].NAME"
				:text="data[index].DETAIL_TEXT"
			/>
		</div>
		<el-button v-if="data.length>feedsToShow" @click="feedsToShow += 2" data-aos="fade-down" type="info">Еще</el-button>
	</el-container>
</section>	
</template>

<script>
import feedbackSingle from './feedback-single';

export default {
	name: 'feedback-grid',
	components: {
		feedbackSingle
	},
	props: [
		"data"
	],
	data: () => ({
		feedsToShow: 6,
	}),
	mounted() {
	}
}
</script>

<style lang="less">
@import '../../less/variables';

.feedbackGrid {
	padding-top: 40px;

	.el-button {
		margin: 0 auto 40px;

		.up(@sm;{
			margin-bottom: 80px;
		})
	}

	.el-container {
		.up(@sm;{
			padding: 0 80px;
		});
	}
	
	.feedbacks {

		.up(@md;{
		});
		
		.up(@lg;{
			columns: 2 auto;
			column-gap: 80px;
			//padding-bottom: 80px;
		});
		
		.up(@xl;{
			columns: 3 auto;
		});
	}

	.up(@sm;{
		padding-top: 80px;
	});
}
</style>