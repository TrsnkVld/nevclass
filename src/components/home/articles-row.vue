<template>
	<section class="articlesRow" data-aos="bg-anim">
		<el-container direction="vertical">
			<h2 data-aos="fade-down" v-if="title" class="sectionTitle">{{ title }}</h2>
			<available-events :eventsDelay="eventsDelay" :items="items" type="article-articles" :btn="noBtn" />
		</el-container>
	</section>
</template>

<script>
import availableEvents from '../elements/available-events';

export default {
	name: 'articles-row',
	components: {
		availableEvents,
	},
	props: {
		title: {
			type: String,
			default: null,
		},
		items: {
			type: Array,
			default: function() {return []},
		},
		eventsDelay: {
			type: Number,
			default: 0,
		},
		noBtn: {
			type: Boolean,
			default: false,
		}
	},
	data: () => ({}),
}
</script>

<style lang="less">
@import '../../less/variables.less';

.articlesRow {
	//background-color: @light_blue;
	background: linear-gradient(0deg, #ffffff 50%, #f2f7ff 0%);
    background-size: 100% 200%;
    background-position: 100% 100%;
	padding-top: 35px;
	padding-bottom: 35px;

	.sectionTitle {
		padding-top: 0;
	}

	.el {
		&-container {
			padding: 0;

			.up(@sm;{
				padding: 0 20px;
			});
		}
	}

	.up(@sm;{
		padding-top: 75px;
		padding-bottom: 55px;
	});
}
</style>