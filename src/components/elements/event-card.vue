<template>
	<router-link class="eventCard"  :to="{name: type, params: {code: data.CODE}}">
		<div class="eventCard__img" v-lazy:background-image="setImage(data)">
			<!--<img src="@/assets/img/yacht-wedding.jpg" alt="boat">-->
		</div>
		<div class="eventCard__info">
			<h6 class="eventCard__pubdate">{{ data.ACTIVE_FROM }}</h6>
			<h4 class="eventCard__title" v-html="data.NAME" />
			<p class="eventCard__text" v-html="data.PREVIEW_TEXT" />
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'boat-card',
	props: ['data', 'type'],

	  methods: {
        setImage(data) {
            return data.imageOptimized || data.image;
        }
    },
}
</script>

<style lang="less">
@import "../../less/variables";

.eventCard {
	position: relative;
	margin-bottom: 20px;
	overflow: hidden;
	transition: .3s;
	display: flex;
    flex-flow: column;

	&__img {
		overflow: hidden;
		position: relative;
		flex-shrink: 0;
		z-index: 0;

		&::before {
			content: "";
			display: block;
			padding-top: 65%;
			width: 100%;
			background-image: inherit;
			background-size: cover;
			background-position: center;

			.up(@sm;{
				padding-top: 100%;
			});
		}

		&::after {
			content: "";
			display: block;
			width: 100%;
			height: 100%;
			background-color: #e6f0ff;
			background-image: url("../../assets/icons/news_bg.svg");
			background-repeat: no-repeat;
			background-position: center;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.imgWrap {
			position: relative;
		}

		img {
			position: absolute;
			top: 50%;
			left: 50%;
			height: 100%;
			transform: translate(-50%, -50%);
		}
	}


	&__info {
		background-color: @white;
		padding: 0 70px 70px;
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: flex-start;
		//max-width: 260px;
		margin: 0 auto;
		flex-grow: 1;
		width: 100%;
		box-sizing: border-box;
		word-break: break-word;

		.down(@xs;{
			padding: 0 20px 40px;
		});
	}

	&__title {
		text-align: left;
		margin-bottom: 25px;
	}

	&__pubdate {
		opacity: .25;
		line-height: 70px;
		color: @black;
	}

	&__text {
		font-size: 20px;
		line-height: 24px;
		color: @black;
	}

	&:hover {
		box-shadow: 0px 20px 20px rgba(0, 21, 53, 0.12);

		h4 {
			color: @active;
		}

		.eventCard__text,
		.eventCard__pubdate {
			color: @black;
		}
	}

	.up(@sm;{
		//margin-bottom: 20px;
		border-radius: 20px;
	});
}

</style>