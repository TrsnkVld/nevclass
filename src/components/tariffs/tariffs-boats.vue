<template>
	<div class="availableBoats availableBoats-tariffs" data-aos="fade-down" data-aos-delay="1200">
		<!--TODO Перенести iscardopened -->
            <transition mode="out-in" name="anim-wrap" >
				<div v-if="!$store.state.isCardOpened" key="card0">
					<el-col class="boatWrap"
						tag="swiper-slide" :span="24" :sm="{span: 12}" :lg="{span: 8}"
						v-for="(ship, index) in shipOffers" 
						:key="index"
					>
						<boat-card
							:shipData="ship"
							cardNoLoad
							:ind="index"
							:to="routeToTarrifsForShip(ship)">
							<!--<el-button v-scroll-to="'.boatRental'" type="primary">от {{ parseInt(ship.minPrice) | nf }} руб./час</el-button>-->
							<!--<el-button @click="onClickTarrif(ship)" type="primary">от {{ parseInt(ship.minPrice) | nf }} руб./час</el-button>-->
						</boat-card>
					</el-col>
				</div>
				<div v-else key="card1" style="justify-content: center" class="tariff-info-boat-wrap">
					<el-col class="boatWrap"
						tag="swiper-slide" :span="24" :sm="{span: 12}" :lg="{span: 8}"
						:class="{'boatWrap-info': boatInfo}"
						key="ship"
					>
						<boat-card
							:shipData="singleBoat"
							cardNoLoad
						>
							<el-button v-scroll-to="'.formWrap'" type="primary" v-if="$store.state.isCardOpened">Забронировать</el-button>
						</boat-card>
					</el-col>
					<el-col key="info" class="infoWrap" :span="24" :lg="{span: 16}">
						<tariff-info :data="tariffInfoCard" />
					</el-col>
				</div>
            </transition>
	</div>
</template>

<script>
import AOS from 'aos';
import boatCard from '../elements/boat-card';
import tariffInfo from './tariff-info';

export default {
	name: 'tariffs-boats',
	components: {
        boatCard,
        tariffInfo
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
			default: false,	// fixme
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
		offers: {
			type: Array,
			default: () => [],
		},
		offersInfo: {
			type: Object,
			default: () => ({}),
		}
	},
	data: () => ({
        currentBoat: 0,
        boatInfo: null,
        isBoatsShowed: true,
		swiperOption: {
			//effect: 'fade',
			pagination: {
				el: '#boatSwiper',
				clickable: true,
				dynamicBullets: true,
				dynamicMainBullets: 1
			},
			slidesPerView: "auto",
		},
	}),
	methods: {
        test(index, ship) {
			// setTimeout(() => {
			// 	AOS.refresh();
			// }, 2200);

			/*this.boatInfo = index;
            this.$store.state.isCardOpened = true;
            this.$store.state.currentShip = ship.NAME;
            this.$store.state.shipOrderForm.shipId = ship.ID;
			this.$emit('onCardClick');*/

			//this.$router.push({name: 'ship', params: {code: ship.CODE}});
        },
		routeToTarrifsForShip(ship) {
			return {name: 'ship', params: {code: ship.CODE}, hash: '#info'};
		},
		visibleShips(offer) {
			setTimeout(() => {
				AOS.refresh();
			}, 200);
			if(offer.SEASON === this.filter.season && offer.DAYS === this.filter.days && offer.TIME === this.filter.times) return true;
			/*
			if(ship.CAPACITY <= this.currentFilter && this.selectedService==='') return true;
			else if (ship.CAPACITY <= this.currentFilter && ship.SERVICE === this.selectedService) return true;
			return false;*/
		},
		toggleShips() {
			AOS.refresh();
		}
    },
    computed: {
        singleBoat() {
            return this.shipOffers[this.boatInfo];
        },
		tariffInfoCard() {
			const info = this.offersInfo[this.$store.state.shipOrderForm.shipId];
			if (!info) {
				console.error('info not found for current ship');
				return;
			}

			return info;
			//return this.offers[this.boatInfo];
		},
        isCardOpened() {
            return this.$store.state.isCardOpened;
        },
		shipOffers() {
			const setFilters = Object.keys(this.filter).filter((key) => this.filter[key] !== "");
			const filteredOffers = this.offers.filter((offer) => {
				const isFilterSet = setFilters.length > 0;
				if (!isFilterSet) return true;
				const filterKeyOffer = {
					season: 'SEASON',
					days: 'DAYS',
					times: 'TIME',
				};
				const isOfferInFilter = setFilters.every((key) => {
					const filterBy = offer[filterKeyOffer[key]];
					if (!filterBy) return false;
					return Object.values(filterBy).some(value => this.filter[key] ===  value)
				});
				return isOfferInFilter;
			});

			const filterShipsByOffer = this.shipsList.filter((ship) => {
				const isOfferShip = filteredOffers.some(({CML2_LINK}) => CML2_LINK === ship.ID);
				return isOfferShip;
			});

			//TODO переписать этот участок кода!!!!!!!!!	
			this.offers.forEach(el => {
				let filt = this.shipsList.filter(ship => {
					if(ship.ID === el.CML2_LINK) return  ship
				})
				el.SHIP = filt[0];
			});

			return filterShipsByOffer;
		},
        filter() {
            return this.$store.state.tariffsFilter;
		},
	},
	mounted() {
	}
}
</script>

<style lang="less">
@import "../../less/variables";

.boatWrap-info {
	margin: 0 auto;

	.up(@md;{
		margin-right: 0;
	})
}

.infoWrap {
	// margin-right: auto;
	
	.up(@sm;{
		padding: 0 10px;
	});

	.up(@md;{
		// max-width: 870px;
		height: 100%;
	});
}

	div.tariff-info-boat-wrap {
		.boatWrap {
			width: 100%;

			.up(@lg;{
				width: 33.3%;
				height: 100%;	
			});

			.boatCard {
				.up(@lg;{
					height: calc(100% - 20px);
					});
				}
		}
	}
</style>