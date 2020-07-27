<template>
	<section class="mainSection" data-aos="bg-main" data-aos-anchor=".header" :style="{ backgroundImage: `url('${pageData.bg}')` }">
		<el-container direction="vertical" data-aos="fade-down" data-aos-delay="600" data-aos-anchor=".header">
			<h1 v-html="pageData.title"></h1>
			<h3 v-html="pageData.subtitle"></h3>
		</el-container>
	</section>
</template>

<script>

export default {
	name: 'welcome',
	components: {
		
	},
	props: [
		"pageData"
	],
	data: () => ({

	}),
	methods: {
        onItemClick() {
            this.$emit("itemClick");
        }
	}
}
</script>

<style lang="less">
@import '../../less/variables.less';

.mainSection {
    background-color: rgba(0, 0, 0, .25);
    background-blend-mode: darken;
	background-position: center;
    background-size: cover;
	box-sizing: border-box;
	display: flex;
	position: relative;
    overflow: hidden;

	&::before {
		display: block;
		content: "";
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		background: white;
		transform: translateY(0%);
	}
	
	&::after {
		display: block;
		//content: "";
		width: 100%;
		padding-top: 100%;
		-webkit-box-flex: 0;
		-ms-flex: 0;
		flex: 0;

		.up(@sm;{
			content: none;
		});
	}

	.el-container {
		//max-width: 680px;
		//margin-top: auto;
		padding: 105px 20px 40px;

		.up(@sm;{
			//max-width: 960px;
			padding: 204px 80px 80px;
		});

		.up(@lg;{
			//max-width: none;
		});
	}

	h1 {
		//color: @white;
	}
	h3 {
		color: @white;
		padding-top: 30px;
	}

	.up(@sm;{
		//padding: 245px 90px 40px;
		//min-height: 590px;
	});

	.up(@lg;{
		//padding: 245px 90px 90px;
    	//min-height: 500px;
	});
}
</style>