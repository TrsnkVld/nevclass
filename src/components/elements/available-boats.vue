<template>
	<el-row class="availableBoats" data-aos="fade-down" data-aos-delay="1200" justify="center">
		<transition name="anim-wrap">
			<div v-if="active">
				<el-col class="boatWrap"
					tag="swiper-slide" :span="24" :sm="{span: 12}" :lg="{span: 8}"
					v-for="(ship, index) in shipsList" 
					:key="index"
					v-if="visibleShips(ship)"
					ref="boats"
					:data-aos="(!animation ? 'fade-down' : 'fade-up')" 
					data-aos="fade-down"
					data-aos-anchor=".boatRental"
					:data-aos-delay="(index+1)*300+boatsDelay"
				>  
					<boat-card
						:shipData="ship"
						:cardNoLoad="cardNoLoad"
						:ind="index"
					/>
				</el-col>
			</div>
		</transition>
	</el-row>
</template>

<script>
import AOS from 'aos';
import boatCard from './boat-card';

export default {
	name: 'available-boats',
	components: {
		boatCard,
	},
	props: {
		cardNoLoad: {
			type: Boolean,
			default: false,
		},
		showBoats: {
			type: Number,
			default: 1000,
		},
		animation: {
			type: Boolean,
			default: false,
		},
		boatsDelay: {
			type: Number,
			default: false,
		},
		shipsList: {
			type: Array,
			default: () => []
		},
		currentFilter: {
			type: Number,
			default: 200,
		},
		selectedService: {
			type: String,
			default: '',
		},
		active: {
			type:Boolean,
			default: true,
		}
	},
	data: () => ({
		currentBoat: 0,
		swiperOption: {
			//effect: 'fade',
			pagination: {
				el: '#boatSwiper',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1
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
	methods: {
		visibleShips(ship) {
			setTimeout(() => {
				AOS.refresh();
				this.$emit('test', this.$refs.boats)
			}, 200);
			if(ship.CAPACITY <= this.currentFilter && this.selectedService==='') return true;
			else if (ship.CAPACITY <= this.currentFilter && ship.SERVICE === this.selectedService) return true;
			return false;
		},
		toggleShips() {
			AOS.refresh();
		},
	}
}
</script>

<style lang="less">
@import "../../less/variables";
</style>