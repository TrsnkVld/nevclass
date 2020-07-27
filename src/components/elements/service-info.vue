<template>
<div class="serviceInfo" data-aos="bg-anim" data-aos-anchor=".header">
	<div data-aos="fade-left" data-aos-delay="2200" data-aos-anchor=".header">
		<template v-if="data.programText">
			<h3>Что входит в услугу</h3>
			<div class="serviceInfo__content" v-html="data.programText" />
		</template>
		<!--
		<el-row tag="ul" class="itemsList">
			<el-col tag="li" class="itemsList__item" :span="24" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 12}">
				<i class="icon icon-ec"></i>
				<div class="itemsList__item-text">
					<h5>Эконом</h5>
					<span>от {{data.PRICE_EC}} руб.</span>
				</div>
			</el-col>
			<el-col tag="li" class="itemsList__item" :span="24" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 12}">
				<i class="icon icon-st"></i>
				<div class="itemsList__item-text">
					<h5>Стандарт</h5>
					<span>от {{data.PRICE_ST}} руб.</span>
				</div>
			</el-col>
			<el-col tag="li" class="itemsList__item" :span="24" :sm="{span: 12}" :md="{span: 8}" :lg="{span: 12}">
				<i class="icon icon-lu"></i>
				<div class="itemsList__item-text">
					<h5>Люкс</h5>
					<span>от {{data.PRICE_LU}} руб.</span>
				</div>
			</el-col>
		</el-row>
		-->

	</div>
</div>
</template>

<script>
export default {
	name: 'service-info',
	props: {
		data: Object
	},
	mounted() {
	}
}
</script>

<style lang="less">
@import '../../less/variables.less';

.serviceInfo {
	padding: 40px 20px 0px;
	background: linear-gradient(0deg, #ffffff 50%, #E5EAF5 0%);
	animation-delay: 1.7s !important;
	animation-fill-mode: forwards !important;
    background-size: 100% 200%;
	background-position: 100% 0%;
	background-position: 100% 100%;
	box-sizing: border-box;
	z-index: 1;
	margin-left: auto;
	width: 100%;
	pointer-events: all;
	
	&.aos-animate {
		background-position: 100% 100%;
	}

	h3 {
		text-align: left;
		margin-bottom: 40px;
	}

	&__content {
		ul {
			margin-bottom: 40px;
			
			li {
				margin-bottom: 15px;
				display: flex;
				&::before {
					content: "—";
					margin-right: 20px;
				}

				&:last-child {
					margin-bottom: 0;
				}
			}
	
			.up(@sm;{
				margin-bottom: 80px;
				max-height: 480px;
				overflow: auto;
			});
		}
	}
	

	.itemsList {
		display: flex;
		flex-flow: wrap;
		margin: 0 -10px;

		&__item {
			padding: 0 10px 40px;
			flex: 1 0 310px;
			
			&-text {
				flex-shrink: 0;
			}

			.up(@sm;{
				padding: 0 40px 80px;
			});
	/*
			&:nth-last-child(1), 
			&:nth-last-child(2) {
				padding-bottom: 0;
			}

		*/
		}

		.icon {
			background-color: @black;
		}

		.up(@sm;{
			margin: 0 -40px;
		});
	}

	.up(@sm;{
		padding: 70px 80px 0;
	});

	.up(@lg;{
		width: 100%;
		max-width: 850px;
	});
}

</style>

