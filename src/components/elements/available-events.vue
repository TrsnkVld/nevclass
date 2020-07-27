<template>
	<el-row :gutter="20" class="availableEvents">
		<el-col data-aos="fade-down" 
			:data-aos-delay="(index+1)*150+eventsDelay" 
			data-aos-anchor=".ourEvents" 
			:span="24" :sm="colSize(index, 'sm')" :lg="colSize(index, 'lg')"
			v-for="(item, index) in items" :key="index" 
		>
			<event-card :data="item" :type="type" />
		</el-col>
		<div class="btn-wrap" data-aos="fade-down" :data-aos-delay="400" data-aos-anchor=".ourEvents"> 
			<router-link :to="{name: 'news'}" v-if="!btn">
				<el-button type="info">Еще</el-button>
			</router-link>
		</div>
	</el-row>
</template>

<script>
import eventCard from './event-card';

export default {
	name: 'available-events',
	props: [
		'items',
		'eventsDelay',
		'type',
		'btn'
	],
	components: {
		eventCard,
	},
	data: () => ({
		swiperOption: {
			//effect: 'fade',
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
            	dynamicBullets: true
			},
			slidesPerView: "auto",
			/*
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			speed: 500,
			*/
		},
	}),
    computed: {
    },
    methods: {
		colSize(ind, size) {
			switch (ind, size) {
				case size='sm':
					if( ind === 0) {
						return {span: 16};
					} else {
						return {span: 8};
					}
					break;
				case size='lg':
					if( ind === 0) {
						return {span: 12};
					} else {
						return {span: 6};
					}
					break;
				default:
					//console.log( "Нет таких значений" );
			}
		}
	},
}
</script>

<style lang="less">
@import "../../less/variables";

.availableEvents {
	//padding: 0 20px;
    display: flex;
	flex-flow: wrap;
	
	&::before {
		display: none;
	}

	.el-button {
		margin: 20px auto 25px;
		min-width: 160px;

		.up(@sm;{
			margin: 60px auto 20px;
		});
	}

	.btn-wrap {
		width: 100%;
		text-align: center;
		padding: 0 30px;

		.up(@xs;{
			padding: 0;
		});
	}
	

	.el-col {
		&:first-child {
			.eventCard {
				&__img {
					&::before {
						.up(@sm;{
							padding-top: 48.15%;
						});
					}
				}
				&__info {
					padding: 0 70px 70px;

					.down(@xs;{
						padding: 0 20px 40px;
					});
				}

				&__text {
					display: block;
				}
			}

			.up(@customlg;{
				//width: 100%;
	
				width: 33.28%;
			});
		}

		.up(@sm;{
			height: auto;
		});

		.up(@customlg;{
			width: 16.66667%;
		});
	}

	.eventCard {
		&__info {
			.up(@sm;{
				padding: 0 40px 70px;
			});
		}

		&__text {
			.up(@sm;{
				display: none;
			});
		}

		.up(@sm;{
			height: calc(100% - 20px);
			box-sizing: border-box;
		});
	}

}
</style>