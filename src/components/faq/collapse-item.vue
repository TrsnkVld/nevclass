<template>
<el-collapse-item class="collapseItem" :title="data.DETAIL_TEXT" :name="index">
	<p class="collapseItem__text" v-html="data.PREVIEW_TEXT" />
</el-collapse-item>
</template>

<script>
export default {
	name: 'collapse-item',
	props: [
		'data',
		'index'
	],
	components: {
		
	},
	data: () => ({

	}),
}
</script>

<style lang="less">
@import "../../less/variables";

.el-collapse-item {
	break-inside: avoid-column;

	&__header {	
		min-height: 140px;
		height: auto;
		padding: 40px 0;
		padding: 0;
		box-sizing: border-box;
		font-weight: bold;
		font-size: 30px;
		line-height: 36px;
		transition: .2s;
		display: flex;
		justify-content: space-between;
    	padding: 20px 0;

		&:hover {
			color: @active;

			.el-collapse-item__arrow {
				background-color: @active;
				box-shadow: 0px 10px 10px rgba(0, 21, 53, 0.12);

				&::before {
					background-image: url('../../assets/icons/faq_arrow-invert.svg');
				}
			}
		}
	}

	&__content {					
		font-size: 25px;
		line-height: 30px;
		padding-bottom: 40px;
		padding-right: 100px;
	}

	&__arrow {
		background-color: @disabled;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		transition: .2s;
		flex-shrink: 0;
		margin-right: 0;
		margin-left: 20px;

		&::before {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			background-image: url('../../assets/icons/faq_arrow.svg');
			background-repeat: no-repeat;
			background-position: 50% 48%;
			transform: rotate(0);
			transition: .2s;
			transform: rotate(180deg);
		}

		&.is-active {	
 		   transform: rotate(0deg);

			&::before {
				transform: rotate(0deg);
			}
		}

		.up(@sm;{
			margin-left: 40px;
		});
	}

	&:last-child {
		.el-collapse-item__header,
		.el-collapse-item__wrap {
			border-bottom: 0;
		}
		
		.el-collapse-item__content {
			padding-bottom: 0;

			.up(@lg;{
				padding-bottom: 40px;
			})
		}
	}

	.up(@sm;{
		padding: 0 40px;
	});
}
</style>