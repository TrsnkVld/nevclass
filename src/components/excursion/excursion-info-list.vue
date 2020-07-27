<template>
<section class="excursionInfoList">
	<el-container>
		<el-row tag="ul" class="itemsList">
			<el-col data-aos="fade-down" :data-aos-delay="900+(index+1)*200" data-aos-anchor=".header" tag="li" class="itemsList__item" :span="24" :sm="{span: 12}" :lg="{span: 6}" v-for="(item, index) in filterData" :key="index">
				<i class="icon" :class="item.icon"></i>
				<div class="itemsList__item-text">
					<h3>{{ item.title }}</h3>
					<span :title="item.desc">{{ limitStr(item.desc, 30) }}</span>
				</div>
			</el-col>
		</el-row>
	</el-container>
</section>
</template>

<script>
export default {
	name: 'excursion-info-list',
	components: {},
	props: [
		"listData",
	],
	data: () => ({}),
	methods: {
		limitStr(str, n, symb) {
			if (!n && !symb) return str;
			
			if (str.length < n) {
				symb = symb || '';
			} else {
				symb = symb || '...';
			}
			return str.substr(0, n - symb.length) + symb;
		}
	},
	computed: {
		filterData() {
			return this.listData.filter(({desc}) => desc && !desc.toLowerCase().includes('отсутсвует'));
		}
	}
}
</script>

<style lang="less">
@import '../../less/variables.less';

.excursionInfoList {

	.el {
		&-container {
			padding: 0 10px;

			.up(@sm;{
				padding: 0 40px;
			});

			.up(@md;{
				padding: 0 40px;
				//margin: 0 -45px;
			});

			.up(@xl;{
				//margin: 0;
			});
		}
	}

	.itemsList {
		padding: 40px 0 0;
		width: 100%;
		display: flex;
		flex-flow: wrap;

		&__item {
			padding: 0 10px 40px;
			//max-width: 200px;
			//max-width: 310px;
			flex: 1 0 310px;
			width: auto;

			&-text {
				//min-width: 200px;
				span {
					flex-shrink: 0;
				}

				.up(@lg;{
					//min-width: auto;
    				min-width: 220px;
				});
			}

			.up(@sm;{
				padding: 0 40px 80px;
    			max-width: none;
				flex: none;
				width: 50%;
			});

			.up(@md;{
				flex-flow: wrap;
				

				&:last-child {
					//margin-right: 0;
				}
			});

			.up(@lg;{
				width: 25%;
				margin: auto;
			});
		}

		.icon {
    		//transform: translateY(-20px);
		}

		.up(@sm;{
			padding: 80px 0 0;
			//margin: 0 -45px;
			//width: auto;
		});

		.up(@md;{
			margin: 0 auto;
			display: flex;
    		justify-content: space-between;
		});

		.up(@lg;{
			flex-flow: row;
		});
	}

	h3 {
		min-height: 60px;
		display: flex;
		align-items: center;
	}
}
</style>