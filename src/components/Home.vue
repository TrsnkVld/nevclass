<template>
<main class="wrapper">
    <welcome />
    <map-section :mapData="mapData" />
    <boat-rental title="Аренда теплохода" :shipsList="shipsList" />
	<double-carousel 
		type="servicesPage" 
		:data="themeExcursions"
		:topTitle="{text: 'Ваш праздник на теплоходе'}"
	/>
    <nevclass-is />
    <gallery-section :data="gallery" />
    <news-row title="Наши события" :items="newsList" />
    <map-section 
		mapId="mapContacts"
		:mapZoom="10"
		class="mapContacts"
		data-aos="flip-down" 
	/>
</main>
</template>

<script>
/*
const Welcome = () => import('./home/welcome');
const mapSection = () => import('./home/map-section');
const boatRental = () => import('./home/boat-rental');
const doubleCarousel = () => import('./home/double-carousel');
const nevclassIs = () => import('./home/nevclass-is');
const gallerySection = () => import('./home/gallery-section');
const ourEvents = () => import('./home/our-events');
*/
import Vue from 'vue';
import Welcome from './home/welcome';
import mapSection from './home/map-section';
import boatRental from './home/boat-rental';
import doubleCarousel from './home/double-carousel';
import nevclassIs from './home/nevclass-is';
import gallerySection from './home/gallery-section';
import newsRow from './home/news-row';

export default {
    name: 'home',
    components: {
        Welcome,
        mapSection,
        boatRental,
        doubleCarousel,
        nevclassIs,
        gallerySection,
        newsRow,
    },
    data: () => ({
		madpD: [],
		mapData: [],
		servicesList: [
			{
				id: 1,
				title: 'Свадьба на теплоходе',
				price: 'от 300 руб./час',
				img: 'wedding.jpg',
			},
			{
				id: 2,
				title: 'Retro party',
				price: 'от 400 руб./час',
				img: 'retro.png',
			},
			{
				id: 3,
				title: 'В гостях у сказки',
				price: 'от 200 руб./час',
				img: 'tales.jpg',
			},
			{
				id: 4,
				title: 'Организация Вашего праздника',
				price: 'от 385 руб./час',
				img: 'service.jpg',
			},
			{
				id: 5,
				title: 'Кейтеринг',
				subtitle: 'Питание',
				price: 'от 123 руб./час',
				img: 'food.jpg',
			},
			/*
			{
				id: 6,
				title: 'Теплоход на футбольные матчи ФК «Зенит»',
				subtitle: 'На футбол',
				price: 'от 856 руб./час',
				img: 'zenit.jpg',
			}
			*/
		],
        news: [
        	{
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
                img: 'yacht-wedding.jpg',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },
            {
                title: 'Осенняя свадьба на борту теплохода "Нефрит" 11.09.2017',
                text: 'Безусловно, день бракосочетания является одним из самых важных в жизни любого человека. Во-первых, это настоящий праздник любви ...',
                date: '04.11.2019',
            },

        ],
		newsCount: 5,
    }),
	created() {
		window.addEventListener("resize", this.onResize);
	},
	destroyed() {
		window.removeEventListener("resize", this.onResize);
	},
	methods: {
		onResize() {
			if (document.documentElement.clientWidth < 768) {
				this.newsCount = 3;
			} else if (document.documentElement.clientWidth < 1200) {
				this.newsCount = 5;
			} else if (document.documentElement.clientWidth < 1600) {
				this.newsCount = 7;
			} else {
				this.newsCount = 5;
			}
		},
		mapDataFiltered() {
			//this.mapData = JSON.parse(`[${element.COORD_WAY}]`);
			this.excursions.forEach(element => {
				this.mapData.push({
					id: element.ID,
					title: element.NAME,
					code: element.CODE,
					price: parseInt(element.minPrice),
					time: element.TIME,
					coords: JSON.parse(element.COORD_ITEM),
					pathCoords: JSON.parse(`[${element.COORD_WAY}]`),
					icon: element.ICON,
					ship: element.SHIP,
					prichal: element.PRICHAL,
					programText: element.PROGRAM_TEXT,
					isHit: element.IS_HIT,
					hot: element.HOT,
					offers: element.offers,
				});
			});
		}
	},
    computed: {
		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.Home) return null;
            return this.$store.state.page.Home;
		},

		shipsList() {
			if (!this.pageData) return null;

			return this.pageData.ships;
		},

		newsList() {
			if (!this.pageData) return null;

			return this.pageData.pubs.slice(0, this.newsCount);
		},

		gallery() {
			return this.pageData.slider;
		},

		themeExcursions() {
			if (!this.pageData) return null;

			return this.pageData.hots;
		},

		excursions() {
			if (!this.pageData) return null;

			return this.pageData.excursions;
		},


	},
	mounted() {
		this.onResize();
		this.mapDataFiltered();
	}
}
</script>
