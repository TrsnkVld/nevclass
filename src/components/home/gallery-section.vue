<template>
	<section class="gallerySection" data-aos="flip-down" data-aos-delay="400" v-if="data[0] !== null"> 
		<swiper :options="typesSwiperOption" @slideChange="changeSwiperIndex" ref="sectionSwiper">
			<swiper-slide
				class="img-wrap swiper-lazy"
				v-for="(img, index) in data"
				:key="index"
				:data-background="img"
			>
				<div class="swiper-lazy-preloader"></div>
				<h5 v-if="textData">{{ textData[index] }}</h5>
			</swiper-slide>
		</swiper>
		<div class="btnWrap" data-aos="fade-down" data-aos-delay="600" data-aos-anchor=".gallerySection" v-if="data.length > 1">
			<el-button type="primary" class="el-button--nav">
				<div class="swiper-button-prev"></div>{{ currentImg }} / {{ data.length }}<div class="swiper-button-next"></div>
			</el-button>
		</div>
	</section>
</template>

<script>


export default {
	name: 'gallery-section',
	component: {},
	props: [
		"data",
		"textData"
	],
	data: () => ({
		typesSwiperOption: {
			slidesPerView: 1,
			navigation: {
				nextEl: '.gallerySection .swiper-button-next',
				prevEl: '.gallerySection .swiper-button-prev',
			},
			// Disable preloading of all images
			preloadImages: false,
			// Enable lazy loading
			lazy: true,
		},
		currentImg: "1",
	}),
	methods: {
		changeSwiperIndex() {
			this.currentImg = this.$refs.sectionSwiper.swiper.activeIndex + 1;
		}
	},
	mounted() {
	}
}
</script>

<style lang="less">
@import "../../less/variables";

.gallerySection {
	position: relative;
	background: #f9f9f9;

	.img-wrap {
		// background-image: url("../../assets/img/gallery.jpg");
		background-size: cover;
		background-position: center;
		padding: 0;
		cursor: grab;

		&:active {
			cursor: grabbing;
		}

		&::after {
			display: block;
			content: "";
			width: 100%;
			padding-bottom: 100%;

			.up(@sm;{
				padding-bottom: 52.94%;
			});
		}

		h5 {
			color: @white;
			position: absolute;
			bottom: 140px;
			width: 100%;
			text-align: center;
			padding: 0 20px;
			box-sizing: border-box;

			.up(@sm;{
				bottom: 220px;
			});
		}
	}

	.el-button {
		margin: 0 auto;
		display: block;
		pointer-events: all;
		width: auto;
		
		.down(@xs;{
		});
	}

	.btnWrap {
		position: absolute;
		bottom: 40px;
		left: 0;
		transform: translateX(-50%);
		z-index: 5;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
		pointer-events: none;

		.up(@sm;{
			bottom: 80px;
		});

	}

	&.galleryFull {
		.swiper {
			&-container {
				height: 100vh;
			}
		}

		.img-wrap {
			background-blend-mode: darken;
			background-color: rgba(0, 0, 0, .1);
	
			&::after {
				display: none;
			}
		}
	}
}

</style>