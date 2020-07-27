<template>
	<el-col :span="24" :sm="{span: 12}" :lg="{span: 6}" class="excursionWrap">
		<div class="excursionCard" :class="[`excursionCard-marker-${index}`, {'invert': hover}]" @click="isActive = !isActive">
			<div class="excursionCard__labels">
				<span class="label label-yellow" data-aos="flip-up" :data-aos-delay="aosLabelsDelay+300" v-if="data.hot">- {{data.hot}}%</span>
				<span class="label label-green" data-aos="flip-up" :data-aos-delay="aosLabelsDelay+500" v-if="data.isHit">ХИТ!</span>
			</div>
			<div class="excursionCard__icon" v-html="data.icon" />
			<p class="excursionCard__title">{{ data.title }}</p>
			<div class="excursionCard__info">
				<span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.5" d="M10 0C4.48615 0 0 4.48615 0 10C0 15.5142 4.48615 20 10 20C15.5142 20 20 15.5142 20 10C20 4.48615 15.5142 0 10 0ZM13.6208 13.6208C13.4704 13.7712 13.2738 13.8462 13.0769 13.8462C12.88 13.8462 12.6835 13.7712 12.5331 13.6208L9.45615 10.5438C9.31192 10.3996 9.23077 10.2038 9.23077 10V4.61538C9.23077 4.19077 9.57539 3.84615 10 3.84615C10.4246 3.84615 10.7692 4.19077 10.7692 4.61538V9.68115L13.6208 12.5331C13.9212 12.8335 13.9212 13.3204 13.6208 13.6208Z" fill="white"/>
					</svg>
					{{data.time}} ч
				</span>
				<span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.48615 0 0 4.48615 0 10C0 15.5142 4.48615 20 10 20C15.5142 20 20 15.5142 20 10C20 4.48615 15.5142 0 10 0ZM8.90088 13H11.9448V11.7114H8.90088V10.8081H10.9067C11.9393 10.7954 12.7454 10.5352 13.3252 10.0273C13.9049 9.5153 14.1948 8.81071 14.1948 7.91357C14.1948 7.03337 13.8901 6.32878 13.2808 5.7998C12.6714 5.2666 11.8568 5 10.8369 5H7.30127V9.51953H6V10.8081H7.30127V11.7114H6V13H7.30127V15.2422H8.90088V13ZM8.90088 9.51953H10.8115C11.387 9.51953 11.8271 9.38623 12.1318 9.11963C12.4365 8.85303 12.5889 8.45524 12.5889 7.92627C12.5889 7.45231 12.4386 7.0651 12.1382 6.76465C11.842 6.46419 11.4315 6.30762 10.9067 6.29492H8.90088V9.51953Z" fill="white"/>
					</svg>
					от {{data.price | nf}} руб.
				</span>
			</div>
		</div>
	</el-col>
</template>

<script>
export default {
	name: 'excursion-card',
	props: {
		data: Object,
		index: {
			type: Number
		},
		aosLabels: {
			type: String
		},
		aosLabelsDelay: {
			type: Number
		},
		hover: {
			type: Boolean,
			default: false
		}
	}, 
	data: () => ({
		isActive: false,
	}),
}
</script>

<style lang="less">
@import "../../less/variables";

.excursionWrap {
	padding-top: 20px;
	pointer-events: none;

	&.hidden {
		display: none;
	}

	&.active {
		.excursionCard {
			background: @white;
			box-shadow: 0px 25px 15px rgba(0, 21, 53, 0.15);
			color: @black;

			.excursionCard__icon {
				path {
					fill: @active;
				}
			}
			.excursionCard__info {
				.icon {
					filter: invert(1);
				}
			}

			svg {

				path {
					fill: @black;
				}
			}
		}
	}
	
	.up(@sm;{
		padding: 0 10px 20px;
	});
}

.excursionCard {
	pointer-events: all;
	padding: 40px;
	background-color: @active;
	border-radius: 20px;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	color: white;
	transition: .3s;
	position: relative;
	cursor: pointer;
	user-select: none;
    height: 100%;
    box-sizing: border-box;

	&__labels {
		position: absolute;
		top: 0;
		left: 0;
	}

	&__icon {
		//width: 50px;
		//height: 60px;
		/*background-size: contain;
		background-repeat: no-repeat;
		background-image: url("../../assets/icons/night.svg");
		margin-bottom: 15px;
		*/
		display: flex;
		margin-bottom: 15px;
		height: 60px;

		svg {
			margin-top: auto;
			height: 60px;
			width: auto;
		}

		path {
			transition: .3s;
		}
	}

	&__title {
		font-size: 35px;
		line-height: 40px;
		font-weight: bold;
		margin-bottom: 10px;
		text-align: center;
		margin-top: auto;
	}

	&__info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 220px;
    	margin-top: auto;

		span {
			display: flex;
			align-items: center;
		}

		svg {
			margin-right: 10px;
			margin-top: 5px;

			path {
				transition: .3s;
			}
		}
	}

	&:hover, &.invert {
		background: @white;
		box-shadow: 0px 25px 15px rgba(0, 21, 53, 0.15);
		color: @black;

		.excursionCard__icon {
			path {
				fill: @active;
			}
		}
			
		svg {

			path {
				fill: @black;
			}
		}
	}
}
</style>