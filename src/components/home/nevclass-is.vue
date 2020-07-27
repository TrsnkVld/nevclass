<template>
<section class="nevclassIs" data-aos="bg-anim">
	<el-container direction="vertical">
		<h2 data-aos="fade-down" class="sectionTitle">Невская классика — это</h2>
		<swiper :options="nevIsSwiper" ref="nevSwiper">
			<el-col data-aos="fade-down" :data-aos-delay="(index+1)*150" tag="swiper-slide" :span="24" :sm="{span: 8}" v-for="(item, index) in listItems" :key="index">
				<list-item-icon
					:icon="item.icon"
					:title="item.title"
				/>
			</el-col>
			
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper>
	</el-container>
</section>
</template>

<script>
import listItemIcon from '../elements/list-item-icon';

export default {
	name: 'nevclass-is',
	components: {
		listItemIcon,
	},
	data: () => ({
		nevIsSwiper: {
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
            	dynamicBullets: true
			},
		},
		listItems: [
			{
				id: "1",
				icon: 'nc_01_icon',
				title: 'Более 10 лет успешной работы',
			},
			{
				id: "2",
				icon: 'nc_02_icon',
				title: 'Гибкая ценовая политика',
			},
			{
				id: "3",
				icon: 'nc_03_icon',
				title: 'Индивидуальный подход к каждому клиенту',
			},
			{
				id: "4",
				icon: 'nc_04_icon',
				title: 'По соотношению цена/качество наши услуги лучшие в городе',
			},
			{
				id: "5",
				icon: 'nc_05_icon',
				title: 'Возможность online покупки билета',
			},
		],
	}),
	methods: {},
}
</script>

<style lang="less">
@import "../../less/variables";

.nevclassIs {
	//background-color: @soft_yellow;
	//padding-bottom: 20px;
	background: linear-gradient(0deg, #ffffff 50%, #FFE485 0%);
    background-size: 100% 200%;
    background-position: 100% 0%;


	.swiper-pagination-bullet {
		background-color: #F1D77A;

		&-active {
			background-color: @white;
		}
	}

	.el-container {
		padding: 0;

		.up(@sm;{
			padding: 0 20px;
		});
	}
	
	h4 {
		margin-bottom: 0;
	}

	.swiper {
		&-slide {
			.up(@sm;{
				width: 33.33333% !important;
			});

			.up(@lg;{
				width: auto !important;
			});
		}

		&-container {
			max-width: 1380px;
			margin: 0 -10px;

			.up(@sm;{
				overflow: visible;
			});

			.up(@lg;{
				margin: 0 auto;
				width: 100%;
			});
		}

		&-pagination {
			padding: 40px 0;

			.up(@sm;{
				display: none;
			});
		}

		&-wrapper {
			box-sizing: border-box;

			.up(@sm;{
				flex-flow: wrap;
				transform: unset !important;
				//padding: 0 10px;
			});

			.up(@lg;{
				justify-content: space-between;
				//max-width: 1420px;
				margin: 0 auto;
			});
		}
	}

	.up(@sm;{
		padding-bottom: 80px;
	})
}

</style>