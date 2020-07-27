<template>
<el-row class="excursions" :class="{expanded: cardIndex}">
	<transition name="cards" mode="out-in">
		<div v-if="!cardIndex" class="cardsWrap">
			<excursion-card 
				:hover="(cardHovered === index+1) ? true : false"
				data-aos="fade-down"
				:data-aos-delay="(index+1)*75"
				data-aos-anchor=".excursionCard"
				aosLabels="flip-up"
				:aosLabelsDelay="(index+1)*75"
    			data-aos-offset="10"
				@click.native="toggle(index+1)"
				@mouseenter.native="hover(index+1, $event)"
				@mouseleave.native="hover(index+1, $event)"
				v-for="(item, index) in mapData"
				:key="index+1"
				:data="item"
				:index="index+1"
			/> 
		</div>
		<excursion-big-card v-if="cardIndex == index+1 && !routing" 
			v-for="(item, index) in mapData"
			:key="index+1" 
			:data="item"
			:index="index+1" 
			@itemClick="toggle(index+1, false)"
		/>
			
	</transition>
</el-row>
</template>

<script>
import excursionCard from '../elements/excursion-card';
import excursionBigCard from '../elements/excursion-big-card';

export default {
	name: 'excursions',
	components: {
		excursionCard,
		excursionBigCard
	},
	props: {
		mapData: Array,
		cardIndex: {
			default: false,
		},
		cardHovered: {
			default: false,
		},
	},
	data() {
		return {
			routing: false,
			cardIndexLocal: this.cardIndex,
			isActive: false,
		}
	},
	methods: {
		/*
		indexEq(a) {
			console.log(this.cardIndex = a);
			return this.cardIndex == a;
		},
		*/
		hover(a) {
			this.$emit('cardHover', a, event);
		},
		toggle(a,b) {
			this.$emit('cardClick', a, b);
		},
		/*
		ticketClick() {
			this.$emit('ticketClick');
			setTimeout(() => {
				this.routing = true;
			}, 800);
		},
		*/
	}
}
</script>

<style lang="less">
@import "../../less/variables";

.excursions {
	width: 100%;
	padding: 0 20px;
	padding-top: 460px;
	pointer-events: none;
    height: 100%;
    display: flex;
    align-items: flex-end;

	.cardsWrap {
		width: 100%;
		padding-bottom: 20px;
		display: flex;
		flex-flow: wrap;
		justify-content: center;

		&.cards {
			&-enter-active, &-leave-active {
				transition-delay: .3s;
			}

			&-enter, &-leave-to {
				transition-delay: .3s;
			}
		}

		.up(@sm;{
			padding-bottom: 0;
		});
	}

	&.expanded {

		.excursionWrap {
			opacity: 0;
		}
		.excursionCard {
			//opacity: 0;

			&:active {
				//opacity: 1;
			}
		}
	}

	.up(@sm;{
		padding: 650px 10px 0;
	});

	.up(@lg;{
		padding-top: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
	});
}

.cards {
	&-enter-active, &-leave-active {
		.excursionCard  {
			//transform: translateY(0px);
			transition: .3s ease-out;
			opacity: 1;

			&.active {
				//transition-delay: .3s;
			}
		}
	}

	&-enter, &-leave-to {
		.excursionCard  {
			//transform: translateY(40px);
			transition: .3s ease-out;
			opacity: 0;

			&.active {
				//transition-delay: .2s;
			}
		}
	}
}

.excursionExpandedWrap {
	&.cards {
		&-enter-active, &-leave-active {
			transform: translateX(0px);
			transition: .3s ease-out;
			opacity: 1;
			transition-delay: .2s;
		}

		&-enter, &-leave-to {
			transform: translateX(40px);
			transition: .3s ease-out;
			opacity: 0;
		}
	}
}
</style>