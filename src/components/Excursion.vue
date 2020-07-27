<template>
<main class="wrapper excursionPage">
	<main-section :pageData="page" />
	<excursion-info-list :listData="listRow" />
	<map-section
		mapId="mapExcursion"
		class="half"
		:mapData="mapData"
		lines="visible"
		:mapCenter="centerMap"
	/>
	<scroll-btn-wrap v-in-viewport tag="section" :btnText.sync="btnText" scroll-to=".formWrap">
		<!--  Вместо feedback-from
		<voyage-selection :date="date" :time="time" />
		-->
		<excursion-form :offers="offers" id="form" @setBtnText="setBtnText"/>
		<gallery-section :data="item.images" />
	</scroll-btn-wrap>
	<text-block v-if="item.FULL_3 || item.FULL_4"
		:title="`Преимущества покупки билетов на «${item.NAME}»`"
		:textDataL="item.FULL_3"
		:textDataR="item.FULL_4"
		class="yellow"
	/>
	<text-block v-if="item.FULL_1 || item.FULL_2"
		title="Подробности экскурсии"
		:textDataL="item.FULL_1"
		:textDataR="item.FULL_2"
	/>
	<map-section
		mapId="mapContacts" 
		:mapZoom="10.2"
		class="mapContacts"
		data-aos="flip-down"
	/>
</main>
</template>

<script>
import mainSection from './excursion/main-section';
import gallerySection from './home/gallery-section';
import mapSection from './home/map-section';
import excursionInfoList from './excursion/excursion-info-list';
import textBlock from './elements/text-block';
import voyageSelection from './elements/voyage-selection';
import scrollBtnWrap from './elements/scroll-btn-wrap';
import excursionForm from './elements/order-forms/excursion-form';
import {hm} from '@/utils/string';

export default {
	name: 'excursion',
	components: {
		mapSection,
		gallerySection,
		mainSection,
		excursionInfoList,
		textBlock,
		voyageSelection,
		scrollBtnWrap,
		excursionForm
	},
	data: () => ({
		benefits : {
			title: 'Преимущества покупки билетов на водную экскурсию в Петергоф',
			text: [
				'Теплоход «Метеор» на подводных крыльях – самый быстрый и увлекательный способ попасть из Санкт-Петербурга в Петергоф. Закажите билеты онлайн и в назначенный день приходите на живописный причал напротив переулка Мошкова на Дворцовой набережной. Посадка начинается точно в срок, современное судно обеспечивает полный комфорт во время плавания. Покупка билетов на получасовую водную экскурсию в Петергоф позволяет насладиться видами и избежать пробок.',
				'Маршрут теплохода проходит мимо значимых объектов культурного и исторического ландшафта Санкт-Петербурга – Эрмитажа, Адмиралтейства, Стрелки Васильевского острова, Петропавловской крепости. Во время водной экскурсии с палуб открывается завораживающий вид на Неву, Финский залив и город, раскинувшийся по берегам.'
			],
		},
		details : {
			title: 'Подробности экскурсии',
			text: [
				'Покупая билеты Петергоф, вы получаете возможность насладиться увлекательной водной экскурсией и увидеть знаменитые достопримечательности парка',
				[
					'Аллею фонтанов,',
					'Большой дворец,',
					'Фонтан-шутиху «Водяная дорога»,',
					'Каскад «Шахматная гора»,',
					'Фонтан «Нептун»,',
					'Скульптурную группу «Самсон»,',
					'Дворцы «Монплезир» и «Марли»,',
					'Римские фонтаны.',
				],
				'По прибытии начинается ознакомительная полуторачасовая пешая экскурсия по Нижнему парку Петергофа (билеты включены в стоимость круиза). На территории расположено 144 фонтана и 3 великолепных каскада, парковые зоны и скульптурные группы.',
				'Во время получасовой экскурсии в Большой и Малый Гроты вы познакомитесь с изящной мраморной скульптурой итальянского мастера Пьетро Баратта, позолоченными копиями античных памятников и знаменитыми шутихами. В музее представлены работы фонтанных мастеров петровского времени, аутентичные трубы, по которым поступает вода, схемы водовода.',
				'В стоимость билетов в Петергоф также входит посещение «Монплезира» – любимого загородного дворца Петра I.',
				'Изящное убранство галерей и комнат, полотна западноевропейских живописцев XVII-XVIII веков, Лаковый кабинет с коллекцией восточного фарфора создают неповторимый облик «Голландского домика». Венец дворца – Парадный зал, декорированный росписью купола и скульптурой в стиле барокко.',
				'В стоимость билетов в Петергоф также входит посещение «Монплезира» – любимого загородного дворца Петра I. Изящное убранство галерей и комнат, полотна западноевропейских живописцев XVII-XVIII веков, Лаковый кабинет с коллекцией восточного фарфора создают неповторимый облик «Голландского домика». Венец дворца – Парадный зал, декорированный росписью купола и скульптурой в стиле барокко.',
				'Билеты в Петергоф продаются круглый год, парк и музеи открыты для посещения и зимой. Однако фонтаны – главный символ заповедника – начинают работу в мае или конце апреля в зависимости от погодных условий. Летний сезон длится в парке до середины октября и совпадает с периодом навигации по Неве, когда можно купить билеты на речную прогулку в Петергоф. В это время музей-заповедник открыт для посетителей с 9 до 20 часов, зимой Нижний парк работает с 9 до 19 часов.',
				'Заказывайте билеты в Петергоф на официальном сайте «Невской классики», чтобы не тратить время на посещение причала. В отличие от многих перевозчиков, мы предлагаем комплексную водную экскурсию. Стоимость билетов включает трансфер в Петергоф и обратно и проход ко всем достопримечательностям Нижнего и Верхнего парков.',
			],
		},
		date: [
			'25.07.19',
			'27.07.19',
			'29.07.19',
			'31.07.19',
		],
		time: [
			'14:00',
			'15:00',
			'16:00',
			'17:00',
		],
		gallery: [
			{
				src: 'party.jpg',
			},
			{
				src: 'party.jpg',
			},
			{
				src: 'party.jpg',
			},
			{
				src: 'party.jpg',
			},
			{
				src: 'party.jpg',
			},
		],

		btnText: 'Забронировать',
	}),
	methods: {
		num2str(n, text_forms) {
			n = Math.abs(n) % 100; var n1 = n % 10;
        	if (n > 10 && n < 20) { return text_forms[2]; }
			if (n1 > 1 && n1 < 5) { return text_forms[1]; }
			if (n1 == 1) { return text_forms[0]; }
			return text_forms[2];
		},

		setBtnText(val) {
			this.btnText = val;
		}
	},
	computed: {
		centerMap() {
			return this.mapData[0].pathCoords[Math.round(this.mapData[0].pathCoords.length / 2 - 1)];
		},

		pageData() {
            if (!this.$store.state.page || !this.$store.state.page.ExcursionPage) return null;
            return this.$store.state.page.ExcursionPage;
		},

		item() {
			if (!this.pageData) return null;

			return this.pageData.item;
		},

		offers() {
			return this.item.offers;
		},

		page() {
			return {
				title: this.item.NAME,
				subtitle: this.item.H2,
				bg: this.item.image,
			}
		},
		dateBase() {

			const b = this.offers.filter((el) => {
				return el;
			}).map(el=>{
				return el.TIME;
			});
			let a = [ ...new Set(b) ];

			let s = a.filter((el) => {
				return el
			}).map(el=>{
				let b = el.split(' ');
				let c = b[0].split('.').reverse();
				return `${c.join('-')}T${b[1]}`
			});

			return new Date(s[0]);
		},
		earlyDate() {
			return [this.dateBase.toLocaleString("ru", {month: 'long', day: 'numeric',}), this.dateBase.toLocaleString("ru", {hour: 'numeric', minute: 'numeric',})]	
		},
		duration() {
			return this.earlyDate;
		},
		listRow() {
			return [
				{
					title: 'Ближайший рейс',
					desc: `${this.earlyDate[0]} в ${this.earlyDate[1]}`,
					icon: 'icon-calendarBlack',
				},
				{
					title: 'Причал',
					desc: this.item.PRICHAL,
					icon: 'icon-markerBlack',
				},
				{
					title: 'Продолжительность',
					desc: hm(this.item.TIME),
					icon: 'icon-timeBlack',
				},
				{
					title: 'Теплоход',
					desc: this.item.SHIP,
					icon: 'icon-shipBlack',
				},
			];
		},
		times() {
			return this.item.offers[0].TIME
		},
		mapData() {
			return [
				{
					id: this.item.ID,
					title: this.item.NAME,
					code: this.item.CODE,
					prices: this.item.minPrice,
					time: this.item.TIME,
					coords: JSON.parse(this.item.COORD_ITEM),
					pathCoords: JSON.parse(`[${this.item.COORD_WAY}]`),
					icon: this.item.ICON,
					ship: this.item.SHIP,
					prichal: this.item.PRICHAL,
					programText: this.item.PROGRAM_TEXT,
					isHit: this.item.IS_HIT,
					hot: this.item.HOT
				},
			]
		}
	},

	created() {
		if (!this.item) {
			this.$router.push({
				name: 'error404',
			});
		}
	},
	mounted() {
		console.log(this.item);
	}	
}
</script>

<style lang="less">
@import '../less/variables';

.excursionPage {
	.formWrap {
		//background: @white;
	} 
}
</style>