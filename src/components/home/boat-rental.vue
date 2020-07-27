<template>
<section class="boatRental" data-aos="bg-anim">
	<el-container direction="vertical">
		<h2 data-aos="fade-down" data-aos-delay="400" v-if="title !== ''" class="sectionTitle">
			<span class="sectionTitle__step" v-if="step !== false">1</span>
			{{ title }}
		</h2>
		<slot>
			<boats-default-filter @onFilterBtnClick="currentFilterUPD" @onSelectFilterClick="selectedServiceUPD"  />
				<available-boats 
					:boatsDelay="boatsDelay" 
					:showBoats="showBoats" 
					:animation="animType" 
					:shipsList="shipsList" 
					:currentFilter="currentFilter"
					:selectedService="selectedService"
					ref="boats"
					:active="active"
				/>
		</slot>
	</el-container>
</section>
</template>

<script>
import filterBtns from '../elements/filter-btns';
import availableBoats from '../elements/available-boats';
import buyButton from '../elements/buy-button';
import boatsDefaultFilter from '../elements/boats-default-filter';

export default {
	name: 'boat-rental',
	components: {
		filterBtns,
		availableBoats,
		buyButton,
		boatsDefaultFilter
	},
	props: {
		contacts: {
			type: String
		},
		type: {
			type: String
		},
		title: {
			type: String,
			default: '',
		},
		step: {
			type: Boolean,
			default: false,
		},
		filterType: {
			type: String,
			default: 'boats',
		},
		filterType: {
			type: String,
			default: 'boats',
		},
		filterData: Object,
		cardNoLoad: {
			type: Boolean,
			default: false,
		},
		boatsDelay: {
			type: Number,
			default: 450
		},
		shipsList: {
			type: Array,
			default: () => []
		}
	},
	data: () => ({
		active: true,
		showBoats: 1000,
		animType: false,
		currentFilter: 200,
		selectedService: '',
		boatsCount: null,
	}),
	methods: {
		currentFilterUPD(quantity) {
			this.currentFilter = quantity;

			this.active = !this.active;
			setTimeout(() => {
				this.active = !this.active;
			}, 200);

			if (document.documentElement.clientWidth < 768) {

				setTimeout(() => {
					let len = this.$refs.boats.$children[0].$children.length;
					
					this.$message({
						message: `Найдено ${len} теплоходов`,
						type: 'success',
					});
					
				}, 200);
			} 
		},
		selectedServiceUPD(service) {
			this.selectedService = service;
		},
		boatsShowed(count) {
			//this.$store.state.isBoatCountChange = true;
			this.boatsDelay=0;
			this.animType = true;
			//document.querySelectorAll('.boatWrap').forEach(element => element.setAttribute('data-aos', 'fade-up'));
			document.querySelectorAll('.boatWrap').forEach(element => element.classList.remove('aos-animate'));
			//document.querySelectorAll('.boatWrap').forEach(element => element.setAttribute('data-aos-delay', '100'));

			setTimeout(() => {
				//this.$store.state.isBoatCountChange = false;
				this.showBoats = count;
				this.animType = false;
			}, 800);
		},
	},
	mounted() {}
}
</script>

<style lang="less">
@import "../../less/variables";

.boatRental {
	//background-image: url("../../assets/img/rent_bg.png");
	//background-color: @disabled;
	background: linear-gradient(0deg, #ffffff 50%, #F2F4FA 0%);
    background-size: 100% 200%;
    background-position: 100% 100%;

	.sectionTitle {
		padding-bottom: 0;
	}

	.filterBtns {	
		padding-top: 35px;
		padding-left: 10px;
		padding-right: 10px;
		margin: 0;
		.up(@sm;{
			padding-top: 75px;
			width: auto;
			margin: 0 -10px;
			padding-left: 60px;
			padding-right: 60px;
		});

		//.up(@md;{
		//})

	}

	&.in-viewport {
		.fixedBtn {
			transform: translateY(150%);
			opacity: 0;
			visibility: hidden;
		}
	}

	.el {
		&-container {
			padding: 0;

			.up(@sm;{
				padding: 0 20px;
			});
		}
	}

	.up(@sm;{
		padding-bottom: 0;
	});
}


</style>