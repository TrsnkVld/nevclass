<template>
	<section class="halfSection">
		<el-container direction="vertical" v-if="type=='tour'">
			<ship-tour data-aos="bg-main" v-if="frame" :frame="frame" />
			<gallery-section v-else :data="data.slider" data-aos="bg-main" />
			<ship-specifications data-aos="bg-anim" :specs="specs" />
		</el-container>
		<el-container direction="vertical" v-else>
			<gallery-section :data="data.images" data-aos="bg-main" />
			<service-info :data="data" />
		</el-container>
	</section>
</template>

<script>
import serviceInfo from '../elements/service-info';
import contactsBlock from '../elements/contacts-block';
import gallerySection from '../home/gallery-section';
import shipTour from '../elements/ship-tour';
import shipSpecifications from '../elements/ship-specifications';

export default {
	name: 'half-section',
	components: {
		contactsBlock,
		serviceInfo,
		gallerySection,
		shipTour,
		shipSpecifications,
	},
	props: [
		"data",
		"type",
		"frame",
		"specs",
	],
	data: () => ({

	})
}
</script>

<style lang="less">
@import "../../less/variables";

.halfSection {

	.el-container {
		padding: 0;
		max-width: none;

		.up(@lg;{
			flex-flow: row;
		});

		.up(@xxl;{
			max-width: 2400px;
		});
	}

	.swiper-container {
		.up(@lg;{
			width: 100%;
			height: 100%;
		});
	}
	.shipTour {
		&::before {
			display: block;
			content: "";
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0 !important;
			left: 0;
			background: white;
			transform: translateY(0%) translateX(0%);
			animation: unset;
			z-index: 2;
		}

		&.aos-animate {
			&::before {
				animation: halfSection .6s ease-out;
				animation-delay: 2.6s;
				animation-fill-mode: forwards;
			}
		}
	}

	.shipSpec {
		background: linear-gradient(0deg, #ffffff 50%, #E5EAF5 0%);
		animation-delay: 1.7s !important;
		animation-fill-mode: forwards !important;
		background-size: 100% 200%;
		background-position: 100% 0%;
		background-position: 100% 100%;
	
		&.aos-animate {
			background-position: 100% 100%;
		}
	}

	.gallerySection {

		.img-wrap {
			&::after {
				.up(@lg;{
					display: none;
				});
			}
		}

		&::before {
			display: block;
			content: "";
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0 !important;
			left: 0;
			background: white;
			transform: translateY(0%) translateX(0%);
			animation: unset;
			z-index: 2;
		}

		&.aos-animate {
			&::before {
				animation: halfSection .6s ease-out;
				animation-delay: 2.6s;
				animation-fill-mode: forwards;
			}
		}

		.up(@lg;{
			width: 50%;
			flex: 1;
		});
	}
	.excursionSingle {
		.up(@lg;{
			max-height: none;
		});
	}
}
</style>